import { useRef } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import type { UseInViewOptions, Variants } from 'motion/react'

type MarginType = UseInViewOptions['margin']

interface BlurFadeProps {
  children: ReactNode
  className?: string
  variant?: {
    hidden: { y: number }
    visible: { y: number }
  }
  duration?: number
  delay?: number
  yOffset?: number
  inView?: boolean
  inViewMargin?: MarginType
  blur?: string
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = '-50px',
  blur = '6px',
}: BlurFadeProps) {
  const ref = useRef(null)
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin })
  const isInView = !inView || inViewResult
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    // Deviation from the upstream registry component, which ends at
    // `y: -yOffset` and therefore leaves content permanently yOffset px above
    // its layout position. That silently broke this page's alignment with the
    // Figma frame by 6px. Resting at 0 keeps the entrance and lands the content
    // where the layout puts it. Re-check this if the component is ever
    // re-copied from the registry.
    visible: { y: 0, opacity: 1, filter: `blur(0px)` },
  }
  const combinedVariants = variant || defaultVariants
  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: 'easeOut',
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
