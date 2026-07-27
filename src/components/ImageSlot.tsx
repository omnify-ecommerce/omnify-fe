/**
 * Stands in for the design's <image-slot> custom element, which was an empty
 * drop target — the design shipped no illustration for it (the files in the
 * source `uploads/` folder are the designer's reference screenshots, not
 * assets). Pass `src` once you have real artwork and it renders that instead.
 */
interface ImageSlotProps {
  /** Supply real artwork to replace the placeholder. */
  src?: string
  alt?: string
  placeholder?: string
  className?: string
}

export default function ImageSlot({
  src,
  alt = '',
  placeholder = 'Drop your product illustration here',
  className = '',
}: ImageSlotProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`size-full rounded-2xl object-cover ${className}`}
      />
    )
  }

  return (
    <div
      className={`grid size-full place-items-center rounded-2xl border-2 border-dashed border-ink/12 bg-white/60 px-6 text-center text-[13.5px] font-medium text-faint ${className}`}
    >
      {placeholder}
    </div>
  )
}
