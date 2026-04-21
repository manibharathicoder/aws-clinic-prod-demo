import Card from '../../components/ui/Card.jsx';

const REPORTS = [
  { name: 'Revenue summary', date: 'Jan 1 – Mar 31, 2026', groupBy: 'Month' },
  { name: 'Outstanding invoices', date: 'Last 30 days', groupBy: 'Client' },
  { name: 'Payroll summary', date: 'Mar 1 – Mar 15, 2026', groupBy: 'Therapist' },
];

export default function AccountingReports() {
  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Financial Reports</h2>
        <p className="text-on-surface-variant font-medium">Report runner + exports (demo)</p>
      </section>

      <Card className="p-6">
        <div className="text-sm font-extrabold text-on-surface mb-4">Financial report builder</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Report type</div>
            <select className="w-full bg-surface-container-low border-none rounded-xl px-3 py-2 text-sm">
              <option>Revenue summary</option>
              <option>Outstanding invoices</option>
              <option>Payroll summary</option>
              <option>Tax collected (CRA)</option>
              <option>OAP funding</option>
            </select>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Date range</div>
            <select className="w-full bg-surface-container-low border-none rounded-xl px-3 py-2 text-sm">
              <option>Jan 1 – Mar 31, 2026</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>This year</option>
            </select>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Location</div>
            <select className="w-full bg-surface-container-low border-none rounded-xl px-3 py-2 text-sm">
              <option>All locations</option>
              <option>Brampton only</option>
              <option>Mississauga only</option>
            </select>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Group by</div>
            <select className="w-full bg-surface-container-low border-none rounded-xl px-3 py-2 text-sm">
              <option>Service type</option>
              <option>Therapist</option>
              <option>Client</option>
              <option>Month</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex gap-2 justify-end">
          <button type="button" className="px-4 py-2 rounded-xl bg-surface-container text-on-surface-variant font-bold text-sm">
            Export CSV
          </button>
          <button type="button" className="px-4 py-2 rounded-xl bg-surface-container text-on-surface-variant font-bold text-sm">
            Export PDF
          </button>
          <button type="button" className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-sm">
            Run report →
          </button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="text-sm font-extrabold text-on-surface mb-4">Recent reports</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {REPORTS.map((r) => (
            <div key={r.name} className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4">
              <div className="text-sm font-extrabold text-on-surface">{r.name}</div>
              <div className="mt-1 text-xs text-on-surface-variant">Range: {r.date}</div>
              <div className="mt-1 text-xs text-on-surface-variant">Group by: {r.groupBy}</div>
              <div className="mt-4 flex gap-2">
                <button type="button" className="px-3 py-2 rounded-lg bg-primary text-white text-xs font-bold">
                  Run
                </button>
                <button type="button" className="px-3 py-2 rounded-lg bg-surface-container text-on-surface-variant text-xs font-bold">
                  Export PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

