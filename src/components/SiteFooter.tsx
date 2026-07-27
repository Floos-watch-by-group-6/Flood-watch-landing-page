import VectorIcon from './VectorIcon'

/**
 * Footer (Figma 2006:18921, 1440×302 at frame y=8536), preceded by a standalone
 * divider at y=8471.
 *
 * The band is full-bleed #fafafa, but its two hairlines span the content column
 * rather than the viewport — so they are drawn inside the column, not as
 * borders on the band.
 */
const COLUMNS = [
  {
    heading: 'Product',
    width: 'min-[1119px]:w-[74px]',
    links: ['Features', 'Pricing', 'Download', 'Changelog'],
  },
  {
    heading: 'Company',
    width: 'min-[1119px]:w-[65px]',
    links: ['About', 'Careers', 'Science', 'Community'],
  },
  {
    heading: 'Resources',
    width: 'min-[1119px]:w-[78px]',
    links: ['Product', 'Guides', 'Help center', 'Webinars'],
  },
]

const SOCIALS = [
  { name: 'Instagram', src: '/assets/icons/instagram.svg' },
  { name: 'YouTube', src: '/assets/icons/youtube.svg' },
  { name: 'X', src: '/assets/icons/twitter.svg' },
]

function Rule() {
  return (
    <div className="mx-auto max-w-[1119px] px-6">
      <div className="h-px w-full bg-[#f6f6f6]" />
    </div>
  )
}

export default function SiteFooter() {
  return (
    <footer className="w-full">
      {/* Standalone divider above the band, in the page's content column. */}
      <div className="mx-auto max-w-[1119px] px-6 pt-[107px]">
        <div className="h-px w-full bg-mist" />
      </div>

      <div className="mt-[64px] w-full bg-[#fafafa]">
        <Rule />

        <div className="mx-auto flex max-w-[1440px] justify-center px-6 py-[63px]">
          <div className="flex flex-col items-center gap-10 min-[1119px]:flex-row min-[1119px]:items-start min-[1119px]:gap-[100px]">
            <div className="flex flex-col gap-[24px] min-[1119px]:w-[176px]">
              <a href="#" aria-label="Floodwatch home" className="p-[12.4px]">
                <img
                  src="/assets/logo.svg"
                  alt="Floodwatch"
                  width={37.2}
                  height={27.28}
                  className="h-[27.28px] w-[37.2px]"
                />
              </a>
              {/* Reserved space in the frame; no content sits here. */}
              <div className="hidden h-[48px] w-full min-[1119px]:block" />
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-9 min-[1119px]:flex min-[1119px]:w-[660px] min-[1119px]:gap-[73px]">
              {COLUMNS.map((col) => (
                <div
                  key={col.heading}
                  className={`flex flex-col gap-[18px] ${col.width}`}
                >
                  <p className="text-[14px] font-medium leading-[20px] tracking-[-0.5px] text-[#1a1b3a]">
                    {col.heading}
                  </p>
                  <ul className="flex flex-col gap-[16px] min-[1119px]:h-[136px]">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="block whitespace-nowrap text-[14px] font-normal leading-[20px] tracking-[-0.5px] text-[#92929b] transition-colors duration-200 hover:text-ink"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* The frame positions the socials absolutely at (712, 74), which
                  is 5px left of where the Legal column starts. Kept in flow
                  here — the offset restores that 5px. */}
              <div className="flex flex-col gap-[18px] min-[1119px]:w-[90px]">
                <p className="text-[14px] font-medium leading-[20px] tracking-[-0.5px] text-[#1a1b3a]">
                  Legal
                </p>
                <a
                  href="#"
                  className="block text-[14px] font-normal leading-[20px] tracking-[-0.5px] text-[#92929b] transition-colors duration-200 hover:text-ink"
                >
                  Privacy
                </a>
                <ul className="flex items-center gap-[7px] min-[1119px]:-ml-[5px] min-[1119px]:-mt-[2px]">
                  {SOCIALS.map((social) => (
                    <li key={social.name}>
                      <a
                        href="#"
                        aria-label={social.name}
                        className="block transition-opacity duration-200 hover:opacity-60"
                      >
                        <VectorIcon src={social.src} size={14} inset="0" bleed="0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Rule />
      </div>
    </footer>
  )
}
