import { useState } from 'react';

function SessionCard({ type, dt, loc, status }) {
  const cfg = {
    upcoming: { bg: '#E8F5F0', border: '#B2DFDB', btn: 'Reschedule', title: '#1A202C' },
    completed: { bg: '#F7FAFC', border: '#E2E8F0', btn: 'View notes', title: '#1A202C' },
    cancelled: { bg: '#FFF5F5', border: '#FEB2B2', btn: 'View charge', title: '#C53030' },
  }[status];

  return (
    <div
      className="rounded-2xl p-5 border"
      style={{ background: cfg.bg, borderColor: cfg.border }}
    >
      <div className="flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-extrabold truncate" style={{ color: cfg.title }}>
            {type}
          </div>
          <div className="text-xs text-on-surface-variant mt-1">{dt}</div>
          <div className="text-xs text-on-surface-variant">{loc}</div>
        </div>
        <button
          type="button"
          className="px-4 py-2 rounded-xl bg-white border border-outline-variant/30 text-on-surface font-bold text-sm"
        >
          {cfg.btn}
        </button>
      </div>
    </div>
  );
}

export default function FamilySessions() {
  const [tab, setTab] = useState('upcoming');

  const sessions = [
    { type: 'ABA Therapy', dt: 'Tue Apr 21 · 10:00–11:00 AM', loc: 'Brampton · Dr. Priya Mehta', status: 'upcoming' },
    { type: 'Speech Therapy', dt: 'Thu Apr 23 · 2:00–2:45 PM', loc: 'Virtual · James Okafor', status: 'upcoming' },
    { type: 'ABA Therapy', dt: 'Tue Apr 28 · 10:00–11:00 AM', loc: 'Brampton · Dr. Priya Mehta', status: 'upcoming' },
    { type: 'ABA Therapy', dt: 'Tue Apr 14 · 10:00–11:00 AM', loc: 'Brampton · Dr. Priya Mehta', status: 'completed' },
    { type: 'OT Therapy', dt: 'Wed Apr 15 · 11:00–12:00 PM', loc: 'Brampton · Sara Nguyen', status: 'cancelled' },
  ];

  const visible = sessions.filter((s) => (tab === 'upcoming' ? s.status === 'upcoming' : s.status !== 'upcoming'));

  return (
    <div className="p-8 space-y-6">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Sessions</h2>
        <p className="text-on-surface-variant font-medium">Upcoming and past sessions (demo)</p>
      </section>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setTab('upcoming')}
          className={[
            'px-4 py-2 rounded-xl text-sm font-extrabold border transition-colors',
            tab === 'upcoming'
              ? 'bg-primary text-white border-transparent'
              : 'bg-white text-on-surface border-outline-variant/30',
          ].join(' ')}
        >
          Upcoming
        </button>
        <button
          type="button"
          onClick={() => setTab('past')}
          className={[
            'px-4 py-2 rounded-xl text-sm font-extrabold border transition-colors',
            tab === 'past' ? 'bg-primary text-white border-transparent' : 'bg-white text-on-surface border-outline-variant/30',
          ].join(' ')}
        >
          Past sessions
        </button>
      </div>

      <div className="space-y-3">
        {visible.map((s, idx) => (
          <SessionCard key={`${s.dt}-${idx}`} {...s} />
        ))}
      </div>
    </div>
  );
}

