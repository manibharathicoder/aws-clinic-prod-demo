import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

export default function SuperAdminClients() {
  const clients = [
    {
      id: 'C-001',
      child: 'Lucas Miller',
      family: 'Miller Family',
      location: 'Brampton',
      status: { t: 'Active', tone: 'teal' },
      lastSession: 'Apr 18, 2026',
      nextSession: 'Apr 22, 2026 · 2:30 PM',
    },
    {
      id: 'C-002',
      child: 'Emma Wilson',
      family: 'Wilson Family',
      location: 'Mississauga',
      status: { t: 'Intake', tone: 'amber' },
      lastSession: '—',
      nextSession: 'Apr 23, 2026 · 11:00 AM',
    },
    {
      id: 'C-003',
      child: 'Tommy Brown',
      family: 'Brown Family',
      location: 'Virtual',
      status: { t: 'On Hold', tone: 'violet' },
      lastSession: 'Mar 28, 2026',
      nextSession: '—',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">All Clients</h2>
        <p className="text-sm text-on-surface-variant">Prototype workflow: client profiles, intake, documents.</p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[920px] w-full text-sm">
            <thead className="bg-surface-container-low">
              <tr className="text-left text-on-surface-variant">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest">Client</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest">Family</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest">Location</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest">Status</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest">Last Session</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest">Next Session</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-t border-outline-variant/20">
                  <td className="px-5 py-4">
                    <div className="font-extrabold text-on-surface">{c.child}</div>
                    <div className="text-[11px] text-on-surface-variant">{c.id}</div>
                  </td>
                  <td className="px-5 py-4 text-on-surface">{c.family}</td>
                  <td className="px-5 py-4 text-on-surface">{c.location}</td>
                  <td className="px-5 py-4">
                    <Badge tone={c.status.tone}>{c.status.t}</Badge>
                  </td>
                  <td className="px-5 py-4 text-on-surface">{c.lastSession}</td>
                  <td className="px-5 py-4 text-on-surface">{c.nextSession}</td>
                  <td className="px-5 py-4">
                    <button type="button" className="text-primary font-bold text-xs hover:underline">
                      View Profile
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
