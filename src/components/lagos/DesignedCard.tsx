import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import VectorIcon from '../VectorIcon'
import { markerReveal, copyReveal } from '../stepReveal'
import lagosMap from '@/assets/lagos-map-faint.webp'

/**
 * "Designed around how the city actually moves." — the wide card in section
 * five (Figma 2006:18712, 1071×539): copy on the left over a faint rotated map,
 * four checked points on the right.
 *
 * The points reveal one after another when the card scrolls into view, using
 * the same choreography as section four's timeline.
 *
 * The frame staggers the points by indenting alternate rows 98px. Those offsets
 * are written as literal class strings so Tailwind's scanner can find them —
 * a runtime-built class name would never be generated.
 */
const POINTS = [
  {
    text: 'Android-first, for budget and mid-range devices',
    pos: 'min-[1119px]:left-0 min-[1119px]:top-0',
  },
  {
    text: 'Works on weak 2G/3G signal, not just Wi-Fi',
    pos: 'min-[1119px]:left-[98px] min-[1119px]:top-[80px]',
  },
  {
    text: 'Anonymous by default, so more people feel safe reporting',
    pos: 'min-[1119px]:left-0 min-[1119px]:top-[160px]',
  },
  {
    text: 'Live-camera-only photos, to keep reports genuine',
    pos: 'min-[1119px]:left-[98px] min-[1119px]:top-[240px]',
  },
]

export default function DesignedCard() {
  const reduce = useReducedMotion()
  const listRef = useRef<HTMLUListElement>(null)
  const inView = useInView(listRef, { once: true, margin: '-80px' })
  // useReducedMotion returns boolean | null, so coerce before it leaves here
  const play = inView || !!reduce

  return (
    <div className="relative w-full overflow-clip rounded-[24px] border border-[rgba(216,216,216,0.09)] bg-[#fafafa] min-[1119px]:h-[539px]">
      {/* Exported already rotated, faded to 10% and clipped to the card, over
          the same #fafafa the card uses — so it composites seamlessly. */}
      <img
        src={lagosMap}
        alt=""
        aria-hidden
        width={407}
        height={472}
        className="pointer-events-none absolute left-0 top-[67px] h-[472px] w-[407px] max-w-none"
      />

      <div className="relative flex flex-col gap-6 p-6 min-[1119px]:block min-[1119px]:p-0">
        <p className="text-[26px] font-medium leading-[1.1] tracking-[-0.5px] text-[#4a4958] min-[1119px]:absolute min-[1119px]:left-[48px] min-[1119px]:top-[48px] min-[1119px]:w-[436px] min-[1119px]:text-[40px] min-[1119px]:leading-[42px]">
          Designed around how the city actually moves.
        </p>

        <ul
          ref={listRef}
          className="flex flex-col gap-5 min-[1119px]:absolute min-[1119px]:left-[625px] min-[1119px]:top-[126px] min-[1119px]:block min-[1119px]:h-[288px] min-[1119px]:w-[397px]"
        >
          {POINTS.map((point, i) => (
            <li
              key={point.text}
              className={`flex items-center gap-[20px] min-[1119px]:absolute ${point.pos}`}
            >
              <motion.span
                className="relative flex size-[32px] shrink-0 items-center justify-center rounded-full bg-cute-500"
                {...markerReveal(i, play, !!reduce)}
              >
                <VectorIcon
                  src="/assets/icons/tick-white.svg"
                  size={16}
                  inset="27.08% 20.83%"
                  bleed="-10.23% -8.04%"
                />
              </motion.span>
              <motion.p
                className="text-[18px] font-normal leading-[24px] tracking-[-0.5px] text-body min-[1119px]:w-[247px]"
                {...copyReveal(i, play, !!reduce)}
              >
                {point.text}
              </motion.p>
            </li>
          ))}
        </ul>

        <p className="text-[15px] font-normal leading-[24px] tracking-[-0.5px] text-body min-[1119px]:absolute min-[1119px]:left-[48px] min-[1119px]:top-[395px] min-[1119px]:w-[436px] min-[1119px]:text-[20px] min-[1119px]:leading-[32px]">
          FloodWatch is built for the phones people actually carry and the signal
          they actually get, not a best-case scenario.
        </p>
      </div>
    </div>
  )
}
