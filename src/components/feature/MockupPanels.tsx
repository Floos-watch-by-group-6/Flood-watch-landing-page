import VectorIcon from '../VectorIcon'

/**
 * The two in-card app mockups from the dark section. They are rebuilt in markup
 * rather than exported as images: Figma flattens their translucent glass fills
 * against the card's white base on export, producing fully opaque PNGs that are
 * unusable as overlays.
 *
 * Both panels are 428×567 with a 355px content column inset at (37, 40).
 */

/** Shared shell: translucent glass card with the Floodwatch mark on top. */
function PanelShell({ children }: { children: React.ReactNode }) {
  return (
    /* Glassmorphism: the translucent fill alone only tints the photo behind it.
       The backdrop blur is what actually frosts it, with a light saturate to
       keep the sunset/rain colours from going flat, a hairline top-light edge,
       and a soft drop shadow to lift the panel off the image. */
    <div
      className="relative h-[567px] w-[428px] overflow-clip rounded-[24px] bg-white/10 backdrop-blur-[18px] backdrop-saturate-150"
      style={{
        // Inset hairline instead of a border, for the same reason as the card:
        // Chrome clamps border-width to 1px. The panel's content is inset, so
        // nothing paints over it here.
        boxShadow:
          'inset 0 0 0 0.5px rgba(255,255,255,0.22), 0 8px 32px 0 rgba(0,0,0,0.22)',
      }}
    >
      <div className="absolute left-[37px] top-[40px] flex w-[355px] flex-col items-center gap-[24px]">
        <div className="relative size-[51px] shrink-0 overflow-clip rounded-full">
          <img
            src="/assets/logo-white.svg"
            alt=""
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[33.543px] w-[48.822px] -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        {children}
      </div>
    </div>
  )
}

/** Small label heading used by both panels ("Community Verification", "Alerts"). */
function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-[357px] items-center justify-between">
      <p className="whitespace-nowrap text-[16px] font-normal leading-[24px] tracking-[-1px] text-white">
        {children}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */

/** "Community Verification" — the confirm/resolve prompt pair. */
export function VerificationPanel() {
  return (
    <PanelShell>
      <div className="flex w-[355px] flex-col items-start">
        <div className="flex w-full flex-col items-end gap-[16px]">
          <PanelLabel>Community Verification</PanelLabel>

          <div className="flex w-full flex-col items-start gap-[8px]">
            {/* Is this still accurate? */}
            <div className="flex h-[72.701px] w-full flex-col items-center justify-center rounded-[27.134px] bg-[rgba(255,255,255,0.1)] px-[27px] py-[16px]">
              <div className="flex w-[286.921px] flex-col items-start gap-[6.137px]">
                <p className="text-[10.74px] font-medium leading-[15.343px] tracking-[-0.3836px] text-white">
                  Is this still accurate?
                </p>
                <div className="flex w-full items-start">
                  <div className="flex min-w-px flex-1 items-center gap-[9.206px]">
                    <span className="flex h-[30.687px] w-[138.857px] items-center justify-center rounded-[18.412px] bg-[rgba(245,248,250,0.2)] text-[8.24px] font-normal leading-[11.771px] tracking-[-0.3836px] text-white">
                      No, it&rsquo;s cleared
                    </span>
                    <span className="flex h-[30.687px] w-[138.857px] items-center justify-center rounded-[18.412px] bg-cute-500 text-[8.24px] font-normal leading-[11.771px] tracking-[-0.3836px] text-white">
                      Yes, still flooded
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Has Admiralty Way cleared? — the larger sibling of the hero card */}
            <div className="relative h-[72.357px] w-full rounded-[27.134px] bg-[rgba(255,255,255,0.1)]">
              <div className="absolute left-[27.13px] right-[27.13px] top-[15.83px] flex h-[40.701px] items-center justify-between">
                <div className="flex min-w-px flex-1 items-center gap-[9.045px]">
                  <VectorIcon
                    src="/assets/icons/timer-02.svg"
                    size={22.611}
                    inset="8.33% 12.5%"
                    bleed="-4.5% -5%"
                  />
                  <div className="flex flex-col items-start justify-center gap-[4.522px] tracking-[-0.5653px] text-white">
                    <p className="whitespace-nowrap text-[13.567px] font-medium leading-[18.089px]">
                      Has Admiralty Way cleared ?
                    </p>
                    <p className="whitespace-pre-wrap text-[11.306px] font-normal leading-[18.089px]">
                      {`You're nearby  ·  resolves in 26m`}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-[6.783px]">
                  <span className="relative size-[36.178px] shrink-0 overflow-clip rounded-[10.854px] bg-[rgba(248,17,0,0.1)]">
                    <span className="absolute left-1/2 top-1/2 size-[18.089px] -translate-x-1/2 -translate-y-1/2">
                      <VectorIcon
                        src="/assets/icons/cancel-red.svg"
                        size={18.089}
                        inset="25%"
                        bleed="-6.25%"
                      />
                    </span>
                  </span>
                  <span className="relative size-[36.178px] shrink-0 overflow-clip rounded-[10.854px] bg-[rgba(76,167,147,0.1)]">
                    <span className="absolute left-1/2 top-1/2 size-[18.089px] -translate-x-1/2 -translate-y-1/2">
                      <VectorIcon
                        src="/assets/icons/tick-green.svg"
                        size={18.089}
                        inset="27.08% 20.83%"
                        bleed="-6.82% -5.36%"
                      />
                    </span>
                  </span>
                </div>
              </div>
              <span className="absolute left-[331.26px] top-[-6.78px] size-[22.611px] overflow-clip rounded-full border-[2.261px] border-[#2b353d] bg-[#404a52]">
                <span className="absolute left-1/2 top-1/2 size-[11.132px] -translate-x-1/2 -translate-y-1/2">
                  <VectorIcon
                    src="/assets/icons/cancel-white.svg"
                    size={11.132}
                    inset="25%"
                    bleed="-10%"
                  />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </PanelShell>
  )
}

