import Card from '../../components/ui/Card.jsx';

export default function FamilyDashboard() {
  return (
    <div className="p-8 space-y-6">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Family Dashboard</h2>
        <p className="text-on-surface-variant font-medium">Quick view for upcoming sessions and account status (demo)</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-[#B2DFDB] bg-[#E8F5F0] p-6">
          <div className="text-[11px] font-extrabold tracking-widest uppercase text-[#00796B]">Next Session</div>
          <div className="mt-2 text-lg font-extrabold text-on-surface">ABA Therapy</div>
          <div className="mt-1 text-sm text-on-surface-variant">Tuesday Apr 21 · 10:00 AM · Brampton Clinic</div>
          <div className="text-sm text-on-surface-variant">Dr. Priya Mehta · Room A</div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-white border border-outline-variant/30 text-on-surface font-bold text-sm"
            >
              Request reschedule
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-xl bg-white border border-outline-variant/30 text-on-surface font-bold text-sm"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-[#F6E05E] bg-[#FFF8E7] p-6">
          <div className="text-[11px] font-extrabold tracking-widest uppercase text-[#B7791F]">Outstanding Balance</div>
          <div className="mt-2 text-3xl tabular-nums font-extrabold text-on-surface">$324.00</div>
          <div className="mt-1 text-sm text-on-surface-variant">1 unpaid invoice · Due Apr 22</div>
          <button type="button" className="mt-4 w-full px-4 py-3 rounded-xl bg-primary text-white font-extrabold">
            Pay now →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="text-lg font-extrabold text-on-surface mb-4">Liam&apos;s sessions this month</div>
          {[
            ['Sessions completed', '4', 'text-on-surface'],
            ['Sessions upcoming', '3', 'text-[#00796B]'],
            ['Free cancellation used', '1 of 1 ⚠', 'text-[#B7791F]'],
            ['Free cancellation resets', 'May 1, 2026', 'text-on-surface'],
          ].map(([k, v, c]) => (
            <div key={k} className="flex justify-between py-2 border-b border-outline-variant/20 last:border-b-0 text-sm">
              <span className="text-on-surface-variant">{k}</span>
              <span className={`font-extrabold ${c}`}>{v}</span>
            </div>
          ))}
        </Card>

        <Card className="p-6">
          <div className="text-lg font-extrabold text-on-surface mb-4">Account status</div>
          {[
            ['Auto-pay', 'Active ✓', 'text-[#00796B]'],
            ['Card on file', 'Visa ··· 4242', 'text-on-surface'],
            ['Next auto-pay', 'Apr 23 (Thu)', 'text-on-surface'],
            ['Portal status', 'Active', 'text-[#00796B]'],
          ].map(([k, v, c]) => (
            <div key={k} className="flex justify-between py-2 border-b border-outline-variant/20 last:border-b-0 text-sm">
              <span className="text-on-surface-variant">{k}</span>
              <span className={`font-extrabold ${c}`}>{v}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
