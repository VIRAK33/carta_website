<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import logo from '~/assets/images/logo/logo.webp'

/* ============================================================================
 * Modern ParticleNetwork — Interactive AI & Robotics Neural Network (About Hero).
 *
 * Features:
 *  - 100% perfectly centered hub with CARTA logo, breathing aura, and pulse ring
 *  - High-contrast nodes & labels visible in BOTH dark and light ("white") themes
 *  - Multi-tier nodes: 4 Core Missions (Inner Ring) & 8 Vision Outcomes (Outer Ring)
 *  - Concentric circular orbital guides and synaptic connections with flowing energy
 *  - Sleek glassmorphic HUD tooltip with translated content on hover/tap
 *  - Clean layout with zero overlaps or clutter
 * ========================================================================== */

type RingType = 'inner' | 'outer'

interface INodeDatum {
  id: string
  title: string
  desc: string
  badge: string
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
  amp: number
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
  color: string
}

interface IDust {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  a: number
  color: string
}

interface IPing {
  node: INetNode
  age: number
  maxRadius: number
}

const props = withDefaults(
  defineProps<{
    accent?: string
  }>(),
  { accent: '' },
)

const { t, locale } = useI18n()
const colorMode = useColorMode()

const root = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const isTouch = ref(false)
const selectedNode = ref<INetNode | null>(null)
const isInteracted = ref(false)

const innerData = computed<INodeDatum[]>(() => [
  {
    id: 'm1',
    title: t('about.network.mission_1_title'),
    desc: t('about.network.mission_1_des'),
    badge: locale.value === 'km' ? 'បេសកកម្ម ០១' : 'MISSION 01',
  },
  {
    id: 'm2',
    title: t('about.network.mission_2_title'),
    desc: t('about.network.mission_2_des'),
    badge: locale.value === 'km' ? 'បេសកកម្ម ០២' : 'MISSION 02',
  },
  {
    id: 'm3',
    title: t('about.network.mission_3_title'),
    desc: t('about.network.mission_3_des'),
    badge: locale.value === 'km' ? 'បេសកកម្ម ០៣' : 'MISSION 03',
  },
  {
    id: 'm4',
    title: t('about.network.mission_4_title'),
    desc: t('about.network.mission_4_des'),
    badge: locale.value === 'km' ? 'បេសកកម្ម ០៤' : 'MISSION 04',
  },
])

const outerData = computed<INodeDatum[]>(() => [
  {
    id: 'v1',
    title: t('about.network.vision_1_title'),
    desc: t('about.network.vision_1_des'),
    badge: locale.value === 'km' ? 'ចក្ខុវិស័យ ០១' : 'VISION 01',
  },
  {
    id: 'v2',
    title: t('about.network.vision_2_title'),
    desc: t('about.network.vision_2_des'),
    badge: locale.value === 'km' ? 'ចក្ខុវិស័យ ០២' : 'VISION 02',
  },
  {
    id: 'v3',
    title: t('about.network.vision_3_title'),
    desc: t('about.network.vision_3_des'),
    badge: locale.value === 'km' ? 'ចក្ខុវិស័យ ០៣' : 'VISION 03',
  },
  {
    id: 'v4',
    title: t('about.network.vision_4_title'),
    desc: t('about.network.vision_4_des'),
    badge: locale.value === 'km' ? 'ចក្ខុវិស័យ ០៤' : 'VISION 04',
  },
  {
    id: 'v5',
    title: t('about.network.vision_5_title'),
    desc: t('about.network.vision_5_des'),
    badge: locale.value === 'km' ? 'ចក្ខុវិស័យ ០៥' : 'VISION 05',
  },
  {
    id: 'v6',
    title: t('about.network.vision_6_title'),
    desc: t('about.network.vision_6_des'),
    badge: locale.value === 'km' ? 'ចក្ខុវិស័យ ០៦' : 'VISION 06',
  },
  {
    id: 'v7',
    title: t('about.network.vision_7_title'),
    desc: t('about.network.vision_7_des'),
    badge: locale.value === 'km' ? 'ចក្ខុវិស័យ ០៧' : 'VISION 07',
  },
  {
    id: 'v8',
    title: t('about.network.vision_8_title'),
    desc: t('about.network.vision_8_des'),
    badge: locale.value === 'km' ? 'ចក្ខុវិស័យ ០៨' : 'VISION 08',
  },
])

