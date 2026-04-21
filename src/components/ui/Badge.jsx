export default function Badge({ tone = 'neutral', children }) {
  const cls =
    tone === 'violet'
      ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20'
      : tone === 'blue'
        ? 'bg-[#4A90E2]/10 text-[#4A90E2] border-[#4A90E2]/20'
        : tone === 'amber'
          ? 'bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/20'
          : tone === 'teal'
            ? 'bg-primary/10 text-primary border-primary/20'
            : tone === 'green'
              ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20'
              : 'bg-surface-container text-on-surface-variant border-outline-variant/20';

  return (
    <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border ${cls}`}>
      {children}
    </span>
  );
}

