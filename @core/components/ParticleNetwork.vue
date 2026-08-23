<script lang="ts" setup>
import logo from '~/assets/images/logo/logo.webp'

/* ============================================================================
 * ParticleNetwork — interactive Mission & Vision network (About hero).
 *
 * Renders an animated, theme-aware canvas:
 *  - inner ring = core missions, outer ring = vision & outcomes
 *  - drifting background "dust" particles
 *  - energy packets travelling along the links
 *  - hover (desktop) / tap (touch) tooltips with translated content
 *  - mouse parallax, reduced-motion support, off-screen pausing
 * Colors are driven by CSS custom properties (`--pn-*`) so the visual
 * follows the site theme (light/dark) automatically.
 * ========================================================================== */

type RingType = 'inner' | 'outer'

interface INodeDatum {
  title: string
  desc: string
}

interface INetNode {
  datum: INodeDatum
  ring: RingType
  index: number
  total: number
  baseAngle: number
  baseRadius: number
  phase: number
  speed: number
  x: number
  y: number
  hovered: boolean
}

interface IPacket {
  from: INetNode | null
  to: INetNode
  progress: number
  speed: number
  size: number
  phase: number
}

interface IDust {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  a: number
}

interface IPing {
  node: INetNode
  age: number
}

const props = withDefaults(
  defineProps<{
    /** Hex accent override, e.g. "#ef4444" (falls back to theme `--pn-primary`). */
    accent?: string
  }>(),
  { accent: '' },
)

const { t } = useI18n()
const colorMode = useColorMode()

const root = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const tooltip = ref<HTMLElement | null>(null)
const tooltipTitle = ref<HTMLElement | null>(null)
const tooltipDesc = ref<HTMLElement | null>(null)
const isTouch = ref(false)

const innerData = computed<INodeDatum[]>(() => [
  { title: t('about.network.mission_1_title'), desc: t('about.network.mission_1_des') },
  { title: t('about.network.mission_2_title'), desc: t('about.network.mission_2_des') },
  { title: t('about.network.mission_3_title'), desc: t('about.network.mission_3_des') },
  { title: t('about.network.mission_4_title'), desc: t('about.network.mission_4_des') },
])

const outerData = computed<INodeDatum[]>(() => [
  { title: t('about.network.vision_1_title'), desc: t('about.network.vision_1_des') },
  { title: t('about.network.vision_2_title'), desc: t('about.network.vision_2_des') },
  { title: t('about.network.vision_3_title'), desc: t('about.network.vision_3_des') },
  { title: t('about.network.vision_4_title'), desc: t('about.network.vision_4_des') },
  { title: t('about.network.vision_5_title'), desc: t('about.network.vision_5_des') },
  { title: t('about.network.vision_6_title'), desc: t('about.network.vision_6_des') },
  { title: t('about.network.vision_7_title'), desc: t('about.network.vision_7_des') },
  { title: t('about.network.vision_8_title'), desc: t('about.network.vision_8_des') },
])

/* ----------------------------- renderer state ---------------------------- */
let ctx: CanvasRenderingContext2D | null = null
let innerNodes: INetNode[] = []
let outerNodes: INetNode[] = []
let packets: IPacket[] = []
let dust: IDust[] = []
let pings: IPing[] = []
let width = 0
let height = 0
let centerX = 0
let centerY = 0
let maxRadius = 0
let raf = 0
let time = 0
let running = false
let visible = false
let reducedMotion = false
let highlighted: INetNode | null = null
let resizeRaf = 0
let observer: IntersectionObserver | null = null

const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

const theme = {
  primary: '#ef4444',
  label: '#475569',
  labelDim: '#94a3b8',
  panel: '#ffffff',
}