/* ----------------------------- Renderer State ---------------------------- */
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
let resizeRaf = 0
let observer: IntersectionObserver | null = null

const mouse = { x: 0, y: 0, tx: 0, ty: 0, px: 0, py: 0, active: false }

const theme = {
  primary: '#dc2626',
  secondary: '#ea580c',
  accent: '#0284c7',
  label: '#1e293b',
  labelDim: '#64748b',
  isDark: false,
}

/* ----------------------------- Color Helpers ----------------------------- */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace('#', '')
  if (m.length === 3) {
    const r = Number.parseInt(m[0] + m[0], 16)
    const g = Number.parseInt(m[1] + m[1], 16)
    const b = Number.parseInt(m[2] + m[2], 16)
    return { r, g, b }
  }
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
  theme.isDark = dark
  theme.primary = props.accent || (dark ? '#f87171' : '#dc2626')
  theme.secondary = dark ? '#fb923c' : '#ea580c'
  theme.accent = dark ? '#38bdf8' : '#0284c7'
  theme.label = dark ? '#e2e8f0' : '#1e293b'
  theme.labelDim = dark ? '#94a3b8' : '#64748b'

  if (root.value) {
    root.value.style.setProperty('--pn-primary', theme.primary)
    root.value.style.setProperty('--pn-label', theme.label)
    root.value.style.setProperty('--pn-label-dim', theme.labelDim)
  }
}

/* --------------------------- Node Construction --------------------------- */
function makeNode(datum: INodeDatum, ring: RingType, index: number, total: number): INetNode {
  let baseAngle = ((Math.PI * 2) / total) * index
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
    speed: 0.35 + Math.random() * 0.35,
    amp: ring === 'inner' ? 7 : 10,
    x: 0,
    y: 0,
    hovered: false,
  }
}

function buildNodes() {
  innerNodes = innerData.value.map((d, i) => makeNode(d, 'inner', i, innerData.value.length))
  outerNodes = outerData.value.map((d, i) => makeNode(d, 'outer', i, outerData.value.length))
  buildPackets()
}

function buildPackets() {
  packets = []
  pings = []
  const add = (from: INetNode | null, to: INetNode, size: number, speedMul: number, color?: string) => {
    packets.push({
      from,
      to,
      progress: Math.random(),
      speed: (0.0014 + Math.random() * 0.0018) * speedMul,
      size,
      phase: Math.random() * Math.PI * 2,
      color: color || theme.primary,
    })
  }

  // Centre hub -> inner ring
  innerNodes.forEach((to) => add(null, to, 2.6, 1.2, theme.primary))

  // Inner ring polygon
  innerNodes.forEach((n, i) =>
    add(n, innerNodes[(i + 1) % innerNodes.length], 2.2, 0.8, theme.secondary),
  )

  // Inner -> Outer mesh
  innerNodes.forEach((inner, i) => {
    const targets = [
      outerNodes[(i * 2) % outerNodes.length],
      outerNodes[(i * 2 + 1) % outerNodes.length],
      outerNodes[(i * 2 - 1 + outerNodes.length) % outerNodes.length],
    ]
    targets.forEach((outer) => add(inner, outer, 2.2, 0.95))
  })

  // Outer ring polygon
  outerNodes.forEach((n, j) =>
    add(n, outerNodes[(j + 1) % outerNodes.length], 2.0, 0.7, theme.accent),
  )
}

