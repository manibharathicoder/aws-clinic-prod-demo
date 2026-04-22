import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

const ROWS = [
  { date: 'Mar 16 · 9AM', client: 'Client #A12', service: { t: 'ABA', tone: 'violet' }, loc: 'Brampton', status: { t: 'Completed', tone: 'teal' }, notes: 'Write notes →' },
  { date: 'Mar 16 · 11AM', client: 'Client #C14', service: { t: 'Supervision', tone: 'amber' }, loc: 'Brampton', status: { t: 'Completed', tone: 'teal' }, notes: 'Write notes →' },
  { date: 'Mar 18 · 10AM', client: 'Client #A12', service: { t: 'ABA', tone: 'violet' }, loc: 'Brampton', status: { t: 'Scheduled', tone: 'teal' }, notes: 'After session' },
  { date: 'Mar 14 · 9AM', client: 'Client #B07', service: { t: 'ABA', tone: 'violet' }, loc: 'Virtual', status: { t: 'Notes pending', tone: 'amber' }, notes: 'Write now →' },
];

export default function TherapistSessions() {
  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Sessions</h2>
        <p className="text-on-surface-variant font-medium">Write notes and mark complete (demo)</p>
      </section>

      <Card className="overflow-hidden">
        <div className="px-5 py-4 bg-surface-container-low">
          <div className="text-sm font-extrabold text-on-surface">Session list</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="text-left text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              <tr>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Client</th>
                <th className="px-5 py-4">Service</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Notes</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={`${r.date}-${r.client}`} className="border-t border-outline-variant/20">
                  <td className="px-5 py-4 font-extrabold text-on-surface">{r.date}</td>
                  <td className="px-5 py-4 text-on-surface">{r.client}</td>
                  <td className="px-5 py-4">
                    <Badge tone={r.service.tone}>{r.service.t}</Badge>
                  </td>
                  <td className="px-5 py-4 text-on-surface">{r.loc}</td>
                  <td className="px-5 py-4">
                    <Badge tone={r.status.tone}>{r.status.t}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    {r.notes.includes('→') ? (
                      <button type="button" className="text-primary font-bold text-xs hover:underline">
                        {r.notes}
                      </button>
                    ) : (
                      <span className="text-xs text-on-surface-variant">{r.notes}</span>
                    )}
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

