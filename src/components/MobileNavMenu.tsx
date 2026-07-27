import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import VectorIcon from './VectorIcon'
import { APP_URL } from '../links'

/**
 * Below lg, both navs swap their "Get the app" button for this hamburger. The
 * panel carries the four nav links plus the button, so nothing is unreachable
 * on a phone.
 *
 * Not in the Figma frame — the design has no mobile artboard, so the styling
 * follows the page's own language: white card, 24px radius, the floating nav's
 * "Elevation 2" shadow.
 */
const NAV_LINKS = ['Live Zones', 'Community', 'Volunteers', 'Help Center']

const PANEL_SHADOW = [
  '0 1.67px 3.34px rgba(0,0,0,0.10)',
  '0 6.124px 6.124px rgba(0,0,0,0.09)',
  '0 14.474px 8.35px rgba(0,0,0,0.05)',
  '0 25.051px 10.02px rgba(0,0,0,0.01)',
].join(', ')

type Props = {
  /**
   * Distance from the bottom of the toggle to the top of the panel. The toggle
   * is smaller than the bar containing it, so this has to clear that overhang
   * as well — the floating pill extends ~19px below its button, which is why it
   * passes a larger value than the header.
   */
  panelOffset?: number
}

export default function MobileNavMenu({ panelOffset = 12 }: Props) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Escape closes and returns focus; a press outside just closes.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative shrink-0 lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? 'Close menu' : 'Open menu'}
        /* A bare line icon, not a filled button. The 40px box is kept purely as
           a touch target — it has no background of its own. */
        className="-mr-[8px] flex size-[40px] items-center justify-center transition-opacity duration-200 hover:opacity-60"
      >
        {open ? (
          <img
            src="/assets/icons/cancel-ink.svg"
            alt=""
            aria-hidden
            className="w-[16px]"
          />
        ) : (
          <img
            src="/assets/icons/menu-ink.svg"
            alt=""
            aria-hidden
            className="w-[22px]"
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-panel"
            className="absolute right-0 z-10 w-[228px] rounded-[24px] bg-white p-[20px]"
            style={{ top: `calc(100% + ${panelOffset}px)`, boxShadow: PANEL_SHADOW }}
            initial={reduce ? false : { opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="flex flex-col gap-[16px]">
              {NAV_LINKS.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    onClick={() => setOpen(false)}
                    className="block text-[16px] font-normal leading-[24px] tracking-[-0.5px] text-body transition-colors duration-200 hover:text-ink"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={APP_URL}
              onClick={() => setOpen(false)}
              className="mt-[20px] flex items-center justify-center gap-[4px] rounded-[24px] bg-ink py-[10px]"
            >
              <span className="whitespace-nowrap text-[16px] font-medium leading-[24px] tracking-[-0.5px] text-white">
                Get the app
              </span>
              <VectorIcon
                src="/assets/icons/smartphone-white.svg"
                size={20}
                inset="8.33% 22.92%"
                bleed="-3.75% -5.77%"
              />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
