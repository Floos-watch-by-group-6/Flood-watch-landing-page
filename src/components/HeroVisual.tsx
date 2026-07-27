import { motion, useReducedMotion } from 'motion/react'
import NotificationCard from './NotificationCard'
import FeedbackCard from './FeedbackCard'
import type { CardKind } from './cardCopy'
// Imported rather than referenced from /public so Vite content-hashes the URL.
// This asset had to be re-cut once already (Figma's export baked in an opaque
// white background that blanked the cards behind it); hashing means a replaced
// file can never be masked by a stale browser cache.
import heroPhone from '../assets/hero-phone.png'

/**
 * The hero composition is a fixed 1440×632 stage. Coordinates below are the
 * Figma frame's, rebased so the stage origin sits at the phone's top edge
 * (frame y=453); the card cluster lives at frame (330, 481), hence the +330/+28
 * already folded into each `x`/`y`.
 *
 * Cards Figma rotates are wrapped in a bounding box of the rotated size and
 * centred, mirroring how Figma lays them out — so `w`/`h` appear only there.
 */
type Placement = {
  id: string
  kind: CardKind
  x: number
  y: number
  opacity: number
  chevron?: boolean
  strongShadow?: boolean
  rotate?: number
  w?: number
  h?: number
}

const CARDS: Placement[] = [
  { id: 'flooding-lead', kind: 'flooding', x: 334.96, y: 8.99, opacity: 1, rotate: -7.6, w: 301.954, h: 104.017 },
  { id: 'verified-lead', kind: 'verified', x: 330, y: 181, opacity: 1 },
  { id: 'location', kind: 'location', x: 813.09, y: 79.26, opacity: 1, rotate: 5.8, w: 299.704, h: 82.48 },
  { id: 'posted', kind: 'posted', x: 829.21, y: 224.42, opacity: 1, rotate: -6.6, w: 301.452, h: 99.146 },
  // Faded background layer
  { id: 'ghost-a', kind: 'verified', x: 390, y: 111, opacity: 0.17, chevron: true, strongShadow: true },
  { id: 'ghost-b', kind: 'verified', x: 440, y: 251, opacity: 0.17, chevron: true, strongShadow: true },
  { id: 'ghost-c', kind: 'flooding', x: 745, y: 28, opacity: 0.17, strongShadow: true },
  { id: 'ghost-d', kind: 'verified', x: 728, y: 167, opacity: 0.17, chevron: true, strongShadow: true },
  { id: 'ghost-e', kind: 'flooding', x: 763, y: 325, opacity: 0.17, strongShadow: true },
]

const EASE = [0.16, 1, 0.3, 1] as const

export default function HeroVisual() {
  const reduce = useReducedMotion()

  /** Cards drift on their own slow loop so the cluster never feels frozen. */
  const float = (i: number) =>
    reduce
      ? undefined
      : {
          y: [0, i % 2 === 0 ? -7 : -4, 0],
          transition: {
            duration: 5.5 + (i % 4) * 0.9,
            repeat: Infinity,
            ease: 'easeInOut' as const,
            delay: i * 0.35,
          },
        }

  return (
    /* Centred with left-1/2 plus a half-width negative margin rather than
       mx-auto: once the 1440px stage is wider than the viewport the auto
       margins collapse to zero and the scaled stage lands off-screen. */
    <div
      className="absolute left-1/2 top-0 -ml-[720px]"
      style={{
        width: 1440,
        height: 632,
        transform: 'scale(var(--stage-scale))',
        transformOrigin: 'top center',
      }}
    >
      {CARDS.map((card, i) => (
        <motion.div
          key={card.id}
          className="absolute"
          style={{
            left: card.x,
            top: card.y,
            width: card.w,
            height: card.h,
          }}
          initial={reduce ? false : { opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: card.opacity, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.5 + i * 0.07, ease: EASE }}
        >
          <motion.div
            className={card.rotate ? 'flex size-full items-center justify-center' : undefined}
            animate={float(i)}
          >
            <div className="flex-none" style={{ rotate: `${card.rotate ?? 0}deg` }}>
              <NotificationCard
                kind={card.kind}
                chevron={card.chevron}
                strongShadow={card.strongShadow}
              />
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* "Has Admiralty Way cleared?" — its own component, own rotation. */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{ left: 334.52, top: 308.83, width: 318.957, height: 96.349 }}
        initial={reduce ? false : { opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: 1.15, ease: EASE }}
      >
        <motion.div animate={float(2)}>
          <div className="flex-none" style={{ rotate: '5.98deg' }}>
            <FeedbackCard />
          </div>
        </motion.div>
      </motion.div>

      {/* Frame 2147229135: a plain white rectangle with an 83.7px layer blur,
          sitting at frame y=921 (stage-relative 468). Its feathered top edge is
          what dissolves the hand into the page. Widened past the stage so the
          blurred left/right edges fall outside the viewport. */}
      <div
        aria-hidden
        className="absolute z-20 bg-white"
        style={{
          left: -200,
          top: 468,
          width: 1840,
          height: 588,
          filter: 'blur(83.7px)',
        }}
      />

      {/* Phone sits above the cluster, exactly as layered in Figma. */}
      <motion.img
        src={heroPhone}
        alt="The Floodwatch app showing live flood reports on a map of Ajah, Lagos"
        width={510}
        height={632}
        className="absolute z-10 select-none"
        style={{ left: 465, top: 0, width: 510, height: 632 }}
        initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
      />
    </div>
  )
}