function makeDust() {
  const count = Math.min(45, Math.floor((width * height) / 14000))
  dust = Array.from({ length: count }, () => {
    const colors = [theme.primary, theme.secondary, theme.accent]
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.8 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      a: theme.isDark ? 0.08 + Math.random() * 0.2 : 0.14 + Math.random() * 0.25,
      color: colors[Math.floor(Math.random() * colors.length)] || theme.primary,
    }
  })
}

/* --------------------------- Graph Adjacency ----------------------------- */
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
    if (o1) addEdge(inner, o1)
    if (o2) addEdge(inner, o2)
    if (op) addEdge(inner, op)
  })
}

/* ------------------------------- Sizing ---------------------------------- */
function resize() {
  if (!root.value || !canvas.value) return
  const rect = root.value.getBoundingClientRect()
  width = Math.max(1, rect.width)
  height = Math.max(1, rect.height)
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.value.width = Math.round(width * dpr)
  canvas.value.height = Math.round(height * dpr)

  // 100% exact dead center
  centerX = width / 2
  centerY = height / 2
  maxRadius = (Math.min(width, height) * 0.84) / 2

  buildNodes()
  buildLinks()
  makeDust()
  positionAll(0, 0, 0)
  if (reducedMotion) render()
}

/* ----------------------------- Animation Loop ---------------------------- */
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
  const allNodes = [...innerNodes, ...outerNodes]

  allNodes.forEach((n) => {
    // Harmonic orbital wave
    const angle = n.baseAngle + Math.cos(t * n.speed * 0.5 + n.phase) * 0.035
    const radius = n.baseRadius + Math.sin(t * n.speed + n.phase) * n.amp

    let targetX = centerX + Math.cos(angle) * radius + ox
    let targetY = centerY + Math.sin(angle) * radius + oy

    // Pointer magnetic force
    if (mouse.active) {
      const distToPointer = Math.hypot(targetX - mouse.px, targetY - mouse.py)
      if (distToPointer < 130) {
        const force = (1 - distToPointer / 130) * 12
        const angleToPointer = Math.atan2(targetY - mouse.py, targetX - mouse.px)
        targetX += Math.cos(angleToPointer) * force
        targetY += Math.sin(angleToPointer) * force
      }
    }

    // Spring interpolation for fluid organic feel
    n.x += (targetX - n.x) * 0.12
    n.y += (targetY - n.y) * 0.12
  })
}

function step() {
  time += 0.016

  // Smooth mouse inertia
  mouse.x += (mouse.tx - mouse.x) * 0.07
  mouse.y += (mouse.ty - mouse.y) * 0.07
  const ox = mouse.x * 8
  const oy = mouse.y * 8

  positionAll(time, ox, oy)

  // Energy packets
  packets.forEach((p) => {
    p.progress += p.speed
    if (p.progress > 1) {
      p.progress = 0
      pings.push({ node: p.to, age: 0, maxRadius: p.to.ring === 'inner' ? 24 : 18 })
    }
  })

  // Fade arrival pings
  for (let i = pings.length - 1; i >= 0; i--) {
    const ping = pings[i]
    if (!ping) continue
    ping.age += 0.024
    if (ping.age >= 1) pings.splice(i, 1)
  }

  // Drifting dust particles
  dust.forEach((p) => {
    p.x += p.vx
    p.y += p.vy
    if (p.x < -6) p.x = width + 6
    if (p.x > width + 6) p.x = -6
    if (p.y < -6) p.y = height + 6
    if (p.y > height + 6) p.y = -6
  })

  render()
}

/* -------------------------------- Rendering ------------------------------ */
function render() {
  const c = ctx
  if (!c) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  c.setTransform(dpr, 0, 0, dpr, 0, 0)
  c.clearRect(0, 0, width, height)

  drawGridAura(c)
  drawDust(c)
  drawConnections(c)
  drawPackets(c)
  drawPings(c)
  drawNodes(c)
}

