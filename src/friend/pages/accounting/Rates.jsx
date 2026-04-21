import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

const RATES = [
  { service: 'ABA Therapy', location: 'Brampton', rate: '$120/hr', effective: 'May 1, 2026', access: { t: 'Accounting only', tone: 'amber' } },
  { service: 'Speech Therapy', location: 'Mississauga', rate: '$140/hr', effective: 'May 1, 2026', access: { t: 'Accounting only', tone: 'amber' } },
  { service: 'OT Therapy', location: 'All', rate: '$135/hr', effective: 'May 1, 2026', access: { t: 'Accounting only', tone: 'amber' } },
];

export default function AccountingRates() {
  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Rate Management</h2>
        <p className="text-on-surface-variant font-medium">Service rates (demo)</p>
      </section>

      <Card className="p-6 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-on-surface-variant">
            All rates — Accounting + Super Admin only · Effective dates supported (demo)
          </div>
          <button type="button" className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-sm">
            + Add rate
          </button>
        </div>

        <table className="min-w-[860px] w-full text-sm">
          <thead className="text-left text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            <tr>
              <th className="py-3 pr-3">Service</th>
              <th className="py-3 pr-3">Location</th>
              <th className="py-3 pr-3">Rate</th>
              <th className="py-3 pr-3">Effective</th>
              <th className="py-3 pr-3">Access</th>
              <th className="py-3 pr-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {RATES.map((r) => (
              <tr key={`${r.service}-${r.location}`} className="border-t border-outline-variant/20">
                <td className="py-3 pr-3 font-bold text-on-surface">{r.service}</td>
                <td className="py-3 pr-3 text-on-surface">{r.location}</td>
                <td className="py-3 pr-3 tabular-nums font-extrabold text-on-surface">{r.rate}</td>
                <td className="py-3 pr-3 text-on-surface">{r.effective}</td>
                <td className="py-3 pr-3">
                  <Badge tone={r.access.tone}>{r.access.t}</Badge>
                </td>
                <td className="py-3 pr-3">
                  <button type="button" className="text-primary font-bold text-xs hover:underline">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-[11px] text-on-surface-variant">
          🔒 Pay rates are visible to Accounting and Super Admin only (prototype note).
        </div>
      </Card>
    </div>
  );
}
