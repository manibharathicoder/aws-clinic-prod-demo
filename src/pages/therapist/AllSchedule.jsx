import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

const GRID = [
  {
    t: 'Dr. Priya Mehta (you)',
    slots: {
      '9AM': { t: 'ABA session', tone: 'violet' },
      '10AM': null,
      '11AM': { t: 'Supervision', tone: 'amber' },
      '2PM': null,
      '3PM': null,
    },
  },
  {
    t: 'James Okafor',
    slots: {
      '9AM': { t: 'Free ✓', tone: 'teal' },
      '10AM': { t: 'Speech', tone: 'teal' },
      '11AM': { t: 'Free ✓', tone: 'teal' },
      '2PM': { t: 'Speech', tone: 'teal' },
      '3PM': { t: 'Free ✓', tone: 'teal' },
    },
  },
  {
    t: 'Sara Nguyen',
    slots: {
      '9AM': { t: 'OT', tone: 'amber' },
      '10AM': { t: 'Free ✓', tone: 'teal' },
      '11AM': { t: 'OT', tone: 'amber' },
      '2PM': null,
      '3PM': { t: 'Free ✓', tone: 'teal' },
    },
  },
  {
    t: 'Daniel Park',
    slots: {
      '9AM': { t: 'ABA', tone: 'violet' },
      '10AM': { t: 'ABA', tone: 'violet' },
      '11AM': { t: 'Free ✓', tone: 'teal' },
      '2PM': { t: 'ABA', tone: 'violet' },
      '3PM': { t: 'Free ✓', tone: 'teal' },
    },
  },
];

const COLS = ['9AM', '10AM', '11AM', '2PM', '3PM'];

export default function TherapistAllSchedule() {
  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">All Therapists</h2>
        <p className="text-on-surface-variant font-medium">Availability view for cover (demo)</p>
      </section>

      <div className="rounded-2xl border border-[#B2DFDB] bg-[#E8F5F0] p-4">
        <div className="text-sm font-extrabold text-[#00796B]">Privacy notice</div>
        <div className="text-xs text-[#00796B]/80 mt-1">
          You can see therapist availability to find cover. Client names on other therapists&apos; sessions are hidden.
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="px-5 py-4 bg-surface-container-low">
          <div className="text-sm font-extrabold text-on-surface">All therapists — Mar 16 availability</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="text-left text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              <tr>
                <th className="px-5 py-4">Therapist</th>
                {COLS.map((c) => (
                  <th key={c} className="px-5 py-4">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GRID.map((r) => (
                <tr key={r.t} className="border-t border-outline-variant/20">
                  <td className="px-5 py-4 font-extrabold text-on-surface">{r.t}</td>
                  {COLS.map((c) => (
                    <td key={c} className="px-5 py-4">
                      {r.slots[c] ? <Badge tone={r.slots[c].tone}>{r.slots[c].t}</Badge> : <span className="text-on-surface-variant">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