function drawGridAura(c: CanvasRenderingContext2D) {
  // Radial glow around center
  const aura = c.createRadialGradient(
    centerX,
    centerY,
    maxRadius * 0.1,
    centerX,
    centerY,
    maxRadius * 0.95,
  )
  aura.addColorStop(0, withAlpha(theme.primary, theme.isDark ? 0.12 : 0.06))
  aura.addColorStop(0.6, withAlpha(theme.secondary, theme.isDark ? 0.04 : 0.02))
  aura.addColorStop(1, 'transparent')

  c.fillStyle = aura
  c.beginPath()
  c.arc(centerX, centerY, maxRadius * 0.95, 0, Math.PI * 2)
  c.fill()

  // Orbital guides (delicate futuristic HUD rings strictly centered)
  c.save()
  c.lineWidth = 1
  c.setLineDash([3, 8])
  c.strokeStyle = withAlpha(theme.primary, theme.isDark ? 0.18 : 0.18)

  c.beginPath()
  c.arc(centerX, centerY, maxRadius * 0.44, 0, Math.PI * 2)
  c.stroke()

  c.beginPath()
  c.arc(centerX, centerY, maxRadius * 0.84, 0, Math.PI * 2)
  c.stroke()
  c.restore()
}

function drawDust(c: CanvasRenderingContext2D) {
  dust.forEach((p) => {
    c.fillStyle = p.color
    c.globalAlpha = p.a
    c.beginPath()
    c.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    c.fill()
  })
  c.globalAlpha = 1
}

function drawConnections(c: CanvasRenderingContext2D) {
  const accent = theme.primary
  const hlNode = selectedNode.value
  const isLinkedTo = (a: INetNode, b: INetNode) => linked.get(a)?.has(b) ?? false
  const isHot = (a: INetNode) => hlNode !== null && (a === hlNode || isLinkedTo(a, hlNode))

  // In light mode, use higher baseline opacity so lines are crisp and visible
  const baseAlphaInner = theme.isDark ? (hlNode ? 0.06 : 0.22) : (hlNode ? 0.1 : 0.42)
  const baseAlphaOuter = theme.isDark ? (hlNode ? 0.04 : 0.16) : (hlNode ? 0.08 : 0.35)
  const baseAlphaMesh = theme.isDark ? (hlNode ? 0.04 : 0.18) : (hlNode ? 0.08 : 0.38)

  // Centre hub -> Inner nodes
  innerNodes.forEach((n) => {
    const hot = isHot(n)
    const strokeAlpha = hot ? 0.95 : baseAlphaInner
    c.lineWidth = hot ? 2.4 : (theme.isDark ? 1.1 : 1.3)

    const grad = c.createLinearGradient(centerX, centerY, n.x, n.y)
    grad.addColorStop(0, withAlpha(accent, strokeAlpha))
    grad.addColorStop(1, withAlpha(theme.secondary, strokeAlpha))

    c.strokeStyle = grad
    c.beginPath()
    c.moveTo(centerX, centerY)
    c.lineTo(n.x, n.y)
    c.stroke()
  })

  // Inner ring polygon
  c.lineWidth = hlNode ? 1 : (theme.isDark ? 1.2 : 1.4)
  for (let i = 0; i < innerNodes.length; i++) {
    const a = innerNodes[i]
    const b = innerNodes[(i + 1) % innerNodes.length]
    if (!a || !b) continue

    const hot = hlNode !== null && ((a === hlNode && isLinkedTo(b, a)) || (b === hlNode && isLinkedTo(a, b)))
    const strokeAlpha = hot ? 0.95 : (hlNode ? 0.05 : (theme.isDark ? 0.26 : 0.45))

    c.strokeStyle = withAlpha(accent, strokeAlpha)
    c.beginPath()
    c.moveTo(a.x, a.y)
    c.lineTo(b.x, b.y)
    c.stroke()
  }

  // Outer ring polygon
  for (let j = 0; j < outerNodes.length; j++) {
    const a = outerNodes[j]
    const b = outerNodes[(j + 1) % outerNodes.length]
    if (!a || !b) continue

    const hot = hlNode !== null && ((a === hlNode && isLinkedTo(b, a)) || (b === hlNode && isLinkedTo(a, b)))
    const strokeAlpha = hot ? 0.95 : baseAlphaOuter

    c.strokeStyle = withAlpha(theme.accent, strokeAlpha)
    c.beginPath()
    c.moveTo(a.x, a.y)
    c.lineTo(b.x, b.y)
    c.stroke()
  }

  // Inner <-> Outer mesh
  innerNodes.forEach((inner, i) => {
    const targets = [
      outerNodes[(i * 2) % outerNodes.length],
      outerNodes[(i * 2 + 1) % outerNodes.length],
      outerNodes[(i * 2 - 1 + outerNodes.length) % outerNodes.length],
    ].filter((o): o is INetNode => Boolean(o))

    targets.forEach((outer) => {
      const hot = hlNode !== null && (hlNode === inner || hlNode === outer)
      const strokeAlpha = hot ? 0.98 : baseAlphaMesh
      c.lineWidth = hot ? 2.4 : (theme.isDark ? 0.9 : 1.1)

      const grad = c.createLinearGradient(inner.x, inner.y, outer.x, outer.y)
      grad.addColorStop(0, withAlpha(accent, strokeAlpha))
      grad.addColorStop(1, withAlpha(theme.accent, strokeAlpha))

      c.strokeStyle = grad
      c.beginPath()
      c.moveTo(inner.x, inner.y)
      c.lineTo(outer.x, outer.y)
      c.stroke()
    })
  })
}

