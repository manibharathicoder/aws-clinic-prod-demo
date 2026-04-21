import { usePortal } from '../../state/portal.jsx';
import { useNavigate } from 'react-router-dom';

const PORTALS = [
  { id: 'superadmin', name: 'Super Admin', desc: 'Platform + all clinics' },
  { id: 'admin', name: 'Admin', desc: 'Clinic operations' },
  { id: 'accounting', name: 'Accounting', desc: 'Billing + RCM' },
  { id: 'therapist', name: 'Therapist', desc: 'Schedule + notes' },
  { id: 'family', name: 'Family', desc: 'Sessions + payments' },
];

export default function PortalSwitcher() {
  const { portal, setPortal, isSwitcherOpen, closeSwitcher } = usePortal();
  const navigate = useNavigate();

  if (!isSwitcherOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        className="absolute inset-0 bg-black/30"
        onClick={closeSwitcher}
        aria-label="Close portal switcher"
      />

      <div className="absolute left-6 right-6 bottom-24 rounded-2xl bg-white shadow-2xl border border-outline-variant/30 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-extrabold text-on-surface">Portal Switcher</p>
            <p className="text-xs text-on-surface-variant">Prototype navigation (role switch)</p>
          </div>
          <button
            type="button"
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors"
            onClick={closeSwitcher}
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PORTALS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setPortal(p.id);
                closeSwitcher();
                if (p.id === 'superadmin') navigate('/superadmin/dashboard');
                else if (p.id === 'accounting') navigate('/accounting/dashboard');
                else if (p.id === 'family') navigate('/family/dashboard');
              }}
              className={[
                'text-left p-4 rounded-xl border transition-all',
                portal === p.id
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container-low',
              ].join(' ')}
            >
              <div className="text-sm font-extrabold text-on-surface">{p.name}</div>
              <div className="text-[11px] text-on-surface-variant mt-1">{p.desc}</div>
            </button>
          ))}
        </div>

        <p className="mt-4 text-[11px] text-on-surface-variant">
          Note: Only Super Admin routes are implemented right now.
        </p>
      </div>
    </div>
  );
}
