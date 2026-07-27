import VectorIcon from '../VectorIcon'
import eyes from '@/assets/eyes.webp'
import { APP_URL } from '../../links'

/**
 * "See it. Report it." — the closing CTA (Figma 2006:18604).
 *
 * The three tiles use elliptical radial gradients that Figma emits as inline
 * SVG data URIs; they are reproduced verbatim rather than approximated with
 * CSS radial-gradient, which cannot express the same gradient transform.
 */
const tileGradient = (size: number, matrix: string) =>
  `url("data:image/svg+xml;utf8,<svg viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(${matrix})'><stop stop-color='rgba(3,14,21,1)' offset='0'/><stop stop-color='rgba(7,34,51,1)' offset='0.22'/><stop stop-color='rgba(11,52,77,1)' offset='0.34'/><stop stop-color='rgba(14,69,103,1)' offset='0.46'/><stop stop-color='rgba(14,69,103,1)' offset='1'/></radialGradient></defs></svg>")`

const SIDE_TILE = tileGradient(129, '1.3 -39.55 39.55 1.3 70.5 152')
const CENTRE_TILE = tileGradient(156, '1.5721 -47.828 47.828 1.5721 85.256 183.81')

const CENTRE_SHADOW = [
  '-70px 0px 20px 0px rgba(0,0,0,0.01)',
  '-45px 0px 18px 0px rgba(0,0,0,0.05)',
  '-25px 0px 15px 0px rgba(0,0,0,0.18)',
  '-11px 0px 11px 0px rgba(0,0,0,0.3)',
  '-3px 0px 6px 0px rgba(0,0,0,0.34)',
].join(', ')

const CAMERA_SHADOW = [
  '67px 15px 19px 0px rgba(0,0,0,0.01)',
  '43px 9px 18px 0px rgba(0,0,0,0.05)',
  '24px 5px 15px 0px rgba(0,0,0,0.18)',
  '11px 2px 11px 0px rgba(0,0,0,0.3)',
  '3px 1px 6px 0px rgba(0,0,0,0.34)',
].join(', ')

export default function ReportCta() {
  return (
    <div className="flex w-full flex-col items-center gap-[32px]">
      {/* Frame 1912:22706 is 446px tall with its content starting at y=86. */}
      <div className="flex w-full flex-col items-center gap-[32px] pt-[86px]">
        {/* Icon tile cluster — 401×156, three overlapping rounded squares. */}
        <div className="group/tiles relative h-[156px] w-[401px] origin-top scale-[var(--panel-scale)]">
          {/* Figma parks these eyes at y=94, hidden behind the camera tile, and
              slides them to y=0 on hover (SMART_ANIMATE, 1.02s, GENTLE spring).
              Rendered first so the opaque tiles paint over them at rest; the
              94px rise is what makes them peek out. Transform rather than `top`
              so it stays on the compositor. */}
          <img
            src={eyes}
            alt=""
            aria-hidden
            width={152}
            height={72}
            className="absolute left-1/2 top-[8px] z-0 h-[72px] w-[152px] max-w-none [transform:translateX(-50%)] transition-transform duration-[1020ms] [transition-timing-function:cubic-bezier(0.34,1.35,0.64,1)] group-hover/tiles:[transform:translate(-50%,-94px)]"
          />
          <div
            className="absolute left-0 top-[27px] size-[129px] overflow-clip rounded-[32px]"
            style={{ backgroundImage: SIDE_TILE }}
          >
            <span className="absolute left-1/2 top-1/2 size-[56.5px] -translate-x-1/2 -translate-y-1/2 overflow-clip">
              <VectorIcon
                src="/assets/icons/menu-03.svg"
                size={56.5}
                inset="20.83% 16.67%"
                bleed="-6.43% -5.62% -6.43% -5.63%"
              />
            </span>
          </div>

          {/* Mirrored slab that casts the centre tile's left-hand shadow. */}
          <div className="absolute left-[124px] top-0 flex size-[156px] items-center justify-center">
            <div
              className="size-[156px] flex-none rounded-[32px]"
              style={{
                transform: 'rotate(180deg) scaleY(-1)',
                boxShadow: CENTRE_SHADOW,
                backgroundImage:
                  'linear-gradient(0deg, rgb(3,14,21) 0%, rgb(7,34,51) 22%, rgb(14,69,103) 46%, rgb(14,69,103) 100%)',
              }}
            />
          </div>

          <div
            className="absolute left-[272px] top-[27px] size-[129px] overflow-clip rounded-[32px]"
            style={{ backgroundImage: SIDE_TILE }}
          >
            <span className="absolute left-1/2 top-1/2 size-[56.5px] -translate-x-1/2 -translate-y-1/2">
              <VectorIcon
                src="/assets/icons/maps.svg"
                size={56.5}
                inset="12.5% 8.33%"
                bleed="-5% -4.5%"
              />
            </span>
          </div>

          <div
            className="absolute left-[124px] top-0 size-[156px] overflow-clip rounded-[32px]"
            style={{ backgroundImage: CENTRE_TILE, boxShadow: CAMERA_SHADOW }}
          >
            <span className="absolute left-1/2 top-1/2 size-[101px] -translate-x-1/2 -translate-y-1/2 overflow-clip">
              <VectorIcon
                src="/assets/icons/camera-01.svg"
                size={101}
                inset="14.58% 8.33%"
                bleed="-4.41% -3.75%"
              />
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-[20px] text-center">
          <h2 className="text-[clamp(32px,4.6vw,56px)] font-semibold leading-[1.0] tracking-[-1px] text-white">
            See it. Report it.
          </h2>
          <p className="w-[779px] max-w-full text-[clamp(17px,1.8vw,24px)] font-normal leading-[1.34] tracking-[-0.5px] text-mist">
            No long forms, no manual pins. Just a username and your phone number,
            and Flood-Watch finds your street automatically. You&apos;ll be
            looking at real reports near you before you&apos;re even done typing.
          </p>
        </div>
      </div>

      <a
        href={APP_URL}
        className="flex h-[56px] items-center justify-center gap-[8px] rounded-[24px] bg-white px-[32px] py-[12px] text-[16px] font-medium leading-[24px] sm:text-[20px] sm:leading-[32px] text-ink transition-transform duration-200 hover:-translate-y-0.5"
      >
        <VectorIcon
          src="/assets/icons/smartphone.svg"
          size={24}
          inset="8.33% 22.92%"
          bleed="-3.75% -5.77%"
        />
        Give Flood-Watch a try
      </a>
    </div>
  )
}
