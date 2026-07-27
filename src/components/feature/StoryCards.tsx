import type { ReactNode } from 'react'
import { VerificationPanel, AlertsPanel } from './MockupPanels'
import rainBg from '@/assets/rain-bg.webp'
import sunsetBg from '@/assets/sunset-bg.webp'

/**
 * The paired photo cards in the dark section (Figma 2006:18516 / 2006:18548).
 * Each is 523.5×636: a full-bleed photo, a heading block inset at ~(48, 48),
 * and an app mockup panel starting at y≈219.
 */
type PhotoCardProps = {
  image: string
  title: string
  body: string
  children: ReactNode
  /** Panel offset from the card top. */
  panelTop: number
}

function PhotoCard({ image, title, body, children, panelTop }: PhotoCardProps) {
  return (
    /* bg is the section colour, not white. The frame gives this card a white
       base fill, but the photo covers it — the only place it ever showed was
       under a translucent border, which turned that edge solid white. */
    <article className="relative h-[636px] w-full overflow-clip rounded-[24px] bg-night">
      {/* Exported from Figma already clipped to the card's 523.5×636 bounds, so
          it drops in full-bleed — no crop transform to reproduce by hand. */}
      <img
        src={image}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />

      <div className="absolute left-[24px] top-[40px] flex w-[436px] max-w-[calc(100%-48px)] flex-col lg:left-[47px] lg:top-[47px]">
        <h3 className="text-[18px] font-bold leading-[28px] tracking-[-0.5px] text-white lg:text-[20px] lg:leading-[32px]">
          {title}
        </h3>
        <p className="text-[16px] font-normal leading-[26px] tracking-[-0.5px] text-mist lg:text-[20px] lg:leading-[32px]">
          {body}
        </p>
      </div>

      <div
        className="absolute left-1/2"
        style={{
          top: panelTop,
          transform: 'translateX(-50%) scale(var(--panel-scale))',
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>

      {/* Hairline edge. An inset box-shadow rather than a border: Chrome clamps
          `border-width` up to 1px, so 0.5px is only achievable this way. It is
          painted last because inset shadows sit below child content. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px]"
        style={{ boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.2)' }}
      />
    </article>
  )
}

export function NeighboursCard() {
  return (
    <PhotoCard
      image={rainBg}
      title="Straight from your neighbours."
      body="3 confirmations make a report Verified, not an algorithm. No new confirms in 2 hours, and it quietly moves to Likely Resolved."
      panelTop={219}
    >
      <VerificationPanel />
    </PhotoCard>
  )
}

export function AlertsCard() {
  return (
    <PhotoCard
      image={sunsetBg}
      title="First to know. First to move."
      body="Get notified the moment a Verified report appears near a street you're watching. Tap it, and the map opens right on that pin."
      panelTop={220}
    >
      <AlertsPanel />
    </PhotoCard>
  )
}
