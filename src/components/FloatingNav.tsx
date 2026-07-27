import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import VectorIcon from './VectorIcon'

/**
 * "Floating Nav bar" (Figma 2153:17091) — a pill that replaces the static
 * header once the hero has scrolled away.
 *
 * Behaviour: it appears as soon as the hero leaves the viewport and stays put
 * for the rest of the page, regardless of scroll direction. Returning to the
 * hero puts you back on the normal header, which is still in the document and
 * simply scrolls with the page.
 *
 * The hero is tracked with an IntersectionObserver rather than a hard pixel
 * threshold, so it stays correct as the hero's height changes across
 * breakpoints.
 */
const NAV_LINKS = ['Live Zones', 'Community', 'Volunteers', 'Help Center']

/* "Elevation 2" from the frame. Figma's radii map straight onto box-shadow
   blur; box-shadow rather than drop-shadow because the pill is opaque. */
const PILL_SHADOW = [
  '0 1.67px 3.34px rgba(0,0,0,0.10)',
  '0 6.124px 6.124px rgba(0,0,0,0.09)',
  '0 14.474px 8.35px rgba(0,0,0,0.05)',
  '0 25.051px 10.02px rgba(0,0,0,0.01)',
  '0 39.525px 11.134px rgba(0,0,0,0)',
].join(', ')

export default function FloatingNav() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(false)

  // Shown = hero fully out of view. Any sliver of it visible counts as "back
  // on the hero", which is when the normal header should be showing instead.
  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0 },
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 px-[10px] pt-[34px] pb-[10px]"
      initial={false}
      animate={{ y: show ? 0 : -130, opacity: show ? 1 : 0 }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.42, ease: [0.16, 1, 0.3, 1] }
      }
      // Never intercept clicks while parked off-screen.
      style={{ pointerEvents: show ? 'auto' : 'none' }}
      aria-hidden={!show}
    >
      <nav
        className="mx-auto flex w-full max-w-[712px] items-center justify-center gap-[24px] rounded-[48px] bg-white px-[32px] py-[16px]"
        style={{ boxShadow: PILL_SHADOW }}
      >
        <a href="#" aria-label="Floodwatch home" className="shrink-0 p-[10.8px]">
          <img
            src="/assets/logo.svg"
            alt="Floodwatch"
            width={32.4}
            height={23.76}
            className="h-[23.76px] w-[32.4px]"
          />
        </a>

        <ul className="hidden items-center gap-[24px] lg:flex">
          {NAV_LINKS.map((label) => (
            <li key={label}>
              <a
                href="#"
                className="whitespace-nowrap text-[16px] font-normal leading-[24px] tracking-[-0.5px] text-body transition-colors duration-200 hover:text-ink"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#"
          className="flex shrink-0 items-center gap-[4px] rounded-[24px] bg-ink py-[8px] pl-[24px] pr-[16px] transition-transform duration-200 hover:-translate-y-0.5"
        >
          <span className="whitespace-nowrap text-[18px] font-medium leading-[24px] tracking-[-1px] text-white">
            Get the app
          </span>
          <VectorIcon
            src="/assets/icons/smartphone-white.svg"
            size={24}
            inset="8.33% 22.92%"
            bleed="-3.75% -5.77%"
          />
        </a>
      </nav>
    </motion.div>
  )
}
