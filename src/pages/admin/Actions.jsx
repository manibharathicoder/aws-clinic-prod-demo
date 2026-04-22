import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

const INVOICE_REVIEW = [
  { t: 'Client #A12 — 3 sessions + 15min late pickup · $XX needs adding', tone: 'amber', a: 'Review →' },
  { t: 'Client #B07 — 2 sessions + 1 late cancel · check cancel charge', tone: 'amber', a: 'Review →' },
  { t: 'Client #C14 — 2 sessions · ready to approve', tone: 'teal', a: 'Approve →' },
  { t: 'Client #D03 — 3 sessions · ready to approve', tone: 'teal', a: 'Approve →' },
];

const RESCHEDULE = [
  { t: 'Client #A12 — rescheduling Mar 18 ABA (personal reason)', tone: 'teal' },
  { t: 'Client #B07 — cancel Mar 19 Speech (travel)', tone: 'teal' },
];

export default function AdminActions() {
  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Pending Actions</h2>
        <p className="text-on-surface-variant font-medium">Invoice reviews, reschedules, cover approvals (demo)</p>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-sm font-extrabold text-on-surface">Invoice review — 6 pending</div>
            <Badge tone="amber">Due today</Badge>
          </div>

          <div className="space-y-3">
            {INVOICE_REVIEW.map((i) => (
              <div
                key={i.t}
                className="p-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest flex items-start justify-between gap-3"
              >
                <div className="text-sm text-on-surface">{i.t}</div>
                <button type="button" className="text-xs font-bold text-primary hover:underline">
                  {i.a}
                </button>
              </div>
            ))}
          </div>

          <button type="button" className="mt-4 w-full px-4 py-3 rounded-xl bg-primary text-white font-extrabold text-sm">
            Approve all ready →
          </button>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="text-sm font-extrabold text-on-surface mb-4">Reschedule requests</div>
            <div className="space-y-3">
              {RESCHEDULE.map((r) => (
                <div
                  key={r.t}
                  className="p-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest flex items-center justify-between gap-3"
                >
                  <div className="text-sm text-on-surface">{r.t}</div>
                  <div className="flex gap-2">
                    <button type="button" className="text-xs font-extrabold px-3 py-2 rounded-xl bg-primary text-white">
                      Approve
                    </button>
                    <button type="button" className="text-xs font-extrabold px-3 py-2 rounded-xl bg-white border border-outline-variant/30">
                      Deny
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-sm font-extrabold text-on-surface mb-4">Cover approval</div>
            <div className="p-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest flex items-center justify-between gap-3">
              <div className="text-sm text-on-surface">
                Dr. Priya → James Okafor · Mar 18 ABA 10AM · James accepted
              </div>
              <button type="button" className="text-xs font-extrabold px-3 py-2 rounded-xl bg-primary text-white">
                Confirm
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

