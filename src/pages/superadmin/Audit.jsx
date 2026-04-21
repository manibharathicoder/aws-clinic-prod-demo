import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const ROWS = [
  { action: 'Login', who: 'owner@aimtherapy.ca', when: 'Today', tone: 'teal' },
  { action: 'Role updated', who: 'sarah@aimtherapy.ca', when: 'Mar 15', tone: 'amber' },
  { action: 'Permission override request', who: 'priya@aimtherapy.ca', when: 'Mar 14', tone: 'violet' },
];

export default function SuperAdminAudit() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">Audit Log</h2>
        <p className="text-sm text-on-surface-variant">From prototype: security + compliance events.</p>
      </div>

      <Card className="p-6 overflow-x-auto">
        <table className="min-w-[700px] w-full text-sm">
          <thead className="text-left">
            <tr className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              <th className="py-3 pr-3">Event</th>
              <th className="py-3 pr-3">User</th>
              <th className="py-3 pr-3">When</th>
              <th className="py-3 pr-3">Type</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, idx) => (
              <tr key={idx} className="border-t border-outline-variant/20">
                <td className="py-3 pr-3 font-bold text-on-surface">{r.action}</td>
                <td className="py-3 pr-3 text-on-surface">{r.who}</td>
                <td className="py-3 pr-3 text-on-surface">{r.when}</td>
                <td className="py-3 pr-3">
                  <Badge tone={r.tone}>System</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