/* ------------------------------------------------------------------ */

type AlertRow = {
  icon: string
  iconInset: string
  iconBleed: string
  chip: string
  title: string
  titleWidth: number
  time: string
  body: string
  bodyWidth: number
}

const ALERT_ROWS: AlertRow[] = [
  {
    icon: '/assets/icons/alert-02.svg',
    iconInset: '12.5% 8.33%',
    iconBleed: '-4.44% -4%',
    chip: 'rgba(248,17,0,0.09)',
    title: 'Flooding confirmed near you',
    titleWidth: 167,
    time: '22 min ago',
    body: 'Admiralty Way, Lekki Phase 1, High severity, 4 confirmations',
    bodyWidth: 211,
  },
  {
    icon: '/assets/icons/cloud.svg',
    iconInset: '16.67% 8.33% 20.83% 8.33%',
    iconBleed: '-5% -3.75%',
    chip: 'rgba(175,193,204,0.71)',
    title: 'Heavy rain in your area',
    titleWidth: 133,
    time: '9:00 PM',
    body: 'Seen any flooding? Tap to report what you see',
    bodyWidth: 223,
  },
  {
    icon: '/assets/icons/tick-02.svg',
    iconInset: '27.08% 20.83%',
    iconBleed: '-10.23% -8.04%',
    chip: '#def4ef',
    title: 'Report now Verified',
    titleWidth: 115,
    time: '9:00 PM',
    body: 'Igbo-Efon Road reached 3 confirmations',
    bodyWidth: 199,
  },
]

const ROW_SHADOW = [
  '0px 25px 7px 0px rgba(0,0,0,0)',
  '0px 16px 6px 0px rgba(0,0,0,0.01)',
  '0px 9px 5px 0px rgba(0,0,0,0.03)',
  '0px 4px 4px 0px rgba(0,0,0,0.04)',
  '0px 1px 2px 0px rgba(0,0,0,0.05)',
].join(', ')

/** "Alerts" — the notification list. */
export function AlertsPanel() {
  return (
    <PanelShell>
      <div className="flex w-[355px] flex-col items-start">
        <div className="flex w-full flex-col items-end gap-[16px]">
          <PanelLabel>Alerts</PanelLabel>

          <div className="flex w-full flex-col items-start gap-[8px]">
            {ALERT_ROWS.map((row) => (
              <div
                key={row.title}
                className="flex w-full items-center justify-between overflow-clip rounded-[24px] bg-[rgba(255,255,255,0.1)] p-[12px]"
                style={{ boxShadow: ROW_SHADOW }}
              >
                <div className="flex w-[303px] shrink-0 items-center gap-[12px]">
                  <span
                    className="relative size-[32px] shrink-0 overflow-clip rounded-full"
                    style={{ background: row.chip }}
                  >
                    <span className="absolute left-1/2 top-1/2 size-[16px] -translate-x-1/2 -translate-y-1/2">
                      <VectorIcon
                        src={row.icon}
                        size={16}
                        inset={row.iconInset}
                        bleed={row.iconBleed}
                        transform={
                          row.icon.includes('alert')
                            ? 'rotate(180deg) scaleX(-1)'
                            : undefined
                        }
                      />
                    </span>
                  </span>

                  <div className="flex min-w-px flex-1 flex-col items-start gap-[6px]">
                    <div className="flex w-full items-center gap-[7px]">
                      <span
                        className="flex shrink-0 items-center"
                        style={{ width: row.titleWidth }}
                      >
                        <p className="whitespace-nowrap text-[14px] font-medium leading-[20px] tracking-[-0.5px] text-white">
                          {row.title}
                        </p>
                      </span>
                      <span className="size-[4px] shrink-0 rounded-full bg-[#92929b]" />
                      <p className="whitespace-nowrap text-[10px] font-medium leading-[16px] tracking-[-0.5px] text-white">
                        {row.time}
                      </p>
                    </div>
                    <p
                      className="text-[12px] font-normal leading-[16px] tracking-[-0.5px] text-white"
                      style={{ width: row.bodyWidth }}
                    >
                      {row.body}
                    </p>
                  </div>
                </div>

                <VectorIcon
                  src="/assets/icons/chevron.svg"
                  size={16}
                  inset="25% 37.5%"
                  bleed="-6.25% -12.5%"
                  transform="rotate(180deg) scaleY(-1)"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PanelShell>
  )
}
