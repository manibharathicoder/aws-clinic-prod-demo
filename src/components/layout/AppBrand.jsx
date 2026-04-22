export default function AppBrand({
  title,
  subtitle,
}) {
  return (
    <div className="mb-6 px-1">
      <img
        alt="AIM Pediatric Therapy"
        src="/aim-logo.png"
        className="h-12 w-auto max-w-[240px] object-contain"
      />
      {title ? <h1 className="mt-2 text-xl font-extrabold tracking-tighter text-[#191C20]">{title}</h1> : null}
      {subtitle ? (
        <p className={['text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold', title ? '' : 'mt-2'].join(' ')}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