function drawPackets(c: CanvasRenderingContext2D) {
  c.save()
  // In dark mode: additive blending gives vibrant neon glow.
  // In light mode: standard source-over ensures saturated, visible photons that don't wash out to white.
  c.globalCompositeOperation = theme.isDark ? 'lighter' : 'source-over'
  c.lineCap = 'round'

  packets.forEach((p) => {
    const fx = p.from ? p.from.x : centerX
    const fy = p.from ? p.from.y : centerY
    const dx = p.to.x - fx
    const dy = p.to.y - fy
    const len = Math.hypot(dx, dy) || 1
    const ux = dx / len
    const uy = dy / len

    const hx = fx + dx * p.progress
    const hy = fy + dy * p.progress

    const pulse = 0.5 + 0.5 * Math.sin(time * 3 + p.phase)
    const tailLen = Math.min(len * 0.35, 36)
    const tx = hx - ux * tailLen
    const ty = hy - uy * tailLen

    const grad = c.createLinearGradient(tx, ty, hx, hy)
    grad.addColorStop(0, withAlpha(p.color, 0))
    grad.addColorStop(0.7, withAlpha(p.color, theme.isDark ? 0.8 * pulse : 0.95))
    grad.addColorStop(1, theme.isDark ? '#ffffff' : p.color)

    c.strokeStyle = grad
    c.lineWidth = theme.isDark ? p.size : p.size * 1.3
    c.beginPath()
    c.moveTo(tx, ty)
    c.lineTo(hx, hy)
    c.stroke()

    // Leading photon dot
    c.fillStyle = theme.isDark ? '#ffffff' : p.color
    c.beginPath()
    c.arc(hx, hy, (theme.isDark ? p.size : p.size * 1.1) * (0.8 + pulse * 0.3), 0, Math.PI * 2)
    c.fill()
  })

  c.restore()
}

function drawPings(c: CanvasRenderingContext2D) {
  if (pings.length === 0) return
  c.save()

  pings.forEach((ping) => {
    const t = ping.age
    const r = 4 + t * ping.maxRadius
    c.strokeStyle = withAlpha(theme.primary, (1 - t) * (theme.isDark ? 0.7 : 0.85))
    c.lineWidth = Math.max(1, (1 - t) * 2.2)
    c.beginPath()
    c.arc(ping.node.x, ping.node.y, r, 0, Math.PI * 2)
    c.stroke()
  })

  c.restore()
}

