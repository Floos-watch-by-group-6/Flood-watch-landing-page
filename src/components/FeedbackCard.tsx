import VectorIcon from './VectorIcon'

/* Figma uses a drop-shadow filter here rather than box-shadow so the shadow
   also wraps the close badge that overhangs the card's top-right corner. */
const DROP_SHADOW = [
  'drop-shadow(0px 25px 3.5px rgba(28,28,28,0))',
  'drop-shadow(0px 16px 3px rgba(28,28,28,0.01))',
  'drop-shadow(0px 9px 2.5px rgba(28,28,28,0.05))',
  'drop-shadow(0px 4px 2px rgba(28,28,28,0.09))',
  'drop-shadow(0px 1px 1px rgba(28,28,28,0.1))',
].join(' ')

/** "Has Admiralty Way cleared?" — the resolve-prompt card in the hero cluster. */
export default function FeedbackCard() {
  return (
    <div
      className="relative h-[64px] w-[314px] rounded-[24px] bg-white"
      style={{ filter: DROP_SHADOW }}
    >
      <div className="absolute left-[24px] right-[24px] top-[14px] flex h-[36px] items-center justify-between">
        <div className="flex min-w-px flex-1 items-center gap-[8px]">
          <VectorIcon
            src="/assets/icons/timer-02.svg"
            size={20}
            inset="8.33% 12.5%"
            bleed="-4.5% -5%"
          />
          <div className="flex flex-col items-start justify-center gap-[4px] tracking-[-0.5px]">
            <p className="whitespace-nowrap text-[12px] font-medium leading-[16px] text-cute-500">
              Has Admiralty Way cleared ?
            </p>
            <p className="whitespace-pre-wrap text-[10px] font-normal leading-[16px] text-cute-400">
              {`You're nearby  ·  resolves in 26m`}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-[6px]">
          <span className="relative size-[32px] shrink-0 overflow-clip rounded-[9.6px] bg-[rgba(248,17,0,0.1)]">
            <span className="absolute left-1/2 top-1/2 size-[16px] -translate-x-1/2 -translate-y-1/2">
              <VectorIcon
                src="/assets/icons/cancel-red.svg"
                size={16}
                inset="25%"
                bleed="-6.25%"
              />
            </span>
          </span>
          <span className="relative size-[32px] shrink-0 overflow-clip rounded-[9.6px] bg-[rgba(76,167,147,0.1)]">
            <span className="absolute left-1/2 top-1/2 size-[16px] -translate-x-1/2 -translate-y-1/2">
              <VectorIcon
                src="/assets/icons/tick-green.svg"
                size={16}
                inset="27.08% 20.83%"
                bleed="-6.82% -5.36%"
              />
            </span>
          </span>
        </div>
      </div>

      <span className="absolute left-[293px] top-[-6px] size-[20px] overflow-clip rounded-full border-2 border-white bg-[#3b3b3b]">
        <span className="absolute left-1/2 top-1/2 size-[12.5px] -translate-x-1/2 -translate-y-1/2">
          <VectorIcon
            src="/assets/icons/cancel-white.svg"
            size={12.5}
            inset="25%"
            bleed="-10%"
          />
        </span>
      </span>
    </div>
  )
}
