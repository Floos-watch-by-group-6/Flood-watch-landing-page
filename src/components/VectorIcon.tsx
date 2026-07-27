/**
 * Figma exports icons as a vector of just the glyph's ink, positioned inside its
 * nominal box by two nested insets: `inset` places the glyph within the icon
 * box, `bleed` expands it to account for stroke overflow. Reproducing both keeps
 * the icon optically identical to the design instead of merely the right size.
 */
type VectorIconProps = {
  src: string
  /** Icon box in px — always square in this design system. */
  size: number
  /** CSS inset shorthand placing the glyph inside the box. */
  inset: string
  /** CSS inset shorthand (negative) expanding for stroke overflow. */
  bleed: string
  /** Some icons are placed with a transform in Figma (e.g. mirrored alert). */
  transform?: string
  className?: string
}

export default function VectorIcon({
  src,
  size,
  inset,
  bleed,
  transform,
  className = '',
}: VectorIconProps) {
  return (
    <span
      aria-hidden
      className={`relative block shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="absolute" style={{ inset, transform }}>
        <span className="absolute" style={{ inset: bleed }}>
          <img src={src} alt="" className="block size-full max-w-none" />
        </span>
      </span>
    </span>
  )
}
