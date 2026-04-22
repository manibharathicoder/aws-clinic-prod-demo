import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

export default function TherapistCover() {
  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Cover Requests</h2>
        <p className="text-on-surface-variant font-medium">Incoming requests and your history (demo)</p>
      </section>

      <div className="rounded-2xl border border-[#F6E05E]/40 bg-[#FFF8E7] p-4">
        <div className="text-sm font-extrabold text-[#8A5A00]">Cover request received</div>
        <div className="text-xs text-[#8A5A00]/80 mt-1">
          From James Okafor — ABA session, Mar 20 at 10AM. Please accept or decline.
        </div>
      </div>

      <Card className="p-6">
        <div className="text-sm font-extrabold text-on-surface mb-4">Incoming cover request</div>
        <div className="rounded-xl bg-surface-container p-4 border border-outline-variant/20">
          <div className="text-xs font-extrabold text-secondary mb-2">Session to cover</div>
          <div className="text-sm text-on-surface-variant">ABA Therapy · Mar 20, 2026 · 10:00–11:00AM</div>
          <div className="text-sm text-on-surface-variant">Brampton · Room A · Client (name hidden)</div>
          <div className="text-xs text-on-surface-variant mt-2">
            Requested by James Okafor · “Personal appointment, can&apos;t make it”
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" className="px-4 py-2 rounded-xl bg-primary text-white font-extrabold text-sm">
            Accept cover
          </button>
          <button type="button" className="px-4 py-2 rounded-xl bg-white border border-outline-variant/30 font-extrabold text-sm">
            Decline
          </button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="text-sm font-extrabold text-on-surface mb-4">My cover request history</div>
        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest flex items-start justify-between gap-3">
            <div className="text-sm text-on-surface">
              Mar 12 — ABA session covered by James Okafor · <Badge tone="teal">Approved by admin</Badge>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest flex items-start justify-between gap-3">
            <div className="text-sm text-on-surface">Feb 28 — Speech session · no cover found · session lost</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

