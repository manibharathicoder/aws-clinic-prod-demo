import { useMemo, useState } from 'react';
import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

const ROWS = [
  {
    id: 'Client #A12',
    note: '[Name protected — click to view]',
    services: [
      { t: 'ABA', tone: 'violet' },
      { t: 'Speech', tone: 'teal' },
    ],
    therapist: 'Dr. Priya Mehta',
    location: 'Brampton',
    group: 'Brampton',
    status: { t: 'Active', tone: 'teal' },
    actions: 'View · Schedule',
  },
  {
    id: 'Client #B07',
    note: '',
    services: [{ t: 'ABA', tone: 'violet' }],
    therapist: 'Daniel Park',
    location: 'Mississauga',
    group: 'Mississauga',
    status: { t: 'Active', tone: 'teal' },
    actions: 'View · Schedule',
  },
  {
    id: 'Client #C14',
    note: '',
    services: [{ t: 'OT', tone: 'amber' }],
    therapist: 'Sara Nguyen',
    location: 'Brampton',
    group: 'Custom',
    status: { t: 'Intake', tone: 'amber' },
    actions: 'View · Book intake',
  },
  {
    id: 'Client #D03',
    note: '',
    services: [{ t: 'Speech', tone: 'teal' }],
    therapist: 'James Okafor',
    location: 'Virtual',
    group: 'Mississauga',
    status: { t: 'Active', tone: 'teal' },
    actions: 'View · Schedule',
  },
  {
    id: 'Client #E21',
    note: '',
    services: [
      { t: 'ABA', tone: 'violet' },
      { t: 'OT', tone: 'amber' },
    ],
    therapist: 'Dr. Priya Mehta',
    location: 'In-home',
    group: 'Brampton',
    status: { t: 'Outstanding $2,800', tone: 'amber' },
    actions: 'View · Flag',
  },
];

export default function AdminClients() {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return ROWS;
    return ROWS.filter((r) => `${r.id} ${r.therapist} ${r.location}`.toLowerCase().includes(query));
  }, [q]);

  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Clients</h2>
        <p className="text-on-surface-variant font-medium">Active caseload and intake statuses (demo)</p>
      </section>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full sm:w-[320px] px-4 py-3 rounded-xl bg-white border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
          placeholder="Search clients by name or ID…"
        />
        <button type="button" className="px-4 py-2 rounded-xl bg-primary text-white font-extrabold text-sm">
          + Add client
        </button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[1020px] w-full text-sm">
            <thead className="text-left text-xs font-bold uppercase tracking-widest text-on-surface-variant bg-surface-container-low">
              <tr>
                <th className="px-5 py-4">Client</th>
                <th className="px-5 py-4">Services</th>
                <th className="px-5 py-4">Primary therapist</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Price group</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-outline-variant/20">
                  <td className="px-5 py-4">
                    <div className="font-extrabold text-on-surface">{r.id}</div>
                    {r.note ? <div className="text-xs text-on-surface-variant">{r.note}</div> : null}
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
                  <td className="px-5 py-4 text-on-surface">{r.therapist}</td>
                  <td className="px-5 py-4 text-on-surface">{r.location}</td>
                  <td className="px-5 py-4">
                    <Badge tone="gray">{r.group}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={r.status.tone}>{r.status.t}</Badge>
                  </td>
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

