import { useEffect } from 'react'

// Elements are only hidden while this class is present, so the page stays visible
// unless we are certain we can fade it back in.
const READY_CLASS = 'reveal-ready'

// If the observer has not reported a single intersection by now, treat it as
// broken and show everything.
const FAILSAFE_MS = 1500

// Fades elements marked with `data-reveal` in as they enter the viewport.
export default function useReveal() {
  useEffect(() => {
    const root = document.documentElement
    const showEverything = () => root.classList.remove(READY_CLASS)

    let observer
    let failsafe

    try {
      const targets = document.querySelectorAll('[data-reveal]')
      if (!targets.length || !('IntersectionObserver' in window)) {
        showEverything()
        return
      }

      root.classList.add(READY_CLASS)

      let revealedAny = false

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            revealedAny = true
            entry.target.setAttribute('data-revealed', 'true')
            observer.unobserve(entry.target)
          })
        },
        // A zero threshold keeps sections taller than the viewport from never
        // reaching a ratio high enough to trigger; the negative bottom margin is
        // what holds the fade back until the element is properly on screen.
        { rootMargin: '0px 0px -8% 0px', threshold: 0 },
      )

      targets.forEach((el) => observer.observe(el))

      failsafe = setTimeout(() => {
        if (!revealedAny) showEverything()
      }, FAILSAFE_MS)
    } catch {
      showEverything()
    }

    return () => {
      clearTimeout(failsafe)
      observer?.disconnect()
      // Drop the hide class on teardown so Vite HMR / Strict Mode remounts
      // can't leave the page stuck at opacity 0 with no observer attached.
      showEverything()
    }
  }, [])
}