/* ------------------------------ colour helpers --------------------------- */

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace('#', '')
  if (m.length !== 6) return null
  const n = Number.parseInt(m, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function withAlpha(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex)
  return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` : hex
}

function applyTheme() {
  const dark = colorMode.value === 'dark'
  const primary = props.accent || (dark ? '#f87171' : '#ef4444')
  const vars: Record<string, string> = {
    '--pn-primary': primary,
    '--pn-label': dark ? '#cbd5e1' : '#475569',
    '--pn-label-dim': dark ? '#94a3b8' : '#94a3b8',
    '--pn-panel': dark ? '#0b1220' : '#ffffff',
  }
  // Drive the CSS variables inline so the HTML overlays (legend, hint, tooltip,
  // centre text) follow the active theme — a `.dark` stylesheet rule does not
  // survive the scoped build, so JS is the reliable source of truth.
  if (root.value) {
    for (const [name, value] of Object.entries(vars)) {
      root.value.style.setProperty(name, value)
    }
  }
  theme.primary = primary
  theme.label = vars['--pn-label']
  theme.labelDim = vars['--pn-label-dim']
  theme.panel = vars['--pn-panel']
}

/* ------------------------------ node construction ------------------------ */

function makeNode(datum: INodeDatum, ring: RingType, index: number, total: number): INetNode {
  let baseAngle = (Math.PI * 2 / total) * index
  if (ring === 'outer') baseAngle += Math.PI / total
  const baseRadius = ring === 'inner' ? maxRadius * 0.44 : maxRadius * 0.84
  return {
    datum,
    ring,
    index,
    total,
    baseAngle,
    baseRadius,
    phase: Math.random() * Math.PI * 2,
    speed: 0.5 + Math.random() * 0.5,
    x: 0,
    y: 0,
    hovered: false,
  }
}

function buildNodes() {
  if (highlighted) highlighted.hovered = false
  highlighted = null
  hideTooltip()
  innerNodes = innerData.value.map((d, i) => makeNode(d, 'inner', i, innerData.value.length))
  outerNodes = outerData.value.map((d, i) => makeNode(d, 'outer', i, outerData.value.length))
  buildPackets()
}

function buildPackets() {
  packets = []
  pings = []
  const add = (from: INetNode | null, to: INetNode, size: number, speedMul: number) => {
    packets.push({
      from,
      to,
      progress: Math.random(),
      speed: (0.0012 + Math.random() * 0.0018) * speedMul,
      size,
      phase: Math.random() * Math.PI * 2,
    })
  }

  // centre -> inner
  innerNodes.forEach((to) => add(null, to, 2.3, 1.15))

  // inner ring
  innerNodes.forEach((n, i) => add(n, innerNodes[(i + 1) % innerNodes.length], 1.9, 0.75))

  // inner -> outer: a signal on EVERY drawn link (never on invisible paths)
  innerNodes.forEach((inner, i) => {
    ;[
      outerNodes[(i * 2) % outerNodes.length],
      outerNodes[(i * 2 + 1) % outerNodes.length],
      outerNodes[(i * 2 - 1 + outerNodes.length) % outerNodes.length],
    ].forEach((outer) => add(inner, outer, 2.0, 0.9))
  })

  // outer ring
  outerNodes.forEach((n, j) => add(n, outerNodes[(j + 1) % outerNodes.length], 1.8, 0.7))
}

function makeDust() {
  const count = Math.min(44, Math.floor((width * height) / 16000))
  dust = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: 0.6 + Math.random() * 1.5,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    a: 0.07 + Math.random() * 0.18,
  }))
}

/* --------------------------- adjacency (hover) --------------------------- */

const linked = new Map<INetNode, Set<INetNode>>()

function addEdge(a: INetNode, b: INetNode) {
  if (!linked.has(a)) linked.set(a, new Set())
  if (!linked.has(b)) linked.set(b, new Set())
  linked.get(a)!.add(b)
  linked.get(b)!.add(a)
}

function buildLinks() {
  linked.clear()
  innerNodes.forEach((n, i) => {
    addEdge(n, innerNodes[(i + 1) % innerNodes.length])
  })
  outerNodes.forEach((n, j) => {
    addEdge(n, outerNodes[(j + 1) % outerNodes.length])
  })
  innerNodes.forEach((inner, i) => {
    const o1 = outerNodes[(i * 2) % outerNodes.length]
    const o2 = outerNodes[(i * 2 + 1) % outerNodes.length]
    const op = outerNodes[(i * 2 - 1 + outerNodes.length) % outerNodes.length]
    addEdge(inner, o1)
    addEdge(inner, o2)
    addEdge(inner, op)
  })
}

/* -------------------------------- sizing --------------------------------- */

function resize() {
  if (!root.value || !canvas.value) return
  const rect = root.value.getBoundingClientRect()
  width = Math.max(1, rect.width)
  height = Math.max(1, rect.height)
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.value.width = Math.round(width * dpr)
  canvas.value.height = Math.round(height * dpr)
  centerX = width / 2
  centerY = height / 2
  maxRadius = (Math.min(width, height) * 0.86) / 2
  buildNodes()
  buildLinks()
  makeDust()
  // Lay nodes out immediately so static (reduced-motion) frames and the first
  // painted frame are correct — not collapsed at the origin.
  positionAll(0, 0, 0)
  if (reducedMotion) render()
}

/* ----------------------------- animation loop ---------------------------- */

function start() {
  if (running || !ctx) return
  running = true
  if (reducedMotion) {
    render()
    return
  }
  const loop = () => {
    if (!running) return
    step()
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
}

function stop() {
  running = false
  if (raf) cancelAnimationFrame(raf)
  raf = 0
}

function positionAll(t: number, ox: number, oy: number) {
  innerNodes.forEach((n) => {
    const angle = n.baseAngle + Math.cos(t * n.speed * 0.5 + n.phase) * 0.05
    const radius = n.baseRadius + Math.sin(t * n.speed + n.phase) * 12
    n.x = centerX + Math.cos(angle) * radius + ox
    n.y = centerY + Math.sin(angle) * radius + oy
  })
  outerNodes.forEach((n) => {
    const angle = n.baseAngle + Math.cos(t * n.speed * 0.5 + n.phase) * 0.04
    const radius = n.baseRadius + Math.sin(t * n.speed + n.phase) * 14
    n.x = centerX + Math.cos(angle) * radius + ox
    n.y = centerY + Math.sin(angle) * radius + oy
  })
}

function step() {
  time += 0.015

  // smooth parallax toward the pointer
  mouse.x += (mouse.tx - mouse.x) * 0.06
  mouse.y += (mouse.ty - mouse.y) * 0.06
  const ox = mouse.x * 8
  const oy = mouse.y * 8

  positionAll(time, ox, oy)

  packets.forEach((p) => {
    p.progress += p.speed
    if (p.progress > 1) {
      p.progress = 0
      // signal arrived at the target node — emit a fading ping ring
      pings.push({ node: p.to, age: 0 })
    }
  })

  // advance arrival pings (slow, soft)
  for (let i = pings.length - 1; i >= 0; i--) {
    pings[i].age += 0.02
    if (pings[i].age >= 1) pings.splice(i, 1)
  }

  dust.forEach((p) => {
    p.x += p.vx
    p.y += p.vy
    if (p.x < -4) p.x = width + 4
    if (p.x > width + 4) p.x = -4
    if (p.y < -4) p.y = height + 4
    if (p.y > height + 4) p.y = -4
  })

  render()
}

/* -------------------------------- rendering ------------------------------ */

function render() {
  const c = ctx
  if (!c) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  c.setTransform(dpr, 0, 0, dpr, 0, 0)
  c.clearRect(0, 0, width, height)

  drawDust(c)
  drawConnections(c)
  drawPackets(c)
  drawPings(c)
  drawNodes(c)
}

function drawDust(c: CanvasRenderingContext2D) {
  c.fillStyle = theme.primary
  dust.forEach((p) => {
    c.globalAlpha = p.a
    c.beginPath()
    c.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    c.fill()
  })
  c.globalAlpha = 1
}

function strokeRing(c: CanvasRenderingContext2D, nodes: INetNode[], style: string, lineWidth: number) {
  if (nodes.length < 3) return
  c.strokeStyle = style
  c.lineWidth = lineWidth
  c.beginPath()
  c.moveTo(nodes[0].x, nodes[0].y)
  for (let i = 1; i < nodes.length; i++) c.lineTo(nodes[i].x, nodes[i].y)
  c.closePath()
  c.stroke()
}

function drawConnections(c: CanvasRenderingContext2D) {
  const accent = theme.primary
  const hlNode = highlighted
  const isLinkedTo = (a: INetNode, b: INetNode) => linked.get(a)?.has(b) ?? false
  const isHot = (a: INetNode) => hlNode !== null && (a === hlNode || isLinkedTo(a, hlNode))

  // centre -> inner
  c.lineWidth = 1.1
  innerNodes.forEach((n) => {
    c.strokeStyle = isHot(n) ? withAlpha(accent, 0.7) : withAlpha(accent, 0.18)
    c.beginPath()
    c.moveTo(centerX, centerY)
    c.lineTo(n.x, n.y)
    c.stroke()
  })

  // inner / outer rings
  strokeRing(c, innerNodes, hlNode ? withAlpha(accent, 0.5) : withAlpha(accent, 0.22), 1)
  strokeRing(c, outerNodes, hlNode ? withAlpha(accent, 0.3) : withAlpha(accent, 0.14), 0.9)

  // inner <-> outer
  c.lineWidth = 1
  innerNodes.forEach((inner, i) => {
    const targets = [
      outerNodes[(i * 2) % outerNodes.length],
      outerNodes[(i * 2 + 1) % outerNodes.length],
      outerNodes[(i * 2 - 1 + outerNodes.length) % outerNodes.length],
    ]
    targets.forEach((outer) => {
      const hot = hlNode !== null && (hlNode === inner || hlNode === outer)
      c.strokeStyle = hot ? withAlpha(accent, 0.7) : withAlpha(accent, 0.16)
      c.lineWidth = hot ? 1.6 : 0.9
      c.beginPath()
      c.moveTo(inner.x, inner.y)
      c.lineTo(outer.x, outer.y)
      c.stroke()
    })
  })
}

function drawPackets(c: CanvasRenderingContext2D) {
  c.save()
  c.globalCompositeOperation = 'lighter'
  c.lineCap = 'round'
  c.lineJoin = 'round'

  packets.forEach((p) => {
    const fx = p.from ? p.from.x : centerX
    const fy = p.from ? p.from.y : centerY
    const dx = p.to.x - fx
    const dy = p.to.y - fy
    const len = Math.hypot(dx, dy) || 1
    const ux = dx / len
    const uy = dy / len

    // signal head position
    const hx = fx + dx * p.progress
    const hy = fy + dy * p.progress

    // slow rhythmic pulse (0.45..1) unique to each signal
    const pulse = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(time * 2 + p.phase))

    // crisp tail: a thin line with no glow/blur
    const tail = Math.min(len * 0.3, 34)
    const tx = hx - ux * tail
    const ty = hy - uy * tail

    const grad = c.createLinearGradient(tx, ty, hx, hy)
    grad.addColorStop(0, withAlpha(theme.primary, 0))
    grad.addColorStop(0.6, withAlpha(theme.primary, 0.9 * pulse))
    grad.addColorStop(1, '#ffffff')
    c.strokeStyle = grad
    c.lineWidth = Math.max(1.5, p.size * 1.1)
    c.beginPath()
    c.moveTo(tx, ty)
    c.lineTo(hx, hy)
    c.stroke()

    // crisp head dot
    c.fillStyle = '#ffffff'
    c.beginPath()
    c.arc(hx, hy, Math.max(1.5, p.size * (0.7 + pulse * 0.4)), 0, Math.PI * 2)
    c.fill()
  })

  c.restore()
}

function drawPings(c: CanvasRenderingContext2D) {
  if (pings.length === 0) return
  c.save()
  pings.forEach((ping) => {
    const t = ping.age
    const r = 4 + t * 20
    c.strokeStyle = withAlpha(theme.primary, (1 - t) * 0.6)
    c.lineWidth = 1.5
    c.beginPath()
    c.arc(ping.node.x, ping.node.y, r, 0, Math.PI * 2)
    c.stroke()
  })
  c.restore()
}

function drawNodes(c: CanvasRenderingContext2D) {
  const size = Math.min(width, height)
  const isMobile = size < 480
  const tiny = size < 260
  const accent = theme.primary
  ;[...innerNodes, ...outerNodes].forEach((n) => {
    const hot = n === highlighted
    const isInner = n.ring === 'inner'

    // glowing core — inner nodes are solid dots, outer nodes hollow rings
    // (matches the legend: ● Core Missions / ○ Vision & Outcomes)
    c.shadowColor = withAlpha(accent, 0.9)
    c.shadowBlur = hot ? 22 : 12
    if (isInner) {
      c.fillStyle = hot ? '#ffffff' : accent
      c.beginPath()
      c.arc(n.x, n.y, hot ? 5.5 : 3.6, 0, Math.PI * 2)
      c.fill()
    } else {
      c.strokeStyle = hot ? '#ffffff' : accent
      c.lineWidth = hot ? 2.5 : 1.8
      c.beginPath()
      c.arc(n.x, n.y, hot ? 6 : 4.6, 0, Math.PI * 2)
      c.stroke()
    }
    c.shadowBlur = 0

    // halo
    c.strokeStyle = withAlpha(accent, hot ? 0.9 : 0.35)
    c.lineWidth = hot ? 2 : 1
    c.beginPath()
    c.arc(n.x, n.y, hot ? 15 : 10, 0, Math.PI * 2)
    c.stroke()

    // Keep titles visible on mobile — only hide on extremely tiny screens.
    if (tiny) return

    // Compact labels on small screens (mobile has no hover, so titles matter).
    const scale = isMobile ? 0.78 : 1
    const dist = (n.ring === 'inner' ? 25 : 30) * (isMobile ? 0.8 : 1)
    const tx = n.x + Math.cos(n.baseAngle) * dist
    const ty = n.y + Math.sin(n.baseAngle) * dist

    c.font = `${hot ? 700 : 500} ${(hot ? 11.5 : 10.5) * scale}px 'Quicksand', 'Kantumruy Pro', sans-serif`
    c.textAlign = 'center'
    c.textBaseline = 'middle'
    c.shadowBlur = 0

    // Panel-coloured outline keeps the label readable on any background
    // (light page, dark mode, or over the node glow). The fill is theme-aware
    // (dark text in light mode, light text in dark mode; accent when hovered).
    c.lineJoin = 'round'
    c.strokeStyle = withAlpha(theme.panel, 0.92)
    c.lineWidth = isMobile ? 2 : 3
    c.fillStyle = hot ? accent : theme.label

    const words = n.datum.title.split(' ')
    const gap = 7 * scale
    if (words.length > 1) {
      c.strokeText(words[0], tx, ty - gap)
      c.strokeText(words.slice(1).join(' '), tx, ty + gap)
      c.fillText(words[0], tx, ty - gap)
      c.fillText(words.slice(1).join(' '), tx, ty + gap)
    } else {
      c.strokeText(n.datum.title, tx, ty)
      c.fillText(n.datum.title, tx, ty)
    }
  })
}

/* ------------------------------- interaction ----------------------------- */

function showTooltip(node: INetNode, mx: number, my: number) {
  if (!tooltip.value || !tooltipTitle.value || !tooltipDesc.value) return
  tooltipTitle.value.textContent = node.datum.title
  tooltipDesc.value.textContent = node.datum.desc
  const ttW = tooltip.value.offsetWidth
  const ttH = tooltip.value.offsetHeight
  // Try right of the cursor; flip left near the right edge; always clamp inside.
  let left = mx + 16
  if (left + ttW > width) left = mx - ttW - 16
  left = Math.min(Math.max(left, 8), width - ttW - 8)
  const top = Math.min(Math.max(my, ttH / 2 + 6), height - ttH / 2 - 6)
  tooltip.value.style.left = `${left}px`
  tooltip.value.style.top = `${top}px`
  tooltip.value.classList.add('is-active')
}

function hideTooltip() {
  tooltip.value?.classList.remove('is-active')
}

function hitTest(mx: number, my: number, select: boolean) {
  const nodes = [...innerNodes, ...outerNodes]
  let hit: INetNode | null = null
  for (const n of nodes) {
    if (Math.hypot(n.x - mx, n.y - my) < 32) {
      hit = n
      break
    }
  }

  if (select) {
    // touch: tap toggles a pinned highlight
    if (highlighted && highlighted !== hit) {
      highlighted.hovered = false
      highlighted = null
      hideTooltip()
    }
    if (hit) {
      if (highlighted === hit) {
        highlighted.hovered = false
        highlighted = null
        hideTooltip()
      } else {
        highlighted = hit
        hit.hovered = true
        showTooltip(hit, mx, my)
      }
    }
  } else {
    // desktop hover
    if (highlighted) highlighted.hovered = false
    highlighted = hit
    if (hit) {
      hit.hovered = true
      showTooltip(hit, mx, my)
      if (canvas.value) canvas.value.style.cursor = 'pointer'
    } else {
      hideTooltip()
      if (canvas.value) canvas.value.style.cursor = 'default'
    }
  }
  if (reducedMotion) render()
}

function onPointerMove(e: PointerEvent) {
  if (isTouch.value) return
  const el = canvas.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top
  mouse.tx = (mx / width) * 2 - 1
  mouse.ty = (my / height) * 2 - 1
  hitTest(mx, my, false)
}

function onPointerDown(e: PointerEvent) {
  if (!isTouch.value) return
  const el = canvas.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  hitTest(e.clientX - rect.left, e.clientY - rect.top, true)
}

function onPointerLeave() {
  if (highlighted) {
    highlighted.hovered = false
    highlighted = null
  }
  hideTooltip()
  if (canvas.value) canvas.value.style.cursor = 'default'
  if (reducedMotion) render()
}

function onResize() {
  if (resizeRaf) cancelAnimationFrame(resizeRaf)
  resizeRaf = requestAnimationFrame(() => {
    resize()
    if (reducedMotion) render()
  })
}

function setupListeners() {
  if (!canvas.value) return
  canvas.value.addEventListener('pointermove', onPointerMove)
  canvas.value.addEventListener('pointerdown', onPointerDown)
  canvas.value.addEventListener('pointerleave', onPointerLeave)
  window.addEventListener('resize', onResize, { passive: true })
}

function teardownListeners() {
  if (!canvas.value) return
  canvas.value.removeEventListener('pointermove', onPointerMove)
  canvas.value.removeEventListener('pointerdown', onPointerDown)
  canvas.value.removeEventListener('pointerleave', onPointerLeave)
  window.removeEventListener('resize', onResize)
}

/* -------------------------------- lifecycle ------------------------------ */

onMounted(() => {
  if (!root.value || !canvas.value) return
  const c = canvas.value.getContext('2d')
  if (!c) return
  ctx = c
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  isTouch.value = window.matchMedia('(hover: none), (pointer: coarse)').matches
  applyTheme()
  resize()
  setupListeners()

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      visible = !!entry?.isIntersecting
      if (visible) start()
      else stop()
    },
    { rootMargin: '120px' },
  )
  observer.observe(root.value)
  // Safety net: kick off the loop immediately; the observer pauses it when off-screen.
  start()
})

// Pages are kept alive (KeepAlive in default layout) — pause while hidden,
// re-measure + resume when shown again.
onActivated(() => {
  if (!ctx) return
  resize()
  if (visible) start()
})

onDeactivated(() => {
  stop()
})

onBeforeUnmount(() => {
  stop()
  teardownListeners()
  observer?.disconnect()
  observer = null
})

/* ------------------------------ reactivity ------------------------------- */

watch(
  () => colorMode.value,
  () => {
    applyTheme()
    if (reducedMotion) render()
  },
)

watch(
  [innerData, outerData],
  () => {
    if (!ctx) return
    buildNodes()
    buildLinks()
    if (reducedMotion) render()
  },
)
</script>

<template>
  <div
    ref="root"
    class="pn-root relative h-full w-full overflow-hidden"
    role="img"
    :aria-label="t('about.network.aria')"
  >
    <!-- rotating ring -->
    <div class="pn-ring" aria-hidden="true" />

    <!-- centre node -->
    <div class="pn-center" aria-hidden="true">
      <div class="pn-center-badge">
        <img :src="logo" alt="" class="pn-center-logo">
        <span class="pn-center-pulse" />
      </div>

      <span class="pn-center-sub">{{ t('about.network.center_sub') }}</span>
    </div>

    <!-- canvas -->
    <canvas ref="canvas" class="pn-canvas" aria-hidden="true" />

    <!-- legend -->
    <div class="pn-legend" aria-hidden="true">
      <span class="pn-legend-item">
        <i class="pn-legend-dot is-inner" />{{ t('about.network.legend_mission') }}
      </span>
      <span class="pn-legend-item">
        <i class="pn-legend-dot is-outer" />{{ t('about.network.legend_vision') }}
      </span>
    </div>

    <!-- tooltip -->
    <div ref="tooltip" class="pn-tooltip" role="tooltip" aria-hidden="true">
      <strong ref="tooltipTitle" class="pn-tooltip-title" />
      <p ref="tooltipDesc" class="pn-tooltip-desc" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pn-root {
  /* theme tokens — defaults only; applyTheme() overrides these inline for the
     active color mode (a `.dark` stylesheet rule does not survive the scoped
     build, so JS drives the values). */
  --pn-primary: #ef4444;
  --pn-label: #475569;
  --pn-label-dim: #94a3b8;
  --pn-panel: #ffffff;

  position: relative;
  isolation: isolate;
}

.pn-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 88%;
  height: 88%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--pn-primary) 16%, transparent);
  border-top-color: color-mix(in srgb, var(--pn-primary) 75%, transparent);
  border-bottom-color: color-mix(in srgb, var(--pn-primary) 75%, transparent);
  animation: pn-spin 46s linear infinite;
  pointer-events: none;
}

@keyframes pn-spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.pn-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  touch-action: manipulation;
  cursor: default;
}

.pn-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  pointer-events: none;
  gap: 5px;
}

.pn-center-badge {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  padding: 3px;
  background: color-mix(in srgb, var(--pn-primary) 14%, transparent);
  box-shadow: 0 0 24px color-mix(in srgb, var(--pn-primary) 40%, transparent);
}

.pn-center-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid var(--pn-primary);
}

.pn-center-pulse {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid color-mix(in srgb, var(--pn-primary) 55%, transparent);
  animation: pn-pulse 2.4s ease-out infinite;
  pointer-events: none;
}

@keyframes pn-pulse {
  0% {
    transform: scale(0.85);
    opacity: 0.9;
  }
  100% {
    transform: scale(1.35);
    opacity: 0;
  }
}

.pn-center-title {
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pn-label);
}

.pn-center-sub {
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--pn-primary);
}

.pn-legend {
  position: absolute;
  left: 14px;
  bottom: 14px;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.66rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--pn-label-dim);
  pointer-events: none;
}

.pn-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.pn-legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;

  &.is-inner {
    background: var(--pn-primary);
    box-shadow: 0 0 6px var(--pn-primary);
  }

  &.is-outer {
    border: 1.5px solid var(--pn-primary);
    background: transparent;
  }
}

.pn-tooltip {
  position: absolute;
  z-index: 20;
  width: min(240px, 62vw);
  padding: 16px 18px;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--pn-panel) 52%, transparent) 0%,
    color-mix(in srgb, var(--pn-panel) 32%, transparent) 100%
  );
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid color-mix(in srgb, var(--pn-primary) 24%, transparent);
  border-left: 3px solid var(--pn-primary);
  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  opacity: 0;
  visibility: hidden;
  transform: translate(0, -50%);
  transition:
    opacity 0.18s ease,
    transform 0.12s ease-out,
    visibility 0.18s;

  /* frosted-glass sheen */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(120deg, rgba(255, 255, 255, 0.1) 0%, transparent 45%);
    pointer-events: none;
  }

  &.is-active {
    opacity: 1;
    visibility: visible;
  }
}

.pn-tooltip-title {
  display: block;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--pn-primary);
  margin-bottom: 6px;
  line-height: 1.3;
}

.pn-tooltip-desc {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.55;
  color: var(--pn-label);
}

@media (max-width: 640px) {
  .pn-legend {
    display: none;
  }

  .pn-center-badge {
    width: 52px;
    height: 52px;
  }

  .pn-center-title {
    font-size: 0.8rem;
  }
}
</style>
