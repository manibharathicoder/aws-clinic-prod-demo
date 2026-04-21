import Card from '../../components/ui/Card.jsx';
import Toggle from '../../components/ui/Toggle.jsx';
import { useMemo, useState } from 'react';

export default function AccountingTax() {
  const taxTypes = useMemo(
    () => [
      { id: 'hst-on', name: 'HST — Ontario', sub: 'Harmonized Sales Tax', rate: '13%' },
      { id: 'gst-fed', name: 'GST — Federal', sub: 'Goods and Services Tax', rate: '5%' },
    ],
    []
  );

  const services = useMemo(
    () => [
      { id: 'aba', name: 'ABA Therapy', notes: 'Confirm with accountant' },
      { id: 'slp', name: 'Speech Therapy', notes: 'Confirm with accountant' },
      { id: 'ot', name: 'Occupational Therapy', notes: 'Confirm with accountant' },
      { id: 'grp', name: 'Group Programs', notes: 'May be taxable — confirm' },
    ],
    []
  );

  const [globalTax, setGlobalTax] = useState(() => ({
    'hst-on': false,
    'gst-fed': false,
  }));

  const [perService, setPerService] = useState(() => {
    const map = {};
    for (const s of services) {
      map[`${s.id}:hst-on`] = false;
      map[`${s.id}:gst-fed`] = false;
    }
    return map;
  });

  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Tax Settings</h2>
        <p className="text-on-surface-variant font-medium">Configure tax types and assign per service (demo)</p>
      </section>

      <div className="rounded-2xl border border-outline-variant/30 bg-[#FFF7ED] text-[#7C2D12] p-4 flex items-start gap-3">
        <div className="mt-0.5">⚠️</div>
        <div className="text-sm font-bold">
          All taxes are currently OFF. Confirm HST status with your accountant before go-live and enable the relevant
          toggles below.
        </div>
      </div>

      <Card className="p-6 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-lg font-extrabold text-on-surface">Tax types configured</div>
            <div className="text-xs text-on-surface-variant mt-1">Global status controls default application.</div>
          </div>
          <button type="button" className="px-4 py-2 rounded-xl bg-surface-container text-on-surface-variant font-bold text-sm">
            + Add custom tax type
          </button>
        </div>

        <table className="min-w-[860px] w-full text-sm">
          <thead className="text-left text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            <tr>
              <th className="py-3 pr-3">Tax type</th>
              <th className="py-3 pr-3">Rate</th>
              <th className="py-3 pr-3">Global status</th>
              <th className="py-3 pr-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {taxTypes.map((t) => (
              <tr key={t.id} className="border-t border-outline-variant/20">
                <td className="py-3 pr-3">
                  <div className="font-extrabold text-on-surface">{t.name}</div>
                  <div className="text-xs text-on-surface-variant">{t.sub}</div>
                </td>
                <td className="py-3 pr-3 font-extrabold text-on-surface">{t.rate}</td>
                <td className="py-3 pr-3">
                  <Toggle
                    checked={!!globalTax[t.id]}
                    onChange={(v) => setGlobalTax((p) => ({ ...p, [t.id]: v }))}
                    onLabel="ON"
                    offLabel="OFF"
                    tone="amber"
                  />
                </td>
                <td className="py-3 pr-3 text-right">
                  <button
                    type="button"
                    className="text-primary font-bold text-xs hover:underline"
                    onClick={() => setGlobalTax((p) => ({ ...p, [t.id]: !p[t.id] }))}
                  >
                    Toggle {globalTax[t.id] ? 'off' : 'on'} · Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="p-6 overflow-x-auto">
        <div className="text-lg font-extrabold text-on-surface mb-4">Per-service tax assignment</div>
        <table className="min-w-[980px] w-full text-sm">
          <thead className="text-left text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            <tr>
              <th className="py-3 pr-3">Service</th>
              <th className="py-3 pr-3 text-center">HST (13%)</th>
              <th className="py-3 pr-3 text-center">GST (5%)</th>
              <th className="py-3 pr-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => {
              const hKey = `${s.id}:hst-on`;
              const gKey = `${s.id}:gst-fed`;
              return (
                <tr key={s.id} className="border-t border-outline-variant/20">
                  <td className="py-3 pr-3 font-extrabold text-on-surface">{s.name}</td>
                  <td className="py-3 pr-3 text-center">
                    <Toggle
                      checked={!!perService[hKey]}
                      onChange={(v) => setPerService((p) => ({ ...p, [hKey]: v }))}
                      onLabel="ON"
                      offLabel="OFF"
                      tone="amber"
                      disabled={!globalTax['hst-on']}
                    />
                  </td>
                  <td className="py-3 pr-3 text-center">
                    <Toggle
                      checked={!!perService[gKey]}
                      onChange={(v) => setPerService((p) => ({ ...p, [gKey]: v }))}
                      onLabel="ON"
                      offLabel="OFF"
                      tone="amber"
                      disabled={!globalTax['gst-fed']}
                    />
                  </td>
                  <td className="py-3 pr-3 text-sm text-on-surface-variant">{s.notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
