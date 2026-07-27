import cardCamera from '@/assets/card-camera.webp'
import cardHandle from '@/assets/card-handle.webp'
import handleHover from '@/assets/handle-hover.webp'

/**
 * Geometry of the "Name tag" instance inside the handle card, as percentages of
 * the 523.5×636 card so it tracks the card at any width. Figma places it at
 * (109, 220) measuring 313×380.26.
 */
const NAME_TAG = {
  left: `${(109 / 523.5) * 100}%`,
  top: `${(220 / 636) * 100}%`,
  width: `${(313 / 523.5) * 100}%`,
  height: `${(380.26361 / 636) * 100}%`,
}

/**
 * The second card pair (Figma 2006:18507 / 2006:18508).
 *
 * Unlike the first pair, these are shipped as full-card renders rather than
 * rebuilt in markup. Their visuals are a masked hand-and-phone composite and a
 * layered name-tag mockup, and Figma flattens each sub-layer against the card's
 * white base on export — so the layers cannot be recomposited in CSS. Exporting
 * the whole card is the only way to get the intended pixels.
 *
 * The trade-off is that the headings live inside the raster. They are repeated
 * as screen-reader text so the copy still reaches assistive tech and crawlers.
 */
type RasterCardProps = {
  image: string
  title: string
  body: string
  alt: string
  /** Optional hover state cross-faded over the name-tag region. */
  hoverSrc?: string
}

function RasterCard({ image, title, body, alt, hoverSrc }: RasterCardProps) {
  return (
    <article className="group relative overflow-clip rounded-[24px]">
      <img
        src={image}
        alt={alt}
        width={523.5}
        height={636}
        className="block h-auto w-full"
      />

      {/* Figma prototypes this as ON_HOVER → CHANGE_TO with a 300ms DISSOLVE,
          which is a cross-fade: the new state fades in over the old rather than
          replacing it. The trigger is the whole card, not just the name tag —
          a 313px hover target inside a card is fiddly on the web. */}
      {hoverSrc && (
        <img
          src={hoverSrc}
          alt=""
          aria-hidden
          className="pointer-events-none absolute opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
          style={NAME_TAG}
        />
      )}

      <h3 className="sr-only">{title}</h3>
      <p className="sr-only">{body}</p>
    </article>
  )
}

export function CameraCard() {
  return (
    <RasterCard
      image={cardCamera}
      title="Straight from your neighbours."
      body="3 confirmations make a report Verified, not an algorithm. No new confirms in 2 hours, and it quietly moves to Likely Resolved."
      alt="A hand holding a phone photographing a flooded river to file a report"
    />
  )
}

export function HandleCard() {
  return (
    <RasterCard
      image={cardHandle}
      title="Only your handle is ever shown."
      body="Not your name, phone number, or email, on a report, a comment, or a confirmation. Ever."
      alt="A profile card showing only the handle @KBSHOG, with no personal details"
      hoverSrc={handleHover}
    />
  )
}
