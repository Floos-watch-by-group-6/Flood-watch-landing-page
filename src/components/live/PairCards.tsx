import mapComposite from '@/assets/map-composite.webp'

/**
 * The two-up row closing the light section (Figma 2006:18623 / 1929:21973).
 * Both cards are 523.5×636 on #fafafa.
 *
 * The frame's absolute layout only applies from 1119px up, which is where the
 * page container reaches full width and each card is exactly 523.5px. Below
 * that the cards reflow into a single column: the artwork stays fluid and the
 * report rows keep their real type size rather than being scaled into
 * illegibility.
 *
 * Note: the frame gives both cards the same heading and body copy as the pair
 * in the dark section — almost certainly placeholder text that wasn't updated.
 */

const CARD =
  'relative w-full overflow-clip rounded-[24px] border border-[rgba(234,234,234,0.17)] bg-[#fafafa] min-[1119px]:h-[636px]'

/* Tailwind v4's transition-transform covers the standalone rotate property, so
   the `rotate-*` utilities animate without falling back to `transition: all`. */
const TILT =
  'origin-center transition-transform duration-[1020ms] [transition-timing-function:cubic-bezier(0.34,1.35,0.64,1)]'

function CardCopy() {
  return (
    <div className="flex w-full flex-col min-[1119px]:absolute min-[1119px]:left-[47px] min-[1119px]:top-[47px] min-[1119px]:w-[436px]">
      <h3 className="text-[18px] font-bold leading-[28px] tracking-[-0.5px] text-[#4a4958] min-[1119px]:text-[20px] min-[1119px]:leading-[32px]">
        Straight from your neighbours.
      </h3>
      <p className="text-[16px] font-normal leading-[26px] tracking-[-0.5px] text-body min-[1119px]:text-[20px] min-[1119px]:leading-[32px]">
        3 confirmations make a report Verified, not an algorithm. No new confirms
        in 2 hours, and it quietly moves to Likely Resolved.
      </p>
    </div>
  )
}

/** Left card: the Lagos map with its pins, exported as one composite. */
export function MapCard() {
  return (
    <article className={CARD}>
      <div className="flex flex-col gap-5 p-6 min-[1119px]:block min-[1119px]:p-0">
        <CardCopy />

        {/* The map is a single image, so it just goes fluid below the frame
            breakpoint. The location dot is placed as a percentage of the map
            rather than in frame pixels, so it tracks at any width. */}
        <div className="relative mx-auto w-full max-w-[347.643px] min-[1119px]:absolute min-[1119px]:left-[88.36px] min-[1119px]:top-[246px] min-[1119px]:mx-0 min-[1119px]:w-[347.643px] min-[1119px]:max-w-none">
          <img
            src={mapComposite}
            alt="A map of Lagos with active flood report pins at St. Paul The Apostle Catholic Church, Third Mainland Bridge and Chevron Drive"
            width={347.643}
            height={390}
            className="block w-full"
          />
          <span
            className="absolute aspect-square w-[9.2%] overflow-clip rounded-full bg-[rgba(47,111,235,0.22)]"
            style={{ left: '40.45%', top: '62.82%' }}
          >
            <span className="absolute left-1/2 top-1/2 size-[37.5%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-[#2f6feb]" />
          </span>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */

const ROW_SHADOW = [
  '0px 25px 7px 0px rgba(0,0,0,0)',
  '0px 16px 6px 0px rgba(0,0,0,0.01)',
  '0px 9px 5px 0px rgba(0,0,0,0.03)',
  '0px 4px 4px 0px rgba(0,0,0,0.04)',
  '0px 1px 2px 0px rgba(0,0,0,0.05)',
].join(', ')

type ReportProps = {
  severity: string
  severityWidth: number
  time: string
  body: string
}

function ReportRow({ severity, severityWidth, time, body }: ReportProps) {
  return (
    <div
      className="flex w-full max-w-[355px] items-center justify-center overflow-clip rounded-[24px] bg-[rgba(255,255,255,0.1)] px-[24px] py-[16px] min-[1119px]:w-[355px]"
      style={{ boxShadow: ROW_SHADOW }}
    >
      <div className="flex w-full shrink-0 items-center gap-[12px] min-[1119px]:w-[303px]">
        <div className="flex min-w-px flex-1 flex-col items-start gap-[16px]">
          <div className="flex w-full flex-col items-start gap-[6px]">
            <div className="flex w-full items-center gap-[4px]">
              <span
                className="flex shrink-0 items-center"
                style={{ width: severityWidth }}
              >
                <p className="whitespace-nowrap text-[14px] font-medium leading-[20px] tracking-[-0.5px] text-[#4a4958]">
                  {severity}
                </p>
              </span>
              <span className="size-[4px] shrink-0 rounded-full bg-mist" />
              <p className="whitespace-nowrap text-[10px] font-medium leading-[16px] tracking-[-0.5px] text-muted">
                {time}
              </p>
            </div>
            <p className="w-full text-[12px] font-normal leading-[16px] tracking-[-0.5px] text-body min-[1119px]:w-[303px]">
              {body}
            </p>
          </div>
          <div className="flex w-full items-center">
            <span className="flex h-[20px] w-[60px] items-center justify-center gap-[4px] rounded-[14px] bg-[#ade3d7] text-center text-[10px] font-normal leading-[16px] tracking-[-0.5px] text-[#3d8575]">
              Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Right card: two stacked report cards, the lower one tilted. */
export function ReportsCard() {
  return (
    <article className={`${CARD} group/reports`}>
      <div className="flex flex-col gap-6 p-6 min-[1119px]:block min-[1119px]:p-0">
        <CardCopy />

        {/* Hover (Figma 1929:21975, SMART_ANIMATE 1.02s GENTLE) is a pure
            rotation — both cards' centres stay put, only their tilt changes.
            Figma measures counter-clockwise-positive, so its -6.966 / +8.145
            become +6.97 / -8.15 in CSS. */}
        <div className="mx-auto w-full max-w-[355px] min-[1119px]:absolute min-[1119px]:left-[23px] min-[1119px]:top-[241px] min-[1119px]:mx-0 min-[1119px]:w-auto min-[1119px]:max-w-none">
          <div className={`${TILT} group-hover/reports:rotate-[6.966deg]`}>
            <ReportRow
              severity="Medium severity"
              severityWidth={96}
              time="22 min ago"
              body="Reported 21 minutes ago. 2 confirmations so far, 1 more to become Verified."
            />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[355px] justify-center min-[1119px]:absolute min-[1119px]:left-[140px] min-[1119px]:top-[375px] min-[1119px]:mx-0 min-[1119px]:h-[163.105px] min-[1119px]:w-[366.404px] min-[1119px]:max-w-none min-[1119px]:items-center">
          <div
            className={`w-full flex-none rotate-[-6.116deg] ${TILT} group-hover/reports:rotate-[-8.145deg] min-[1119px]:w-auto`}
          >
            <ReportRow
              severity="High severity"
              severityWidth={75.495}
              time="6 min ago"
              body="Reported 6 minutes ago. 3 neighbors have already confirmed it, this one's Verified"
            />
          </div>
        </div>
      </div>
    </article>
  )
}
