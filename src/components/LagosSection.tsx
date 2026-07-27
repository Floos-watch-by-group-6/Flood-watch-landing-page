import { BlurFade } from '@/components/ui/blur-fade'
import DesignedCard from './lagos/DesignedCard'

/**
 * "Why we're building FloodWatch for Lagos." — section five (Figma 2006:18698,
 * 1071×791 starting at frame y=6859).
 *
 * The only centred heading on the page; every other section heading is left
 * aligned. "for Lagos." carries the same watery image fill as the hero's
 * "street." — byte-identical asset, so it is reused rather than duplicated.
 */
export default function LagosSection() {
  return (
    <section className="w-full bg-white">
      {/* No top padding — like section four, this frame node starts at its own
          heading and the gap above comes from the previous section. The 182px
          below is the frame's own gap to the next section, not the usual 140. */}
      <div className="mx-auto max-w-[1119px] px-6 pb-[182px]">
        <BlurFade
          inView
          delay={0}
          className="flex flex-col items-center gap-[20px] text-center"
        >
          <h2 className="w-full max-w-[795px] bg-[url('/assets/street-gradient.png')] bg-cover bg-center bg-clip-text text-[clamp(32px,4.6vw,56px)] font-semibold leading-[1.0] tracking-[-1px]">
            <span className="text-ink">Why we&apos;re building FloodWatch</span>
            <span className="text-transparent"> for Lagos.</span>
          </h2>
          <p className="max-w-[1031px] text-[clamp(17px,1.8vw,24px)] font-normal leading-[1.3333] tracking-[-0.5px] text-body">
            Flooding on Lagos roads can go from dry to impassable in minutes, and
            most residents only hear about it from the traffic already stuck in
            it, or from social media, well after the fact.
          </p>
        </BlurFade>

        <div className="mt-[56px]">
          <BlurFade inView delay={0.1}>
            <DesignedCard />
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
