import { BlurFade } from '@/components/ui/blur-fade'
import VectorIcon from './VectorIcon'
import doodleBand from '@/assets/doodle-band.webp'
import { APP_URL } from '../links'

/**
 * "Stay dry out there." — section six (Figma 2006:18739, 1440×532 at frame
 * y=7832). The first full-bleed band on the page; everything before it sits in
 * the 1071px column.
 *
 * The background is a hand-drawn doodle of ~170 vector paths, exported flattened
 * over the band colour. It ships as one 12 KB image rather than inline SVG —
 * the vector version is 72 KB gzipped for artwork that is barely perceptible.
 * `bg-cover` scales it past 1440px; the lines are faint enough that upscaling
 * costs nothing, and the band colour underneath covers any gap.
 */
export default function StayDrySection() {
  return (
    <section
      className="w-full bg-cute-500 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${doodleBand})` }}
    >
      <div className="mx-auto flex max-w-[1119px] flex-col items-center gap-[56px] px-6 py-[140px]">
        <BlurFade
          inView
          delay={0}
          className="flex w-full flex-col items-center gap-[20px] text-center"
        >
          <h2 className="text-[clamp(32px,4.6vw,56px)] font-semibold leading-[1.0] tracking-[-1px] text-white">
            Stay dry out there.
          </h2>
          <p className="max-w-[675px] text-[clamp(17px,1.8vw,24px)] font-normal leading-[1.3333] tracking-[-0.5px] text-mist">
            Free to use, built with the people who actually walk these streets.
            Available on Android.
          </p>
        </BlurFade>

        <BlurFade inView delay={0.1}>
          {/* Coral here, unlike the white button in the dark section. */}
          <a
            href={APP_URL}
            className="flex h-[56px] items-center justify-center gap-[8px] rounded-[24px] bg-flame px-[32px] py-[12px] text-[16px] font-medium leading-[24px] sm:text-[20px] sm:leading-[32px] text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            <VectorIcon
              src="/assets/icons/smartphone-white.svg"
              size={24}
              inset="8.33% 22.92%"
              bleed="-3.75% -5.77%"
            />
            Give Flood-Watch a try
          </a>
        </BlurFade>
      </div>
    </section>
  )
}
