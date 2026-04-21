import MaterialIcon from '../MaterialIcon.jsx';

export default function AppBrand({
  icon = 'child_care',
  title = 'PediatricSync',
  subtitle = 'Clinical Excellence',
}) {
  return (
    <div className="mb-10 flex items-center gap-3 px-2">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-lg shadow-primary/20">
        <MaterialIcon name={icon} className="text-white" filled />
      </div>
      <div>
        <h1 className="text-xl font-extrabold tracking-tighter text-[#191C20]">{title}</h1>
        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold">{subtitle}</p>
      </div>
    </div>
  );
}

