export default function Toggle({ checked, onChange, onLabel, offLabel, tone = 'teal', disabled }) {
  const track =
    tone === 'violet'
      ? 'bg-[#8B5CF6]'
      : tone === 'amber'
        ? 'bg-[#F5A623]'
        : tone === 'blue'
          ? 'bg-[#4A90E2]'
          : 'bg-primary';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={[
        'inline-flex items-center gap-2 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-full',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      ].join(' ')}
      aria-pressed={checked}
    >
      {onLabel || offLabel ? (
        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          {checked ? onLabel : offLabel}
        </span>
      ) : null}
      <span
        className={[
          'relative w-11 h-6 rounded-full border transition-colors',
          checked ? `${track} border-transparent shadow-sm` : 'bg-surface-container border-outline-variant/40',
        ].join(' ')}
      >
        <span
          className={[
            'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0',
          ].join(' ')}
        />
      </span>
    </button>
  );
}
