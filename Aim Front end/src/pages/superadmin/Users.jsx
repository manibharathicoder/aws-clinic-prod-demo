import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

const USERS = [
  {
    name: 'You (Consultant)',
    email: 'you@email.com',
    roles: [{ t: 'Super Admin', tone: 'violet' }],
    location: 'All',
    lastLogin: 'Today',
    status: { t: 'Active', tone: 'teal' },
  },
  {
    name: 'Clinic Owner',
    email: 'owner@aimtherapy.ca',
    roles: [{ t: 'Super Admin', tone: 'violet' }],
    location: 'All',
    lastLogin: 'Mar 14',
    status: { t: 'Active', tone: 'teal' },
  },
  {
    name: 'Sarah Ahmed',
    email: 'sarah@aimtherapy.ca',
    roles: [
      { t: 'Admin', tone: 'blue' },
      { t: 'Accounting', tone: 'amber' },
    ],
    location: 'Brampton',
    lastLogin: 'Today',
    status: { t: 'Active', tone: 'teal' },
  },
  {
    name: 'Dr. Priya Mehta',
    email: 'priya@aimtherapy.ca',
    roles: [{ t: 'Therapist', tone: 'teal' }],
    location: 'Brampton',
    lastLogin: 'Mar 15',
    status: { t: 'Active', tone: 'teal' },
  },
  {
    name: 'James Okafor',
    email: 'james@aimtherapy.ca',
    roles: [{ t: 'Therapist', tone: 'teal' }],
    location: 'Mississauga',
    lastLogin: 'Mar 15',
    status: { t: 'Active', tone: 'teal' },
  },
  {
    name: 'New Staff Member',
    email: 'new@aimtherapy.ca',
    roles: [{ t: 'Therapist', tone: 'teal' }],
    location: 'Brampton',
    lastLogin: 'Never',
    status: { t: 'Invite sent', tone: 'amber' },
  },
];

export default function SuperAdminUsers() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-sm text-on-surface-variant">
          Showing <span className="font-bold text-on-surface">12</span> of 50 users ·{' '}
          <span className="text-primary font-bold">5 portals · 5 roles</span>
        </div>
        <button type="button" className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-sm">
          + Add user
        </button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-surface-container-low">
              <tr className="text-left text-on-surface-variant">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest">User</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest">Role(s)</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest">Location</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest">Last login</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest">Status</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((u) => (
                <tr key={u.email} className="border-t border-outline-variant/20">
                  <td className="px-5 py-4">
                    <div className="font-extrabold text-on-surface">{u.name}</div>
                    <div className="text-[11px] text-on-surface-variant">{u.email}</div>
                  </td>
                  <td className="px-5 py-4 space-x-1">
                    {u.roles.map((r) => (
                      <Badge key={r.t} tone={r.tone}>
                        {r.t}
                      </Badge>
                    ))}
                  </td>
                  <td className="px-5 py-4 text-on-surface">{u.location}</td>
                  <td className="px-5 py-4 text-on-surface">{u.lastLogin}</td>
                  <td className="px-5 py-4">
                    <Badge tone={u.status.tone}>{u.status.t}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <button type="button" className="text-primary font-bold text-xs hover:underline">
                      Edit
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