function drawNodes(c: CanvasRenderingContext2D) {
  const allNodes = [...innerNodes, ...outerNodes]
  const hlNode = selectedNode.value
  const accent = theme.primary
  const isMobile = width < 500

  allNodes.forEach((n) => {
    const hot = n === hlNode
    const isInner = n.ring === 'inner'

    const alpha = hlNode ? (hot ? 1 : 0.35) : 1
    c.globalAlpha = alpha

    c.save()
    if (hot) {
      c.shadowColor = accent
      c.shadowBlur = theme.isDark ? 24 : 14
    } else {
      c.shadowColor = withAlpha(accent, theme.isDark ? 0.4 : 0.25)
      c.shadowBlur = theme.isDark ? 8 : 4
    }

    if (isInner) {
      // Core Mission Node (Inner Ring) — Solid saturated crimson
      const baseR = hot ? 8.5 : 6.5

      // Outer breathing halo ring
      c.strokeStyle = withAlpha(accent, hot ? 0.95 : (theme.isDark ? 0.45 : 0.55))
      c.lineWidth = hot ? 2.5 : 1.6
      c.beginPath()
      c.arc(n.x, n.y, hot ? 22 : 14, 0, Math.PI * 2)
      c.stroke()

      // Solid Node Body
      c.fillStyle = hot ? (theme.isDark ? '#ffffff' : '#b91c1c') : accent
      c.beginPath()
      c.arc(n.x, n.y, baseR, 0, Math.PI * 2)
      c.fill()

      // High-contrast center core dot (white in light mode, accent in dark mode)
      c.fillStyle = theme.isDark ? accent : '#ffffff'
      c.beginPath()
      c.arc(n.x, n.y, baseR * 0.42, 0, Math.PI * 2)
      c.fill()
    } else {
      // Vision Outcome Node (Outer Ring) — Electric Blue
      const ringR = hot ? 8.5 : 6.5
      const color = theme.isDark ? theme.accent : '#0284c7'

      // Outer breathing halo ring
      c.strokeStyle = withAlpha(color, hot ? 0.9 : (theme.isDark ? 0.35 : 0.5))
      c.lineWidth = hot ? 2.2 : 1.5
      c.beginPath()
      c.arc(n.x, n.y, hot ? 22 : 15, 0, Math.PI * 2)
      c.stroke()

      // Outer Ring
      c.strokeStyle = hot ? (theme.isDark ? '#ffffff' : '#0369a1') : color
      c.lineWidth = hot ? 3.2 : 2.4
      c.beginPath()
      c.arc(n.x, n.y, ringR, 0, Math.PI * 2)
      c.stroke()

      // Solid Center Core Dot
      c.fillStyle = hot ? (theme.isDark ? '#ffffff' : '#0369a1') : color
      c.beginPath()
      c.arc(n.x, n.y, hot ? 3.8 : 2.8, 0, Math.PI * 2)
      c.fill()
    }

    // Active crosshair reticle for hot node
    if (hot) {
      const crossR = 26
      c.strokeStyle = withAlpha(accent, 0.9)
      c.lineWidth = 1.4
      c.setLineDash([4, 4])
      c.beginPath()
      c.arc(n.x, n.y, crossR, 0, Math.PI * 2)
      c.stroke()
      c.setLineDash([])
    }

    c.restore()

    // Render clean, readable node labels
    if (!isMobile || hot) {
      const scale = isMobile ? 0.82 : 1
      const dist = (n.ring === 'inner' ? 24 : 28) * scale
      const tx = n.x + Math.cos(n.baseAngle) * dist
      const ty = n.y + Math.sin(n.baseAngle) * dist

      c.font = `${hot ? 700 : 600} ${10.5 * scale}px 'Quicksand', 'Kantumruy Pro', sans-serif`
      c.textAlign = 'center'
      c.textBaseline = 'middle'

      const textColor = hot
        ? (theme.isDark ? '#f87171' : '#dc2626')
        : (theme.isDark ? '#cbd5e1' : '#1e293b')

      // White outline in light mode / dark outline in dark mode for maximum contrast
      c.strokeStyle = theme.isDark ? 'rgba(11, 19, 36, 0.92)' : 'rgba(255, 255, 255, 0.95)'
      c.lineWidth = 3
      c.strokeText(n.datum.title, tx, ty)
      c.fillStyle = textColor
      c.fillText(n.datum.title, tx, ty)
    }
  })

  c.globalAlpha = 1
}

