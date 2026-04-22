import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';
import { Link } from 'react-router-dom';

const TODAY = [
  {
    time: '9:00 AM',
    service: 'ABA Therapy',
    client: 'Client #A12',
    therapist: 'Dr. Priya Mehta',
    location: 'Brampton · Rm A',
    status: { t: 'Completed', tone: 'teal' },
  },
  {
    time: '10:00 AM',
    service: 'OT Therapy',
    client: 'Client #C14',
    therapist: 'Sara Nguyen',
    location: 'Brampton · Rm B',
    status: { t: 'In progress', tone: 'amber' },
  },
  {
    time: '11:00 AM',
    service: 'Speech Therapy',
    client: 'Client #D03',
    therapist: 'James Okafor',
    location: 'Virtual',
    status: { t: 'Scheduled', tone: 'teal' },
  },
  {
    time: '2:00 PM',
    service: 'ABA Therapy',
    client: 'Client #E21',
    therapist: 'Daniel Park',
    location: 'In-home',
    status: { t: 'No show', tone: 'amber' },
  },
  {
    time: '3:00 PM',
    service: 'ABA Therapy',
    client: 'Client #B07',
    therapist: 'Dr. Priya Mehta',
    location: 'Brampton · Rm A',
    status: { t: 'Scheduled', tone: 'teal' },
  },
];

const ACTIONS = [
  { t: 'Invoice review — 6 clients pending (due today)', tone: 'amber', link: '/admin/actions', a: 'Review →' },
  { t: 'Reschedule request — Client #A12 (Mar 18 session)', tone: 'teal', link: '/admin/actions', a: 'Approve →' },
  { t: 'Session unmarked — Dr. Priya Mehta · Mar 14', tone: 'amber', link: '/admin/actions', a: 'Chase →' },
  { t: 'New intake — ABA + Speech · $350 paid · needs review', tone: 'teal', link: '/admin/intake', a: 'Review →' },
  { t: 'Cover request pending admin approval — Dr. Priya → James', tone: 'amber', link: '/admin/actions', a: 'Approve →' },
];

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Admin Dashboard</h2>
        <p className="text-on-surface-variant font-medium">Operations · Scheduling · Intake (demo)</p>
      </section>

      <div className="rounded-2xl border border-[#F6E05E]/40 bg-[#FFF8E7] p-4">
        <div className="text-sm font-extrabold text-[#8A5A00]">Monday review due today</div>
        <div className="text-xs text-[#8A5A00]/80 mt-1">
          6 client invoices need review before Tuesday 9AM invoice run. Go to <span className="font-bold">Pending Actions</span>.
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Sessions today</div>
          <div className="mt-2 text-3xl font-extrabold text-secondary">12</div>
          <div className="mt-1 text-xs text-on-surface-variant">Brampton + Mississauga</div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Invoices to review</div>
          <div className="mt-2 text-3xl font-extrabold text-tertiary">6</div>
          <div className="mt-1 text-xs text-on-surface-variant">Due today</div>
        </Card>
        <Card className="p-6 border border-error/10 bg-error-container/20">
          <div className="text-xs font-bold uppercase tracking-widest text-on-error-container">Unmarked sessions</div>
          <div className="mt-2 text-3xl font-extrabold text-error">1</div>
          <div className="mt-1 text-xs text-on-surface-variant">Chase therapist</div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">New intake submissions</div>
          <div className="mt-2 text-3xl font-extrabold text-primary">4</div>
          <div className="mt-1 text-xs text-on-surface-variant">All paid</div>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-extrabold text-on-surface">Today&apos;s sessions</div>
            <Link className="text-xs font-bold text-primary hover:underline" to="/admin/schedule">
              View schedule
            </Link>
          </div>
          <div className="divide-y divide-outline-variant/20 border-y border-outline-variant/20">
            {TODAY.map((s) => (
              <div key={`${s.time}-${s.client}`} className="py-3 flex items-start gap-4">
                <div className="w-20 text-xs font-extrabold text-on-surface-variant">{s.time}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-extrabold text-on-surface truncate">{s.service}</div>
                  <div className="text-xs text-on-surface-variant">
                    {s.client} · {s.therapist} · {s.location}
                  </div>
                </div>
                <Badge tone={s.status.tone}>{s.status.t}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 overflow-hidden">
          <div className="text-sm font-extrabold text-on-surface mb-4">Action items</div>
          <div className="space-y-3">
            {ACTIONS.map((a) => (
              <div
                key={a.t}
                className="p-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest flex items-start justify-between gap-3"
              >
                <div className="text-sm text-on-surface">{a.t}</div>
                <a className="text-xs font-bold text-primary hover:underline" href={a.link}>
                  {a.a}
                </a>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
