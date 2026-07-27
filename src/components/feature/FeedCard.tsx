import feedPhone from '@/assets/feed-phone.png'

/**
 * "See it. Finally, in real time!" — the full-width card opening the dark
 * section (Figma 1869:25387, 1071×539).
 *
 * At lg the children are absolutely positioned to the frame's exact
 * coordinates; below that the card becomes a normal flow column so the copy
 * stays readable instead of being scaled into illegibility.
 */
export default function FeedCard() {
  return (
    <div
      className="group relative flex w-full flex-col gap-6 overflow-clip rounded-[24px] border border-[rgba(255,255,255,0.09)] p-6 lg:block lg:h-[539px] lg:p-0"
      style={{
        backgroundImage:
          'linear-gradient(to bottom, var(--color-night-top) 36.761%, var(--color-night-deep) 100%)',
      }}
    >
      <p className="text-[32px] font-medium leading-[1.05] tracking-[-0.5px] text-white lg:absolute lg:left-[48px] lg:top-[48px] lg:w-[351px] lg:text-[40px] lg:leading-[42px]">
        See it. Finally, in real time!
      </p>

      <img
        src={feedPhone}
        alt="The Floodwatch feed showing a flood report with photos, severity and confirmations"
        width={369}
        height={481}
        className="mx-auto w-[280px] max-w-full transition-transform duration-300 ease-out lg:absolute lg:left-[646px] lg:top-[57px] lg:mx-0 lg:h-[481px] lg:w-[369px] lg:group-hover:[transform:translate(2.7px,4.8px)_rotate(-7.8deg)_scale(1.018)]"
      />

      <p className="text-[16px] font-normal leading-[26px] tracking-[-0.5px] text-mist lg:absolute lg:left-[48px] lg:top-[363px] lg:w-[436px] lg:text-[20px] lg:leading-[32px]">
        Every report appears on your feed the second someone posts it, from a
        person already on that street, not a guess from far away. Only a handle
        is ever shown, never a name, phone, or email.
      </p>
    </div>
  )
}
