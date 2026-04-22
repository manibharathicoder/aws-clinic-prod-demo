import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

const DAYS = [
  { d: 'Mon 16', sub: 'Today', events: [{ t: '9AM', label: 'ABA - A12', tone: 'violet' }, { t: '11AM', label: 'Supervision', tone: 'amber' }] },
  { d: 'Tue 17', sub: '', events: [] },
  { d: 'Wed 18', sub: '', events: [{ t: '10AM', label: 'ABA - A12', tone: 'violet' }] },
  { d: 'Thu 19', sub: '', events: [{ t: '9AM', label: 'ABA - B07 (virtual)', tone: 'teal' }] },
  { d: 'Fri 20', sub: '', events: [{ t: '2PM', label: 'ABA - E21 (in-home)', tone: 'violet' }] },
  { d: 'Sat 21', sub: '', events: [] },
  { d: 'Sun 22', sub: '', events: [] },
];

export default function TherapistSchedule() {
  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">My Schedule</h2>
        <p className="text-on-surface-variant font-medium">Week of Mar 16–22, 2026 (demo)</p>
      </section>

      <div className="flex gap-2">
        <button type="button" className="text-xs font-bold px-4 py-2 rounded-xl bg-white border border-outline-variant/30">
          Monthly
        </button>
        <button type="button" className="text-xs font-bold px-4 py-2 rounded-xl bg-primary text-white">
          Weekly
        </button>
      </div>

      <Card className="p-6">
        <div className="text-sm font-extrabold text-on-surface mb-4">Week view — Dr. Priya Mehta</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {DAYS.map((day) => (
            <div
              key={day.d}
              className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 min-h-[140px]"
            >
              <div className="flex items-baseline justify-between">
                <div className="text-xs font-extrabold text-on-surface">{day.d}</div>
                {day.sub ? <div className="text-[10px] font-bold text-primary">{day.sub}</div> : null}
              </div>
              <div className="mt-3 space-y-2">
                {day.events.length ? (
                  day.events.map((e) => (
                    <div key={`${day.d}-${e.t}`} className="flex items-start justify-between gap-2">
                      <div className="text-[10px] font-extrabold text-on-surface-variant">{e.t}</div>
                      <div className="flex-1">
                        <Badge tone={e.tone}>{e.label}</Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-on-surface-variant">—</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