/* ------------------------------- Interaction ----------------------------- */
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
    // Touch tap / click toggle
    if (hit) {
      isInteracted.value = true
      selectedNode.value = selectedNode.value === hit ? null : hit
    } else {
      selectedNode.value = null
    }
  } else {
    // Desktop hover
    if (hit) {
      isInteracted.value = true
      selectedNode.value = hit
      if (canvas.value) canvas.value.style.cursor = 'pointer'
    } else {
      selectedNode.value = null
      if (canvas.value) canvas.value.style.cursor = 'default'
    }
  }

  if (reducedMotion) render()
}

function onPointerMove(e: PointerEvent) {
  if (isTouch.value || !canvas.value) return
  const rect = canvas.value.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top

  mouse.active = true
  mouse.px = mx
  mouse.py = my
  mouse.tx = (mx / width) * 2 - 1
  mouse.ty = (my / height) * 2 - 1

  hitTest(mx, my, false)
}

function onPointerDown(e: PointerEvent) {
  if (!canvas.value) return
  const rect = canvas.value.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top
  hitTest(mx, my, true)
}

function onPointerLeave() {
  mouse.active = false
  if (!isTouch.value) {
    selectedNode.value = null
  }
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

function closeTooltip() {
  selectedNode.value = null
}

/* -------------------------------- Lifecycle ------------------------------ */
onMounted(() => {
  if (!root.value || !canvas.value) return
  const c = canvas.value.getContext('2d')
  if (!c) return
  ctx = c

  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  isTouch.value = window.matchMedia('(hover: none), (pointer: coarse)').matches

  applyTheme()
  resize()

  canvas.value.addEventListener('pointermove', onPointerMove)
  canvas.value.addEventListener('pointerdown', onPointerDown)
  canvas.value.addEventListener('pointerleave', onPointerLeave)
  useEventListener(window, 'resize', onResize, { passive: true })

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      visible = Boolean(entry?.isIntersecting)
      if (visible) start()
      else stop()
    },
    { rootMargin: '100px' },
  )
  observer.observe(root.value)
  start()
})

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
  if (canvas.value) {
    canvas.value.removeEventListener('pointermove', onPointerMove)
    canvas.value.removeEventListener('pointerdown', onPointerDown)
    canvas.value.removeEventListener('pointerleave', onPointerLeave)
  }
  observer?.disconnect()
  observer = null
})

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
    class="pn-root group relative h-full w-full select-none overflow-hidden rounded-3xl border border-gray-200/90 dark:border-white/10 bg-gradient-to-br from-slate-50 via-white to-primary-50/20 dark:from-gray-950 dark:via-slate-900 dark:to-primary-950/25 backdrop-blur-2xl shadow-xl shadow-primary-500/5 transition-all duration-300"
    role="img"
    :aria-label="t('about.network.aria')"
  >
    <!-- 100% Dead Center Hub with CARTA Logo -->
    <div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center text-center">
      <div class="relative flex items-center justify-center">
        <!-- Ambient Breathing Aura -->
        <span class="pn-center-aura absolute inset-[-14px] rounded-full bg-gradient-to-tr from-primary-500/35 to-amber-500/25 blur-md" />

        <!-- Logo Container -->
        <div class="relative z-10 h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-full border-2 border-primary-500 bg-white dark:bg-gray-950 p-1.5 shadow-xl shadow-primary-500/30">
          <img :src="logo" alt="CARTA" class="h-full w-full rounded-full object-cover">
        </div>

        <!-- Radar Pulse Ripple -->
        <span class="pn-center-pulse pointer-events-none absolute inset-[-8px] rounded-full border-2 border-primary-500/60" />
      </div>

      <span class="mt-2 text-[11px] font-bold tracking-widest uppercase text-primary-600 dark:text-primary-400 font-mono">
        {{ t('about.network.center_sub') }}
      </span>
    </div>

    <!-- Canvas -->
    <canvas ref="canvas" class="absolute inset-0 z-10 h-full w-full touch-manipulation" />

    <!-- Interactive Hint (fades out after first interaction) -->
    <div
      v-if="!selectedNode && !isInteracted"
      class="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 rounded-full bg-white/85 dark:bg-gray-900/85 px-3 py-1 text-[11px] font-medium text-gray-600 dark:text-gray-400 shadow-sm backdrop-blur-md ring-1 ring-black/10 dark:ring-white/10"
    >
      <Icon name="material-symbols:touch-app-rounded" class="text-xs text-primary-500 animate-pulse" />
      <span>{{ isTouch ? t('about.network.hint_mobile') : t('about.network.hint') }}</span>
    </div>

    <!-- Legend (Desktop, Bottom Left) -->
    <div class="pointer-events-none absolute bottom-3.5 left-4 z-20 hidden sm:flex items-center gap-4 text-[11px] font-semibold text-gray-600 dark:text-gray-400">
      <span class="inline-flex items-center gap-1.5">
        <span class="h-2.5 w-2.5 rounded-full bg-primary-600 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
        {{ t('about.network.legend_mission') }}
      </span>
      <span class="inline-flex items-center gap-1.5">
        <span class="h-2.5 w-2.5 rounded-full border-2 border-sky-500 bg-sky-500/20" />
        {{ t('about.network.legend_vision') }}
      </span>
    </div>

    <!-- Futuristic Glassmorphic HUD Tooltip Card -->
    <Transition name="hud-fade">
      <div
        v-if="selectedNode"
        class="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30 max-w-[290px] sm:max-w-[320px] rounded-2xl bg-white/95 dark:bg-gray-950/90 p-4 sm:p-5 shadow-2xl backdrop-blur-2xl ring-1 ring-black/10 dark:ring-white/15 border-l-4 border-primary-500"
      >
        <!-- Header: Badge & Close Button -->
        <div class="flex items-center justify-between gap-2 mb-2">
          <span
            class="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase"
            :class="selectedNode.ring === 'inner' ? 'bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-400' : 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400'"
          >
            <span class="h-1.5 w-1.5 rounded-full" :class="selectedNode.ring === 'inner' ? 'bg-primary-500' : 'bg-sky-500'" />
            {{ selectedNode.datum.badge }}
          </span>

          <button
            type="button"
            class="grid place-items-center h-6 w-6 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            @click="closeTooltip"
          >
            <Icon name="material-symbols:close-rounded" class="text-sm" />
          </button>
        </div>

        <!-- Title -->
        <h4 class="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-100 leading-snug mb-2">
          {{ selectedNode.datum.title }}
        </h4>

        <!-- Description -->
        <p class="text-xs sm:text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ selectedNode.datum.desc }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.pn-center-pulse {
  animation: pn-pulse 2.5s ease-out infinite;
}

@keyframes pn-pulse {
  0% {
    transform: scale(0.9);
    opacity: 0.9;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

.hud-fade-enter-active,
.hud-fade-leave-active {
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.hud-fade-enter-from,
.hud-fade-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.96);
}
</style>
