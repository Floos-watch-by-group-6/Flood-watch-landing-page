import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import VectorIcon from '../VectorIcon'
import FloodwatchMark from '../FloodwatchMark'
import {
  markerReveal,
  copyReveal,
  STEP_DELAY,
  MARKER_MS,
  LINE_MS,
} from '../stepReveal'

/**
 * "No report is left hanging." — the single wide card in section four
 * (Figma 2006:18664, 1071×539): copy on the left, a five-step status timeline
 * on the right.
 *
 * The timeline is built as one flow list rather than the frame's absolutely
 * positioned circles and connectors, tuned so it lands on the frame's 91px step
 * pitch at desktop. That way it reflows on its own below the frame breakpoint
 * instead of needing a second layout.
 */
type Step = { title: string; sub: string; logo?: boolean }

const STEPS: Step[] = [
  {
    title: 'Reported by @KBSHOG|',
    sub: 'Ajah, Addo Rd · just now',
  },
  { title: '2 confirmations', sub: 'Nearby neighbours checked in' },
  { title: 'Verified', sub: '3rd confirmation came in' },
  { title: 'No new confirms in 2 hrs', sub: 'Quietly re-checked' },
  {
    title: 'Likely Resolved',
    sub: 'Status updated automatically',
    /* The last marker swaps the tick for the Floodwatch mark. */
    logo: true,
  },
]

/**
 * The steps play in sequence when the card scrolls into view, mirroring the
 * report's own progression: marker lands, its connector draws down to the next,
 * then the following step follows it. Timing is shared with section five's
 * checklist — see stepReveal.
 */
export default function TimelineCard() {
  const reduce = useReducedMotion()
  const listRef = useRef<HTMLOListElement>(null)
  const inView = useInView(listRef, { once: true, margin: '-80px' })
  // useReducedMotion returns boolean | null, so coerce before it leaves here
  const play = inView || !!reduce

  return (
    <div className="relative w-full overflow-clip rounded-[24px] border border-[rgba(216,216,216,0.09)] bg-[#fafafa] min-[1119px]:h-[539px]">
      <div className="flex flex-col gap-6 p-6 min-[1119px]:block min-[1119px]:p-0">
        <p className="text-[26px] font-medium leading-[1.1] tracking-[-0.5px] text-[#4a4958] min-[1119px]:absolute min-[1119px]:left-[48px] min-[1119px]:top-[48px] min-[1119px]:w-[351px] min-[1119px]:text-[40px] min-[1119px]:leading-[42px]">
          No report is left hanging.
        </p>

        {/* Frame places this block's text column at x=733 and the markers at
            x=682 — a 32px marker plus a 19px gap. */}
        <ol
          ref={listRef}
          className="flex flex-col min-[1119px]:absolute min-[1119px]:left-[682px] min-[1119px]:top-[47px] min-[1119px]:w-[298px]"
        >
          {STEPS.map((step, i) => {
            const at = i * STEP_DELAY
            return (
              <li key={step.title} className="flex gap-[19px]">
                <div className="flex flex-col items-center">
                  {/* 14px drop aligns the marker with the frame, which sits it
                      below the title's optical centre rather than on it. */}
                  <motion.span
                    className="mt-[14px] flex size-[32px] shrink-0 items-center justify-center rounded-full bg-cute-500"
                    {...markerReveal(i, play, !!reduce)}
                  >
                    {step.logo ? (
                      /* Glances once when the step lands, per the frame's
                         AFTER_TIMEOUT loop on this instance. */
                      <FloodwatchMark
                        animated={play}
                        className="h-[9.619px] w-[14px]"
                      />
                    ) : (
                      <VectorIcon
                        src="/assets/icons/tick-white.svg"
                        size={16}
                        inset="27.08% 20.83%"
                        bleed="-10.23% -8.04%"
                      />
                    )}
                  </motion.span>

                  {i < STEPS.length - 1 && (
                    <motion.span
                      className="my-[3px] w-px flex-1 origin-top bg-[#86a2b3]"
                      initial={reduce ? false : { scaleY: 0 }}
                      animate={play ? { scaleY: 1 } : undefined}
                      transition={{
                        duration: LINE_MS,
                        delay: at + MARKER_MS * 0.55,
                        ease: 'easeOut',
                      }}
                    />
                  )}
                </div>

                <motion.div
                  className={`flex flex-col ${i < STEPS.length - 1 ? 'pb-[35px]' : ''} min-[1119px]:w-[247px]`}
                  {...copyReveal(i, play, !!reduce)}
                >
                  <p className="text-[20px] font-semibold leading-[32px] tracking-[-0.5px] text-cute-500">
                    {step.title}
                  </p>
                  <p className="text-[18px] font-normal leading-[24px] tracking-[-0.5px] text-body">
                    {step.sub}
                  </p>
                </motion.div>
              </li>
            )
          })}
        </ol>

        <p className="text-[15px] font-normal leading-[24px] tracking-[-0.5px] text-body min-[1119px]:absolute min-[1119px]:left-[48px] min-[1119px]:top-[395px] min-[1119px]:w-[436px] min-[1119px]:text-[20px] min-[1119px]:leading-[32px]">
          Every report has a clear path from first sighting to resolution. No
          streaks, no badges, no leaderboard, just an honest record of what
          happened, and when.
        </p>
      </div>
    </div>
  )
}
