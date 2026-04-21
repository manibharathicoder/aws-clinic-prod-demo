import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

const INVOICES = [
  { id: 'INV-2026-0342', client: 'Client #A12', period: 'Mar 10–16', amount: '$324.00', status: { t: 'Unpaid', tone: 'amber' }, days: 3 },
  { id: 'INV-2026-0335', client: 'Client #E21', period: 'Mar 3–9', amount: '$680.00', status: { t: 'Overdue', tone: 'amber' }, days: 14 },
  { id: 'INV-2026-0318', client: 'Client #B07', period: 'Feb 10–16', amount: '$2,800.00', status: { t: 'Unpaid', tone: 'amber' }, days: 30 },
];

export default function AccountingInvoices() {
  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Invoices</h2>
        <p className="text-on-surface-variant font-medium">Client invoices and collections (demo)</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Paid this month</div>
          <div className="mt-2 text-3xl font-extrabold text-primary">$44,820</div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Outstanding</div>
          <div className="mt-2 text-3xl font-extrabold text-tertiary">$3,420</div>
        </Card>
        <Card className="p-6 border border-error/10 bg-error-container/20">
          <div className="text-xs font-bold uppercase tracking-widest text-on-error-container">Overdue 14+ days</div>
          <div className="mt-2 text-3xl font-extrabold text-error">$680</div>
        </Card>
      </section>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 bg-surface-container-low">
          <div className="text-sm font-extrabold text-on-surface">All client invoices</div>
          <div className="flex gap-2">
            <button type="button" className="text-xs font-bold px-3 py-2 rounded-lg bg-white border border-outline-variant/30">
              Export CSV
            </button>
            <button type="button" className="text-xs font-bold px-3 py-2 rounded-lg bg-white border border-outline-variant/30">
              Export PDF
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[920px] w-full text-sm">
            <thead className="text-left text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              <tr>
                <th className="px-5 py-4">Invoice #</th>
                <th className="px-5 py-4">Client</th>
                <th className="px-5 py-4">Period</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Days</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {INVOICES.map((inv) => (
                <tr key={inv.id} className="border-t border-outline-variant/20">
                  <td className="px-5 py-4 tabular-nums text-xs font-extrabold text-on-surface">{inv.id}</td>
                  <td className="px-5 py-4 text-on-surface">{inv.client}</td>
                  <td className="px-5 py-4 text-on-surface">{inv.period}</td>
                  <td className="px-5 py-4 tabular-nums font-extrabold text-on-surface">{inv.amount}</td>
                  <td className="px-5 py-4">
                    <Badge tone={inv.status.tone}>{inv.status.t}</Badge>
                  </td>
                  <td className="px-5 py-4 text-on-surface">{inv.days} days</td>
                  <td className="px-5 py-4">
                    <button type="button" className="text-primary font-bold text-xs hover:underline">
                      View · Remind
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
