interface SectionHeadingProps {
  label?: string;
  title: string;
  className?: string;
  titleClassName?: string;
}

export default function SectionHeading({
  label,
  title,
  className = "",
  titleClassName = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 md:mb-14 ${className}`}>
      {label && <span className="section-label font-display">{label}</span>}
      <h2
        className={`font-heading text-3xl font-medium leading-[1.15] tracking-[0.02em] text-wine sm:text-4xl lg:text-5xl ${titleClassName}`}
      >
        {title}
      </h2>
      <div className="divider-gold mt-6 w-20" />
    </div>
  );
}
