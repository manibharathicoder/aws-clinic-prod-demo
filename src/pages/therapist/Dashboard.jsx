import Card from '../../components/ui/Card.jsx';
import { Link } from 'react-router-dom';

export default function TherapistDashboard() {
  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Therapist Dashboard</h2>
        <p className="text-on-surface-variant font-medium">Schedule, notes, and tasks (demo)</p>
      </section>

      <div className="rounded-2xl border border-[#F6E05E]/40 bg-[#FFF8E7] p-4">
        <div className="text-sm font-extrabold text-[#8A5A00]">Pay statement ready</div>
        <div className="text-xs text-[#8A5A00]/80 mt-1">
          Pay statement for Mar 1–15 is ready for review. Deadline: <span className="font-bold">Mar 17</span>. Go to{' '}
          <Link className="text-primary font-extrabold hover:underline" to="/therapist/paystatement">
            Pay Statement
          </Link>
          .
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Sessions this week</div>
          <div className="mt-2 text-3xl font-extrabold text-primary">5</div>
          <div className="mt-1 text-xs text-on-surface-variant">Mon–Fri</div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Sessions today</div>
          <div className="mt-2 text-3xl font-extrabold text-secondary">2</div>
          <div className="mt-1 text-xs text-on-surface-variant">9AM and 11AM</div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Cover request</div>
          <div className="mt-2 text-3xl font-extrabold text-tertiary">1</div>
          <div className="mt-1 text-xs text-on-surface-variant">Needs your reply</div>
        </Card>
        <Card className="p-6 border border-error/10 bg-error-container/20">
          <div className="text-xs font-bold uppercase tracking-widest text-on-error-container">Deadline</div>
          <div className="mt-2 text-3xl font-extrabold text-error">48hr</div>
          <div className="mt-1 text-xs text-on-surface-variant">Review by Mar 17</div>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="text-sm font-extrabold text-on-surface mb-4">Today&apos;s sessions</div>
          {[
            ['9:00 AM', 'Client #A12 · ABA Therapy', 'Brampton · Rm A', 'Completed'],
            ['11:00 AM', 'Client #B07 · ABA Therapy', 'Brampton · Rm B', 'Scheduled'],
          ].map(([t, s, r, st]) => (
            <div key={t} className="py-3 border-b border-outline-variant/20 last:border-b-0">
              <div className="flex items-center justify-between">
                <div className="font-extrabold text-on-surface">{t}</div>
                <div className="text-xs font-bold text-on-surface-variant">{st}</div>
              </div>
              <div className="text-sm text-on-surface-variant">{s}</div>
              <div className="text-xs text-on-surface-variant mt-1">{r}</div>
            </div>
          ))}
        </Card>

        <Card className="p-6">
          <div className="text-sm font-extrabold text-on-surface mb-4">This week</div>
          {[
            ['Mon', 'ABA Therapy · Client #A12', 'Completed'],
            ['Tue', 'ABA — Supervision · Client #C14', 'Completed'],
            ['Wed', 'ABA Therapy · Client #A12', 'Scheduled'],
            ['Thu', 'ABA Therapy · Client #B07', 'Scheduled'],
            ['Fri', 'ABA Therapy · Client #E21', 'Scheduled'],
          ].map(([d, s, st]) => (
            <div key={d} className="py-3 border-b border-outline-variant/20 last:border-b-0">
              <div className="flex items-center justify-between">
                <div className="font-extrabold text-on-surface">{d}</div>
                <div className="text-xs font-bold text-on-surface-variant">{st}</div>
              </div>
              <div className="text-sm text-on-surface-variant">{s}</div>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}
