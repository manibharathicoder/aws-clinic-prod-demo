import Card from '../../components/ui/Card.jsx';

export default function SuperAdminAnalytics() {
  const kpis = [
    { title: 'Attendance Rate', value: '94.2%', sub: 'Last 30 days', tone: 'primary' },
    { title: 'Therapist Utilization', value: '87%', sub: 'Across locations', tone: 'amber' },
    { title: 'Outstanding Invoices', value: '$3,420', sub: '4 overdue', tone: 'error' },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">Analytics</h2>
        <p className="text-sm text-on-surface-variant">
          From prototype: attendance, utilization, revenue, location comparison.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {kpis.map((k) => (
          <Card key={k.title} className="p-6">
            <div className="text-sm font-extrabold text-on-surface">{k.title}</div>
            <div
              className={[
                'mt-3 text-3xl font-extrabold tracking-tight',
                k.tone === 'primary'
                  ? 'text-primary'
                  : k.tone === 'amber'
                    ? 'text-tertiary'
                    : k.tone === 'error'
                      ? 'text-error'
                      : 'text-on-surface',
              ].join(' ')}
            >
              {k.value}
            </div>
            <div className="mt-2 text-xs text-on-surface-variant font-medium">{k.sub}</div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="text-sm font-extrabold text-on-surface">Reports (Demo)</div>
          <button type="button" className="text-xs font-bold text-primary hover:underline">
            Export CSV
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Revenue summary', kind: 'Financial', lastRun: 'Apr 21, 2026' },
            { name: 'Outstanding invoices (aging)', kind: 'Financial', lastRun: 'Apr 20, 2026' },
            { name: 'Session attendance', kind: 'Clinical', lastRun: 'Apr 19, 2026' },
          ].map((r) => (
            <div
              key={r.name}
              className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4"
            >
              <div className="text-sm font-extrabold text-on-surface">{r.name}</div>
              <div className="mt-1 text-[11px] text-on-surface-variant">
                Type: <span className="font-bold text-on-surface">{r.kind}</span>
              </div>
              <div className="mt-1 text-[11px] text-on-surface-variant">
                Last run: <span className="font-bold text-on-surface">{r.lastRun}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button type="button" className="px-3 py-2 rounded-lg bg-primary text-white text-xs font-bold">
                  Run
                </button>
                <button
                  type="button"
                  className="px-3 py-2 rounded-lg bg-surface-container text-on-surface-variant text-xs font-bold"
                >
                  Export PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
