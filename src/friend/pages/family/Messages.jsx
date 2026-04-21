import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

const THREADS = [
  { name: 'Clinic Billing', desc: 'Invoice reminder and payment questions', activity: 'New', tone: 'amber' },
  { name: 'Dr. Priya Mehta', desc: 'Next session planning', activity: 'Active', tone: 'teal' },
  { name: 'Front Desk', desc: 'Reschedule request', activity: 'Waiting', tone: 'violet' },
];

export default function FamilyMessages() {
  return (
    <div className="p-8 space-y-6">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Messages</h2>
        <p className="text-on-surface-variant font-medium">Secure chat threads (demo)</p>
      </section>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-extrabold text-on-surface">Channels</div>
          <button type="button" className="px-4 py-2 rounded-xl bg-primary text-white font-extrabold text-sm">
            New message
          </button>
        </div>
        <div className="divide-y divide-outline-variant/20">
          {THREADS.map((t) => (
            <button
              key={t.name}
              type="button"
              className="w-full text-left flex items-center gap-3 py-4 hover:bg-surface-container-low rounded-xl px-3 -mx-3 transition-colors"
            >
              <div className="text-on-surface">💬</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-extrabold text-on-surface truncate">{t.name}</div>
                <div className="text-xs text-on-surface-variant truncate">{t.desc}</div>
              </div>
              <Badge tone={t.tone}>{t.activity}</Badge>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

