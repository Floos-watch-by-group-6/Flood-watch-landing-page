import { BlurFade } from '@/components/ui/blur-fade'
import FeedCard from './feature/FeedCard'
import { NeighboursCard, AlertsCard } from './feature/StoryCards'
import { CameraCard, HandleCard } from './feature/HandleCards'
import ReportCta from './feature/ReportCta'

/**
 * "From a report to a Verified pin." — the dark section (Figma 2006:18492,
 * 1440×3047 starting at frame y=1206). Content sits in the same 1071px column
 * the rest of the page uses.
 */
export default function FeatureSection() {
  return (
    <section className="w-full bg-night">
      <div className="mx-auto max-w-[1119px] px-6 pb-[140px] pt-[80px] lg:pt-[140px]">
        <BlurFade inView delay={0} className="flex flex-col gap-[20px]">
          <h2 className="text-[clamp(32px,4.6vw,56px)] font-semibold leading-[1.0] tracking-[-1px] text-white">
            From a report to a Verified pin.
          </h2>
          <p className="max-w-[747px] text-[clamp(17px,1.8vw,24px)] font-normal leading-[1.3333] tracking-[-0.5px] text-mist">
            Browse the feed, add a report in seconds, confirm what your
            neighbours are seeing, and get notified the moment it matters.
          </p>
        </BlurFade>

        <div className="mt-[56px]">
          <BlurFade inView delay={0.1}>
            <FeedCard />
          </BlurFade>
        </div>

        {/* Paired cards. The frame uses a 24px gutter here. */}
        <div className="mt-[24px] grid gap-[24px] lg:grid-cols-2">
          <BlurFade inView delay={0}>
            <NeighboursCard />
          </BlurFade>
          <BlurFade inView delay={0.1}>
            <AlertsCard />
          </BlurFade>
        </div>

        <div className="mt-[24px] grid gap-[24px] lg:grid-cols-2">
          <BlurFade inView delay={0}>
            <CameraCard />
          </BlurFade>
          <BlurFade inView delay={0.1}>
            <HandleCard />
          </BlurFade>
        </div>

        {/* The frame leaves a large 178px gap before the closing CTA. */}
        <div className="mt-[178px]">
          <BlurFade inView delay={0}>
            <ReportCta />
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
