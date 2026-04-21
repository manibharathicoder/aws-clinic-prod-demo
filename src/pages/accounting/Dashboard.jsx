import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

export default function AccountingDashboard() {
  const payrollRows = [
    { therapist: 'Dr. Priya Mehta', sessions: 12, statement: { t: 'Confirmed', tone: 'teal' }, pay: '$2,340' },
    { therapist: 'James Okafor', sessions: 10, statement: { t: 'Confirmed', tone: 'teal' }, pay: '$1,860' },
    { therapist: 'Sara Nguyen', sessions: 8, statement: { t: 'Dispute open', tone: 'amber' }, pay: 'Pending' },
  ];

  const alerts = [
    { t: 'Client #E21 — overdue 14 days · $680 outstanding', tone: 'amber' },
    { t: 'OAP client #A12 — 80% of annual allocation used', tone: 'amber' },
    { t: 'New client #NEW — no rates set yet in price group', tone: 'teal' },
  ];

  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Accounting Dashboard</h2>
        <p className="text-on-surface-variant font-medium">Finance KPIs and action items (demo)</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Revenue this month</div>
          <div className="mt-2 text-3xl font-extrabold text-primary">$48,240</div>
          <div className="mt-1 text-xs text-on-surface-variant">↑ 12% vs last month</div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Outstanding invoices</div>
          <div className="mt-2 text-3xl font-extrabold text-tertiary">$3,420</div>
          <div className="mt-1 text-xs text-on-surface-variant">4 overdue</div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Payroll due Apr 15</div>
          <div className="mt-2 text-3xl font-extrabold text-secondary">$12,840</div>
          <div className="mt-1 text-xs text-on-surface-variant">8 therapists · Mar 1–15</div>
        </Card>
        <Card className="p-6 border border-error/10 bg-error-container/20">
          <div className="text-xs font-bold uppercase tracking-widest text-on-error-container">Pay disputes open</div>
          <div className="mt-2 text-3xl font-extrabold text-error">3</div>
          <div className="mt-1 text-xs text-on-surface-variant">Resolve before payroll run</div>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-extrabold text-on-surface">Payroll — Period Mar 1–15 · Due Apr 15</div>
            <button type="button" className="text-xs font-bold text-primary hover:underline">
              View all
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[640px] w-full text-sm">
              <thead className="text-left text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                <tr>
                  <th className="py-3 pr-3">Therapist</th>
                  <th className="py-3 pr-3">Sessions</th>
                  <th className="py-3 pr-3">Statement</th>
                  <th className="py-3 pr-3">Pay</th>
                </tr>
              </thead>
              <tbody>
                {payrollRows.map((r) => (
                  <tr key={r.therapist} className="border-t border-outline-variant/20">
                    <td className="py-3 pr-3 font-bold text-on-surface">{r.therapist}</td>
                    <td className="py-3 pr-3 text-on-surface">{r.sessions}</td>
                    <td className="py-3 pr-3">
                      <Badge tone={r.statement.tone}>{r.statement.t}</Badge>
                    </td>
                    <td className="py-3 pr-3 tabular-nums font-extrabold text-on-surface">{r.pay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            className="mt-4 w-full text-xs font-bold px-4 py-3 rounded-xl bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            Resolve 3 disputes to enable payroll approval
          </button>
        </Card>

        <Card className="p-6">
          <div className="text-sm font-extrabold text-on-surface mb-4">Alerts requiring action</div>
          <div className="space-y-3">
            {alerts.map((a) => (
              <div
                key={a.t}
                className="p-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest flex items-start justify-between gap-3"
              >
                <div className="text-sm text-on-surface">{a.t}</div>
                <Badge tone={a.tone}>Action</Badge>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
