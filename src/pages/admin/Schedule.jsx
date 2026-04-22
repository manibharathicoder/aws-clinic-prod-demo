import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

const WEEK = 'Mar 16 – Mar 22, 2026';

const FILTERS = [
  { t: 'Brampton', tone: 'teal' },
  { t: 'Mississauga', tone: 'teal' },
  { t: 'In-home', tone: 'amber' },
  { t: 'Virtual', tone: 'violet' },
];

const ROWS = [
  ['Mon 9:00AM', 'Client #A12', { t: 'ABA', tone: 'violet' }, 'Dr. Priya Mehta', 'Brampton · Rm A', { t: 'Completed', tone: 'teal' }, 'View notes'],
  ['Mon 10:00AM', 'Client #C14', { t: 'OT', tone: 'amber' }, 'Sara Nguyen', 'Brampton · Rm B', { t: 'Completed', tone: 'teal' }, 'View notes'],
  ['Tue 9:00AM', 'Client #B07', { t: 'ABA', tone: 'violet' }, 'Daniel Park', 'Mississauga', { t: 'Scheduled', tone: 'teal' }, 'Edit / Cancel'],
  ['Tue 11:00AM', 'Client #D03', { t: 'Speech', tone: 'teal' }, 'James Okafor', 'Virtual', { t: 'Scheduled', tone: 'teal' }, 'Edit / Cancel'],
  ['Wed 10:00AM', 'Client #A12', { t: 'ABA', tone: 'violet' }, 'James Okafor (Covered)', 'Brampton · Rm A', { t: 'Scheduled', tone: 'teal' }, 'View chain'],
  ['Thu 2:00PM', 'Client #E21', { t: 'ABA', tone: 'violet' }, 'Dr. Priya Mehta', 'In-home', { t: 'No Show', tone: 'amber' }, 'View charge'],
];

export default function AdminSchedule() {
  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Scheduling</h2>
        <p className="text-on-surface-variant font-medium">Weekly operations calendar (demo)</p>
      </section>

      <section className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="text-xs font-bold px-3 py-2 rounded-xl bg-white border border-outline-variant/30">
            ‹ Prev week
          </button>
          <div className="px-4 py-2 rounded-xl bg-white border border-outline-variant/30 text-sm font-extrabold text-on-surface">
            {WEEK}
          </div>
          <button type="button" className="text-xs font-bold px-3 py-2 rounded-xl bg-white border border-outline-variant/30">
            Next week ›
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="text-xs font-bold text-on-surface-variant mr-1">Filter:</div>
          {FILTERS.map((f) => (
            <Badge key={f.t} tone={f.tone}>
              {f.t}
            </Badge>
          ))}
          <button type="button" className="ml-auto px-4 py-2 rounded-xl bg-primary text-white font-extrabold text-sm">
            + Book session
          </button>
        </div>
      </section>

      <Card className="overflow-hidden">
        <div className="px-5 py-4 bg-surface-container-low flex items-center justify-between">
          <div className="text-sm font-extrabold text-on-surface">Weekly schedule</div>
          <div className="text-xs text-on-surface-variant">Demo data · client names visible to Admin</div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[980px] w-full text-sm">
            <thead className="text-left text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              <tr>
                <th className="px-5 py-4">Slot</th>
                <th className="px-5 py-4">Client</th>
                <th className="px-5 py-4">Service</th>
                <th className="px-5 py-4">Therapist</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r[0]} className="border-t border-outline-variant/20">
                  <td className="px-5 py-4 text-on-surface font-extrabold">{r[0]}</td>
                  <td className="px-5 py-4 text-on-surface">{r[1]}</td>
                  <td className="px-5 py-4">
                    <Badge tone={r[2].tone}>{r[2].t}</Badge>
                  </td>
                  <td className="px-5 py-4 text-on-surface">{r[3]}</td>
                  <td className="px-5 py-4 text-on-surface">{r[4]}</td>
                  <td className="px-5 py-4">
                    <Badge tone={r[5].tone}>{r[5].t}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <button type="button" className="text-primary font-bold text-xs hover:underline">
                      {r[6]}
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

