import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

const INVOICES = [
  { num: 'INV-2026-0342', period: 'Apr 10–16', amount: '$324.00', status: 'unpaid' },
  { num: 'INV-2026-0318', period: 'Mar 10–16', amount: '$0.00', status: 'paid' },
  { num: 'INV-2026-0302', period: 'Feb 10–16', amount: '$0.00', status: 'paid' },
];

function InvoiceRow({ num, period, amount, status }) {
  const cfg =
    status === 'unpaid'
      ? { badge: { t: 'Unpaid', tone: 'amber' }, action: 'Pay now' }
      : { badge: { t: 'Paid', tone: 'teal' }, action: 'Receipt' };

  return (
    <div className="flex items-center gap-4 px-5 py-4 border-t border-outline-variant/20">
      <div className="flex-1 min-w-0">
        <div className="tabular-nums font-extrabold text-on-surface text-sm">{num}</div>
        <div className="text-xs text-on-surface-variant">{period}</div>
      </div>
      <div className="tabular-nums font-extrabold text-on-surface">{amount}</div>
      <Badge tone={cfg.badge.tone}>{cfg.badge.t}</Badge>
      <button type="button" className="text-primary font-extrabold text-sm hover:underline">
        {cfg.action}
      </button>
    </div>
  );
}

export default function FamilyBilling() {
  return (
    <div className="p-8 space-y-6">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Billing & Invoices</h2>
        <p className="text-on-surface-variant font-medium">Payments, invoices, and receipts (demo)</p>
      </section>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-sm text-on-surface-variant">
          2 unpaid invoices · Total outstanding: <span className="font-extrabold text-on-surface">$324.00</span>
        </div>
        <button type="button" className="px-4 py-2 rounded-xl bg-primary text-white font-extrabold">
          Pay all outstanding ($324.00)
        </button>
      </div>

      <Card className="overflow-hidden">
        <div className="px-5 py-4 bg-surface-container-low">
          <div className="text-sm font-extrabold text-on-surface">Invoices</div>
        </div>
        {INVOICES.map((i) => (
          <InvoiceRow key={i.num} {...i} />
        ))}
      </Card>
    </div>
  );
}
