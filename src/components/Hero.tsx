import { motion } from 'motion/react'
import { BlurFade } from '@/components/ui/blur-fade'
import HeroVisual from './HeroVisual'

const AVATARS = [
  { src: '/assets/avatar-obiorah.png', name: 'Obiorah' },
  { src: '/assets/avatar-amaka.png', name: 'Amaka' },
  { src: '/assets/avatar-douglas.png', name: 'Douglas' },
  { src: '/assets/avatar-chinwe.png', name: 'Chinwe' },
]

const EASE = [0.16, 1, 0.3, 1] as const

/** Plain rise used by the supporting copy; the headline gets BlurFade instead. */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
})

export default function Hero() {
  return (
    /* pb closes the white gap the frame keeps between the phone (ends y=1085)
       and the dark section (starts y=1206). */
    <section id="hero" className="relative overflow-hidden pb-[121px]">
      <div className="mx-auto mt-[56px] flex max-w-[827px] flex-col items-center gap-[12px] px-6 text-center">
        <motion.div className="flex items-start gap-[6px]" {...rise(0.05)}>
          <p className="whitespace-nowrap text-[14px] font-normal leading-[20px] tracking-[-0.5px] text-muted">
            Join over 100k users in their flood journey
          </p>
          <div className="flex items-center">
            {AVATARS.map(({ src, name }, i) => (
              <img
                key={name}
                src={src}
                alt=""
                width={24}
                height={24}
                className={`size-[24px] rounded-full border border-divider object-cover ${
                  i < AVATARS.length - 1 ? '-mr-[12px]' : ''
                }`}
              />
            ))}
          </div>
        </motion.div>

        <div className="flex w-full flex-col items-center gap-[20px]">
          {/* The headline is the one element carrying the blur-fade. No `inView`
              prop, so it plays on mount — every landing and refresh.

              In Figma the watery image paint fills the entire text node, and
              only the "street." glyphs use it. So the background lives on the
              h1 (827×112) and is clipped to text; the opening line paints its
              own solid colour over it, leaving just "street." transparent. */}
          <BlurFade delay={0.12} className="w-full">
            <h1 className="w-full bg-[url('/assets/street-gradient.png')] bg-cover bg-center bg-clip-text text-[clamp(34px,4.6vw,56px)] font-semibold leading-[1.0] tracking-[-1px]">
              <span className="text-ink">Before you step out, check your </span>
              <span className="text-transparent">street.</span>
            </h1>
          </BlurFade>

          <motion.p
            className="w-[565px] max-w-full text-[16px] font-normal leading-[24px] tracking-[-0.5px] text-body"
            {...rise(0.19)}
          >
            Real-time flood reports from people in your neighborhood, verified by
            nearby residents, faster than the news. No predictions, no guesswork,
            just what&apos;s actually happening on the ground right now."
          </motion.p>
        </div>
      </div>

      {/* Wrapper height tracks the scaled stage so the next section clears it. */}
      <div
        className="relative mt-[56px]"
        style={{ height: 'calc(632px * var(--stage-scale))' }}
      >
        <HeroVisual />
      </div>
    </section>
  )
}
