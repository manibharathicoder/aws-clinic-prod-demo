export default function MaterialIcon({ name, className, filled }) {
  return (
    <span
      className={[
        'material-symbols-outlined',
        'leading-none',
        'select-none',
        'shrink-0',
        'align-middle',
        'text-[22px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

