import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

const PIPELINE = [
  {
    family: 'Johnson family',
    child: 'Child: Liam, 5yrs',
    services: [
      { t: 'ABA', tone: 'violet' },
      { t: 'Speech', tone: 'teal' },
    ],
    paid: '$350',
    status: { t: 'Invite not opened', tone: 'amber' },
    next: 'Resend portal invite',
    actions: 'Resend · View',
  },
  {
    family: 'Patel family',
    child: 'Child: Aanya, 7yrs',
    services: [{ t: 'OT', tone: 'amber' }],
    paid: '$275',
    status: { t: 'Intake scheduled', tone: 'teal' },
    next: 'Part 1 — Mar 20 virtual',
    actions: 'View · Reschedule',
  },
  {
    family: 'Chen family',
    child: 'Child: Dylan, 6yrs',
    services: [
      { t: 'ABA', tone: 'violet' },
      { t: 'Speech', tone: 'teal' },
      { t: 'OT', tone: 'amber' },
    ],
    paid: '$550',
    status: { t: 'New — needs review', tone: 'amber' },
    next: 'Assign therapist + book',
    actions: 'Review →',
  },
  {
    family: 'Rahman family',
    child: 'Child: Zara, 4yrs',
    services: [{ t: 'ABA', tone: 'violet' }],
    paid: '$275',
    status: { t: 'Active client', tone: 'teal' },
    next: 'Regular sessions booked',
    actions: 'View profile',
  },
];

export default function AdminIntake() {
  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Intake Pipeline</h2>
        <p className="text-on-surface-variant font-medium">Paid submissions, activation, scheduling (demo)</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          ['New submissions', '4', 'text-tertiary', 'All paid'],
          ['Intake in progress', '2', 'text-secondary', 'Awaiting assessment'],
          ['Pending activation', '1', 'text-error', 'Invite not opened'],
          ['Active clients', '47', 'text-primary', '↑ 4 this month'],
        ].map(([k, v, c, d]) => (
          <Card key={k} className="p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{k}</div>
            <div className={`mt-2 text-3xl font-extrabold ${c}`}>{v}</div>
            <div className="mt-1 text-xs text-on-surface-variant">{d}</div>
          </Card>
        ))}
      </section>

      <Card className="overflow-hidden">
        <div className="px-5 py-4 bg-surface-container-low flex items-center justify-between">
          <div className="text-sm font-extrabold text-on-surface">Intake pipeline</div>
          <button type="button" className="px-4 py-2 rounded-xl bg-primary text-white font-extrabold text-sm">
            + Manual entry
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[980px] w-full text-sm">
            <thead className="text-left text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              <tr>
                <th className="px-5 py-4">Family</th>
                <th className="px-5 py-4">Services</th>
                <th className="px-5 py-4">Paid</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Next step</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {PIPELINE.map((r) => (
                <tr key={r.family} className="border-t border-outline-variant/20">
                  <td className="px-5 py-4">
                    <div className="font-extrabold text-on-surface">{r.family}</div>
                    <div className="text-xs text-on-surface-variant">{r.child}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      {r.services.map((s) => (
                        <Badge key={s.t} tone={s.tone}>
                          {s.t}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone="teal">{r.paid}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={r.status.tone}>{r.status.t}</Badge>
                  </td>
                  <td className="px-5 py-4 text-on-surface">{r.next}</td>
                  <td className="px-5 py-4">
                    <button type="button" className="text-primary font-bold text-xs hover:underline">
                      {r.actions}
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

