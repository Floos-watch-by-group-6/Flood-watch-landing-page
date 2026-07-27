import { motion } from 'motion/react'
import VectorIcon from './VectorIcon'

const NAV_LINKS = ['Live Zones', 'Community', 'Volunteers', 'Help Center']

export default function Header() {
  return (
    <motion.header
      className="h-[101px] w-full"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 1120 − 2×24 padding = the design's 1072px content column, so at 1440
          the row spans x=184→1256 exactly as in the frame. */}
      <div className="relative mx-auto flex h-full max-w-[1120px] items-center justify-between px-6">
        {/* The logo frame carries 10.8px of internal padding in Figma. */}
        <a href="#" aria-label="Floodwatch home" className="shrink-0 pl-[10.8px]">
          <img
            src="/assets/logo.svg"
            alt="Floodwatch"
            width={32.4}
            height={23.76}
            className="h-[23.76px] w-[32.4px]"
          />
        </a>

        {/* Centred on the viewport axis, as in the design — not between the
            logo and CTA, which would sit ~30px left of the frame centre. */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex items-center gap-[36px]">
            {NAV_LINKS.map((label) => (
              <li key={label}>
                <a
                  href="#"
                  className="whitespace-nowrap text-[16px] font-medium leading-[24px] tracking-[-0.5px] text-body transition-colors duration-200 hover:text-ink"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#"
          className="group flex shrink-0 items-center gap-[4px] text-[18px] font-medium leading-[24px] tracking-[-1px] text-ink"
        >
          <span className="whitespace-nowrap">Get the app</span>
          <VectorIcon
            src="/assets/icons/smartphone.svg"
            size={24}
            inset="8.33% 22.92%"
            bleed="-3.75% -5.77%"
            className="transition-transform duration-200 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </motion.header>
  )
}
