import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import phoneReport from '@/assets/phone-report.webp'
import phoneMap from '@/assets/phone-map.webp'

/**
 * "Search your street directly." — the wide card in the light section
 * (Figma 1925:5195, 1071×539). Two phone renders rotated ~25° with a floating
 * severity pill tucked between them.
 */

/* Figma puts this shadow on the rotated rectangle itself, so it turns with the
   phone. drop-shadow rather than box-shadow because the renders have rounded,
   transparent corners a box shadow would ignore. */
const PHONE_SHADOW =
  'drop-shadow(36px 15px 39px rgba(0,0,0,0.26)) drop-shadow(9px 4px 21px rgba(0,0,0,0.29))'

/**
 * The pill is a 3-variant set that loops: each state holds for 800ms, then
 * morphs to the next over 1.022s (SMART_ANIMATE, GENTLE).
 *
 * Figma gives each variant its own width (124 / 146 / 122). Deliberately not
 * reproduced: animating the width fought the label cross-fade and read as a
 * jitter. The pill is pinned to the widest variant with its contents centred,
 * so only the dot colour and the label change.
 */
const SEVERITIES = [
  { label: 'High Severity', dot: '#f81100' },
  { label: 'Medium Severity', dot: '#f2a93b' },
  { label: 'Low Severity', dot: '#ffe188' },
] as const

/** Widest variant, and the widest label inside it ("Medium Severity" @ 10px). */
const PILL_WIDTH = 146
const LABEL_WIDTH = 67

const HOLD_MS = 800
const MORPH_MS = 1022

function SeverityPill({ index }: { index: number }) {
  const state = SEVERITIES[index]
  return (
    <div
      className="flex h-[20px] items-center justify-center gap-[4px] rounded-[28px] bg-[rgba(102,102,102,0.2)] py-[2px]"
      style={{ width: PILL_WIDTH }}
    >
      <motion.span
        className="size-[8px] shrink-0 rounded-full border border-white"
        animate={{ backgroundColor: state.dot }}
        initial={false}
        transition={{ duration: MORPH_MS / 1000 }}
      />
      {/* Fixed-width slot so the dot never shifts as labels of different
          lengths cross-fade through it. */}
      <span
        className="relative h-[16px] shrink-0"
        style={{ width: LABEL_WIDTH }}
      >
        <AnimatePresence initial={false}>
          <motion.span
            key={state.label}
            className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[10px] font-normal leading-[16px] tracking-[-0.5px] text-[#4a4958]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            {state.label}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  )
}

export default function SearchCard() {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const [severity, setSeverity] = useState(0)

  /* The pill only exists on screen while hovered, so the loop runs then — no
     permanent background timer. First change fires after the 800ms hold, then
     every hold + morph. */
  useEffect(() => {
    if (!hovered || reduce) {
      setSeverity(0)
      return
    }
    let id: number
    const tick = () => {
      setSeverity((s) => (s + 1) % SEVERITIES.length)
      id = window.setTimeout(tick, HOLD_MS + MORPH_MS)
    }
    id = window.setTimeout(tick, HOLD_MS)
    return () => window.clearTimeout(id)
  }, [hovered, reduce])

  return (
    <div
      className="group relative w-full overflow-clip rounded-[24px] border border-[rgba(216,216,216,0.09)] bg-[#fafafa] min-[1119px]:h-[539px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col gap-5 p-6 min-[1119px]:block min-[1119px]:p-0">
        <p className="text-[26px] font-medium leading-[1.1] tracking-[-0.5px] text-[#4a4958] min-[1119px]:absolute min-[1119px]:left-[48px] min-[1119px]:top-[48px] min-[1119px]:w-[351px] min-[1119px]:text-[40px] min-[1119px]:leading-[42px]">
          Search your street directly.
        </p>

        {/* Below lg the card is a flow column — title, phones, body — so the
            copy can never collide with the artwork. At lg everything returns to
            the frame's absolute coordinates. */}
        <div className="phone-viz">
          <div className="phone-stage">
            <div className="absolute left-[614px] top-[-274px] flex h-[642.453px] w-[498.424px] items-center justify-center">
              <div className="flex-none" style={{ rotate: '-25.06deg' }}>
                <img
                  src={phoneReport}
                  alt="A Floodwatch report for Admiralty Way showing photos, confirmations and time active"
                  width={279.796}
                  height={578.388}
                  className="h-[578.388px] w-[279.796px] max-w-none"
                  style={{ filter: PHONE_SHADOW }}
                />
              </div>
            </div>

            {/* The pill is tucked behind the lower phone at rest. Figma's hover
            variant moves it from (567, 309) to (532, 245) — up and to the left
            — so it slides out from behind the device. SMART_ANIMATE, 1.02s,
            GENTLE spring. Rotation is unchanged, and the phones don't move. */}
            <div className="absolute left-[567px] top-[256px] flex h-[71.186px] w-[120.616px] items-center justify-center transition-transform duration-[1020ms] [transition-timing-function:cubic-bezier(0.34,1.35,0.64,1)] group-hover:[transform:translate(-35px,-64px)]">
              <div className="flex-none" style={{ rotate: '-25.38deg' }}>
                <SeverityPill index={severity} />
              </div>
            </div>

            <div className="absolute left-[483px] top-[193px] flex h-[647.775px] w-[504.795px] items-center justify-center">
              <div className="flex-none" style={{ rotate: '-25.38deg' }}>
                <img
                  src={phoneMap}
                  alt="The Floodwatch map centred on Ajah, Lagos with active report pins"
                  width={282.098}
                  height={583.145}
                  className="h-[583.145px] w-[282.098px] max-w-none"
                  style={{ filter: PHONE_SHADOW }}
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-[15px] font-normal leading-[24px] tracking-[-0.5px] text-body min-[1119px]:absolute min-[1119px]:left-[48px] min-[1119px]:top-[395px] min-[1119px]:w-[436px] min-[1119px]:text-[20px] min-[1119px]:leading-[32px]">
          Type any street or area and jump straight to it, every active report
          there, with photos, right where it happened.
        </p>
      </div>
    </div>
  )
}
