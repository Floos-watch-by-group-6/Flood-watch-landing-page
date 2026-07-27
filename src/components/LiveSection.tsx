import { BlurFade } from '@/components/ui/blur-fade'
import SearchCard from './live/SearchCard'
import { MapCard, ReportsCard } from './live/PairCards'

/**
 * "See every active report across Lagos, right now." — the light section
 * (Figma 2006:18607, 1071×1451 starting at frame y=4393). Same 1071px column
 * as the rest of the page, on white.
 */
export default function LiveSection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1119px] px-6 pb-[140px] pt-[80px] lg:pt-[140px]">
        <BlurFade inView delay={0} className="flex flex-col gap-[20px]">
          <h2 className="max-w-[765px] text-[clamp(32px,4.6vw,56px)] font-semibold leading-[1.0] tracking-[-1px] text-ink">
            See every active report across Lagos, right now.
          </h2>
          <p className="max-w-[747px] text-[clamp(17px,1.8vw,24px)] font-normal leading-[1.3333] tracking-[-0.5px] text-body">
            Every pin updates as neighbors confirm or clear it, no refreshing, no
            wondering which report is still current.
          </p>
        </BlurFade>

        <div className="mt-[56px]">
          <BlurFade inView delay={0.1}>
            <SearchCard />
          </BlurFade>
        </div>

        <div className="mt-[24px] grid gap-[24px] min-[1119px]:grid-cols-2">
          <BlurFade inView delay={0}>
            <MapCard />
          </BlurFade>
          <BlurFade inView delay={0.1}>
            <ReportsCard />
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
