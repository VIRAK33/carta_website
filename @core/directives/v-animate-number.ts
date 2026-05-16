import gsap from 'gsap'
import type { DirectiveBinding } from 'vue'

interface AnimateNumberBinding extends DirectiveBinding {
  value: {
    value: number
    duration?: number
  }
}

export default {
  mounted(el: HTMLElement, binding: AnimateNumberBinding) {
    const { value, duration = 1 } = binding.value

    gsap.fromTo(el, { textContent: 0 }, {
      textContent: value,
      duration,
      ease: 'power1.inOut',
      snap: { textContent: 1 },
      onUpdate() {
        el.innerHTML = Math.round(Number(el.textContent)).toString()
      },
    })
  },
  updated(el: HTMLElement, binding: AnimateNumberBinding) {
    const { value, duration = 1 } = binding.value

    gsap.to(el, {
      textContent: value,
      duration,
      ease: 'power1.inOut',
      snap: { textContent: 1 },
      onUpdate() {
        el.innerHTML = Math.round(Number(el.textContent)).toString()
      },
    })
  },
}
