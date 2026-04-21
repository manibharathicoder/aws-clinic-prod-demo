import Card from '../../components/ui/Card.jsx';
import Toggle from '../../components/ui/Toggle.jsx';
import { useMemo, useState } from 'react';

const GROUPS = [
  {
    id: 'brampton',
    title: 'Brampton',
    badge: 'Default',
    rows: [
      { id: 'aba-clinic', service: 'ABA Direct — Clinic', rate: 65, billable: true, payable: true },
      { id: 'aba-inhome', service: 'ABA Direct — In-home', rate: 80, billable: true, payable: true },
      { id: 'aba-online', service: 'ABA Direct — Online', rate: 65, billable: true, payable: true },
      { id: 'aba-super', service: 'ABA Supervision', rate: 80, billable: true, payable: true },
      { id: 'ot-assess', service: 'OT Assessment', rate: 275, billable: true, payable: false },
      { id: 'slp-assess', service: 'SLP Assessment', rate: 275, billable: true, payable: false },
    ],
  },
  {
    id: 'mississauga',
    title: 'Mississauga',
    rows: [
      { id: 'aba-clinic', service: 'ABA Direct — Clinic', rate: 75, billable: true, payable: true },
      { id: 'aba-inhome', service: 'ABA Direct — In-home', rate: 85, billable: true, payable: true },
      { id: 'aba-online', service: 'ABA Direct — Online', rate: 75, billable: true, payable: true },
      { id: 'aba-super', service: 'ABA Supervision', rate: 95, billable: true, payable: true },
      { id: 'assess-aba', service: 'Assessment — ABA', rate: 275, billable: true, payable: false },
      { id: 'assess-ot', service: 'Assessment — OT', rate: 275, billable: true, payable: false },
    ],
  },
];

export default function AccountingPriceGroups() {
  const initial = useMemo(() => {
    const map = {};
    for (const g of GROUPS) {
      for (const r of g.rows) {
        map[`${g.id}:${r.id}:billable`] = r.billable;
        map[`${g.id}:${r.id}:payable`] = r.payable;
      }
    }
    return map;
  }, []);

  const [toggles, setToggles] = useState(initial);

  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Price Groups</h2>
        <p className="text-on-surface-variant font-medium">
          3 price groups · Accounting + Super Admin only · <span className="text-primary font-bold">Billable</span> =
          charge client · <span className="font-bold text-[#8B5CF6]">Payable</span> = pay therapist
        </p>
      </section>

      <div className="flex justify-end">
        <button type="button" className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-sm">
          + New price group
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {GROUPS.map((g) => (
          <Card key={g.id} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-lg font-extrabold text-on-surface">{g.title}</div>
              {g.badge ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">
                  {g.badge}
                </span>
              ) : null}
              <div className="ml-auto text-[11px] text-on-surface-variant font-bold">Rate/hr</div>
            </div>

            {/* Desktop grid (no horizontal scrollbar) */}
            <div className="hidden md:block">
              <div className="grid grid-cols-[minmax(0,1fr)_110px_120px_120px] items-center gap-3 px-1 py-2 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
                <div>Service</div>
                <div className="text-right">Rate/hr</div>
                <div className="text-center">Billable</div>
                <div className="text-center">Payable</div>
              </div>
              <div className="mt-1 divide-y divide-outline-variant/20 border-y border-outline-variant/20">
                {g.rows.map((r) => {
                  const billKey = `${g.id}:${r.id}:billable`;
                  const payKey = `${g.id}:${r.id}:payable`;
                  const billable = !!toggles[billKey];
                  const payable = !!toggles[payKey];

                  return (
                    <div
                      key={r.id}
                      className="grid grid-cols-[minmax(0,1fr)_110px_120px_120px] items-center gap-3 px-1 py-3"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-on-surface truncate">{r.service}</div>
                      </div>
                      <div className="text-right tabular-nums font-extrabold text-on-surface">${r.rate}</div>
                      <div className="flex justify-center">
                        <Toggle
                          checked={billable}
                          tone="teal"
                          onChange={(v) => setToggles((p) => ({ ...p, [billKey]: v }))}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Toggle
                          checked={payable}
                          tone="violet"
                          onChange={(v) => setToggles((p) => ({ ...p, [payKey]: v }))}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile stacked rows */}
            <div className="md:hidden space-y-3">
              {g.rows.map((r) => {
                const billKey = `${g.id}:${r.id}:billable`;
                const payKey = `${g.id}:${r.id}:payable`;
                const billable = !!toggles[billKey];
                const payable = !!toggles[payKey];
                return (
                  <div
                    key={r.id}
                    className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-extrabold text-on-surface">{r.service}</div>
                        <div className="mt-1 text-xs text-on-surface-variant tabular-nums">${r.rate}/hr</div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="flex items-center justify-between rounded-lg bg-surface-container p-3">
                        <div className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
                          Billable
                        </div>
                        <Toggle
                          checked={billable}
                          tone="teal"
                          onChange={(v) => setToggles((p) => ({ ...p, [billKey]: v }))}
                        />
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-surface-container p-3">
                        <div className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
                          Payable
                        </div>
                        <Toggle
                          checked={payable}
                          tone="violet"
                          onChange={(v) => setToggles((p) => ({ ...p, [payKey]: v }))}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="mt-4 w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-on-surface font-bold text-sm"
            >
              + Add service to group
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
