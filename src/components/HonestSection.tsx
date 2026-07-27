import { BlurFade } from '@/components/ui/blur-fade'
import TimelineCard from './honest/TimelineCard'

/**
 * "Every report gets an honest ending." — section four (Figma 2006:18650,
 * 1071×735 starting at frame y=5984). Heading plus a single wide card.
 */
export default function HonestSection() {
  return (
    <section className="w-full bg-white">
      {/* No top padding: unlike the earlier sections, this frame node starts at
          its own heading (y=5984), and the 140px gap above is already supplied
          by the previous section's bottom padding. */}
      <div className="mx-auto max-w-[1119px] px-6 pb-[140px]">
        <BlurFade inView delay={0} className="flex flex-col gap-[20px]">
          <h2 className="max-w-[919px] text-[clamp(32px,4.6vw,56px)] font-semibold leading-[1.0] tracking-[-1px] text-ink">
            Every report gets an honest ending.
          </h2>
          <p className="max-w-[919px] text-[clamp(17px,1.8vw,24px)] font-normal leading-[1.3333] tracking-[-0.5px] text-body">
            Watch a report move from first sighting to Verified to Likely
            Resolved, never left hanging, never silently forgotten.
          </p>
        </BlurFade>

        <div className="mt-[56px]">
          <BlurFade inView delay={0.1}>
            <TimelineCard />
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
