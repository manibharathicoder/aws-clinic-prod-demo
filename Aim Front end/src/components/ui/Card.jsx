export default function Card({ className, children }) {
  return (
    <div
      className={[
        'bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(25,28,32,0.02)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

