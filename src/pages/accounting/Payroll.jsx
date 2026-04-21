import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

const STATEMENTS = [
  { therapist: 'Dr. Priya Mehta', sessions: 12, status: { t: 'Confirmed', tone: 'teal' }, pay: '$2,340' },
  { therapist: 'James Okafor', sessions: 10, status: { t: 'Confirmed', tone: 'teal' }, pay: '$1,860' },
  { therapist: 'Sara Nguyen', sessions: 8, status: { t: 'Dispute open', tone: 'amber' }, pay: 'Pending' },
];

export default function AccountingPayroll() {
  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Payroll</h2>
        <p className="text-on-surface-variant font-medium">Statements, disputes, and approvals (demo)</p>
      </section>

      <Card className="p-6 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-extrabold text-on-surface">Period Mar 1–15 · Due Apr 15</div>
          <button type="button" className="text-xs font-bold px-3 py-2 rounded-lg bg-primary text-white">
            Approve payroll
          </button>
        </div>

        <table className="min-w-[760px] w-full text-sm">
          <thead className="text-left text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            <tr>
              <th className="py-3 pr-3">Therapist</th>
              <th className="py-3 pr-3">Sessions</th>
              <th className="py-3 pr-3">Status</th>
              <th className="py-3 pr-3">Pay</th>
              <th className="py-3 pr-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {STATEMENTS.map((s) => (
              <tr key={s.therapist} className="border-t border-outline-variant/20">
                <td className="py-3 pr-3 font-bold text-on-surface">{s.therapist}</td>
                <td className="py-3 pr-3 text-on-surface">{s.sessions}</td>
                <td className="py-3 pr-3">
                  <Badge tone={s.status.tone}>{s.status.t}</Badge>
                </td>
                <td className="py-3 pr-3 tabular-nums font-extrabold text-on-surface">{s.pay}</td>
                <td className="py-3 pr-3">
                  <button type="button" className="text-primary font-bold text-xs hover:underline">
                    View statement
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
