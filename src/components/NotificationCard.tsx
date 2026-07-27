import VectorIcon from './VectorIcon'
import { CARD_COPY, type CardKind } from './cardCopy'

/* Four stacked shadow layers, straight from the Figma effect stack. The lead
   layer is transparent on the foreground cards and 8% on the faded ones. */
const shadowLayers = (lead: number) =>
  [
    `0px 19.992px 5.598px 0px rgba(0,0,0,${lead})`,
    '0px 12.795px 4.798px 0px rgba(0,0,0,0.01)',
    '0px 3.199px 3.199px 0px rgba(0,0,0,0.04)',
    '0px 0.8px 1.599px 0px rgba(0,0,0,0.05)',
  ].join(', ')

type NotificationCardProps = {
  kind: CardKind
  /** Faded background cards carry the heavier lead shadow layer. */
  strongShadow?: boolean
  /** Verified cards in the design show a trailing chevron. */
  chevron?: boolean
}

export default function NotificationCard({
  kind,
  strongShadow = false,
  chevron = false,
}: NotificationCardProps) {
  const { tone, title, subtitle } = CARD_COPY[kind]

  return (
    <div
      className={`flex w-[295.874px] items-center overflow-clip rounded-[16.058px] bg-white p-[9.596px] ${
        chevron ? 'justify-between' : 'justify-center'
      }`}
      style={{ boxShadow: shadowLayers(strongShadow ? 0.08 : 0) }}
    >
      <div className="flex w-[242.297px] shrink-0 items-center gap-[9.596px]">
        {tone === 'alert' ? (
          <span className="relative size-[25.589px] shrink-0 overflow-clip rounded-full bg-[rgba(248,17,0,0.09)]">
            <span className="absolute left-1/2 top-1/2 size-[12.795px] -translate-x-1/2 -translate-y-1/2">
              <VectorIcon
                src="/assets/icons/alert-02.svg"
                size={12.795}
                inset="12.5% 8.33%"
                bleed="-4.44% -4%"
                transform="rotate(180deg) scaleX(-1)"
              />
            </span>
          </span>
        ) : (
          <span className="relative size-[32px] shrink-0 overflow-clip rounded-full bg-mint">
            <span className="absolute left-1/2 top-1/2 size-[16px] -translate-x-1/2 -translate-y-1/2">
              <VectorIcon
                src="/assets/icons/tick-02.svg"
                size={16}
                inset="27.08% 20.83%"
                bleed="-10.23% -8.04%"
              />
            </span>
          </span>
        )}

        <div className="flex min-w-px flex-1 flex-col items-start gap-[4.798px]">
          {/* `pre` rather than `nowrap`: the location card's title carries a
              double space that HTML would otherwise collapse. */}
          <p className="whitespace-pre text-[13.714px] font-medium leading-[15.993px] tracking-[-0.3998px] text-ink">
            {title}
          </p>
          <p className="w-[168.728px] text-[9.596px] font-normal leading-[12.795px] text-muted">
            {subtitle}
          </p>
        </div>
      </div>

      {chevron && (
        <VectorIcon
          src="/assets/icons/chevron.svg"
          size={12.795}
          inset="25% 37.5%"
          bleed="-6.25% -12.5%"
        />
      )}
    </div>
  )
}
