import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

const ROWS = [
  { date: 'Mar 1', client: 'Client #A12', service: 'ABA · In-person', role: { t: 'Primary', tone: 'violet' }, dur: '60 min', amt: '$XX.XX' },
  { date: 'Mar 3', client: 'Client #C14', service: 'ABA · In-person', role: { t: 'Supervisor', tone: 'amber' }, dur: '30 min', amt: '$XX.XX' },
  { date: 'Mar 5', client: 'Client #A12', service: 'ABA · Virtual', role: { t: 'Primary', tone: 'violet' }, dur: '60 min', amt: '$XX.XX' },
  { date: 'Mar 8', client: 'Client #B07', service: 'ABA · In-person', role: { t: 'Assistant', tone: 'teal' }, dur: '45 min', amt: '$XX.XX' },
  { date: 'Mar 10', client: '—', service: 'Centre task', role: { t: 'Centre task', tone: 'amber' }, dur: '60 min', amt: '$XX.XX' },
];

export default function TherapistPayStatement() {
  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Pay Statement</h2>
        <p className="text-on-surface-variant font-medium">Mar 1–15, 2026 (demo)</p>
      </section>

      <div className="rounded-2xl border border-[#F6E05E]/40 bg-[#FFF8E7] p-4">
        <div className="text-sm font-extrabold text-[#8A5A00]">Review deadline</div>
        <div className="text-xs text-[#8A5A00]/80 mt-1">
          Review by <span className="font-bold">March 17, 2026</span>. If no action is taken, the statement will be auto-confirmed. Payment date:{' '}
          <span className="font-bold">April 15, 2026</span>.
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="px-5 py-4 bg-surface-container-low flex items-center justify-between gap-3">
          <div className="text-sm font-extrabold text-on-surface">Pay statement — Mar 1–15, 2026</div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="text-xs font-bold px-3 py-2 rounded-xl bg-white border border-outline-variant/30">
              Download PDF
            </button>
            <button type="button" className="text-xs font-bold px-3 py-2 rounded-xl bg-error text-white">
              Raise dispute
            </button>
            <button type="button" className="text-xs font-bold px-3 py-2 rounded-xl bg-primary text-white">
              Confirm ✓
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[980px] w-full text-sm">
            <thead className="text-left text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              <tr>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Client</th>
                <th className="px-5 py-4">Service</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Duration</th>
                <th className="px-5 py-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={`${r.date}-${r.service}`} className="border-t border-outline-variant/20">
                  <td className="px-5 py-4 font-extrabold text-on-surface">{r.date}</td>
                  <td className="px-5 py-4 text-on-surface">{r.client}</td>
                  <td className="px-5 py-4 text-on-surface">{r.service}</td>
                  <td className="px-5 py-4">
                    <Badge tone={r.role.tone}>{r.role.t}</Badge>
                  </td>
                  <td className="px-5 py-4 text-on-surface">{r.dur}</td>
                  <td className="px-5 py-4 tabular-nums font-extrabold text-on-surface">{r.amt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 bg-surface-container-low flex items-center justify-between gap-3">
          <div className="text-[11px] text-on-surface-variant">
            Pay rates are shown as totals only — individual rates not displayed
          </div>
          <div className="text-sm font-extrabold text-on-surface">
            Total: <span className="text-primary tabular-nums">$XXX.XX</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

