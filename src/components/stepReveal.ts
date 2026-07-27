/**
 * Shared choreography for the two step-by-step reveals on the page: section
 * four's status timeline and section five's capability checklist.
 *
 * Neither is in the Figma prototype — the frame only animates the logo's
 * pupils — so this rhythm is a design decision. Kept in one place so the two
 * sequences stay in step with each other.
 */
export const STEP_DELAY = 0.42 // seconds between one step starting and the next
export const MARKER_MS = 0.4
export const LINE_MS = 0.34

const MARKER_EASE = [0.34, 1.4, 0.64, 1] as const
const TEXT_EASE = [0.16, 1, 0.3, 1] as const

/** Marker lands with a slight overshoot. */
export const markerReveal = (index: number, play: boolean, reduce: boolean) => ({
  initial: reduce ? false : { opacity: 0, scale: 0.5 },
  animate: play ? { opacity: 1, scale: 1 } : undefined,
  transition: {
    duration: MARKER_MS,
    delay: index * STEP_DELAY,
    ease: MARKER_EASE,
  },
})

/** Copy slides in just behind its marker. */
export const copyReveal = (index: number, play: boolean, reduce: boolean) => ({
  initial: reduce ? false : { opacity: 0, x: -8 },
  animate: play ? { opacity: 1, x: 0 } : undefined,
  transition: {
    duration: 0.45,
    delay: index * STEP_DELAY + 0.08,
    ease: TEXT_EASE,
  },
})
