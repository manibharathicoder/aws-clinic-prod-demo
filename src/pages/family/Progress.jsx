import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const NOTES = [
  { date: 'Apr 18, 2026', therapist: 'Dr. Priya Mehta', title: 'Session summary', tag: { t: 'Shared', tone: 'teal' } },
  { date: 'Apr 14, 2026', therapist: 'Dr. Priya Mehta', title: 'Goal progress update', tag: { t: 'Shared', tone: 'teal' } },
  { date: 'Apr 10, 2026', therapist: 'Clinic', title: 'Home practice plan', tag: { t: 'Document', tone: 'amber' } },
];

export default function FamilyProgress() {
  return (
    <div className="p-8 space-y-6">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Progress & Notes</h2>
        <p className="text-on-surface-variant font-medium">Therapy progress and shared notes (demo)</p>
      </section>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-extrabold text-on-surface">Recent notes</div>
          <button type="button" className="text-primary font-extrabold text-sm hover:underline">
            View all
          </button>
        </div>

        <div className="divide-y divide-outline-variant/20">
          {NOTES.map((n) => (
            <div key={`${n.date}-${n.title}`} className="py-4 flex items-start gap-3">
              <div className="mt-0.5 text-on-surface">📋</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-extrabold text-on-surface truncate">{n.title}</div>
                <div className="text-xs text-on-surface-variant">
                  {n.date} · {n.therapist}
                </div>
              </div>
              <Badge tone={n.tag.tone}>{n.tag.t}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

