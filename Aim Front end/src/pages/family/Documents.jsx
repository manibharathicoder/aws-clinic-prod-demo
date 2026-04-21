import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const DOCS = [
  { name: 'Intake Form (Liam)', date: 'Mar 02, 2026', type: { t: 'Form', tone: 'amber' } },
  { name: 'Consent Record', date: 'Mar 02, 2026', type: { t: 'Consent', tone: 'teal' } },
  { name: 'Progress Report (April)', date: 'Apr 18, 2026', type: { t: 'Report', tone: 'violet' } },
];

export default function FamilyDocuments() {
  return (
    <div className="p-8 space-y-6">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Documents</h2>
        <p className="text-on-surface-variant font-medium">Forms, consents, and reports (demo)</p>
      </section>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-extrabold text-on-surface">Your files</div>
          <button type="button" className="px-4 py-2 rounded-xl bg-primary text-white font-extrabold text-sm">
            Upload
          </button>
        </div>

        <div className="divide-y divide-outline-variant/20">
          {DOCS.map((d) => (
            <div key={d.name} className="py-4 flex items-center gap-3">
              <div className="text-on-surface">📁</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-extrabold text-on-surface truncate">{d.name}</div>
                <div className="text-xs text-on-surface-variant">{d.date}</div>
              </div>
              <Badge tone={d.type.tone}>{d.type.t}</Badge>
              <button type="button" className="text-primary font-extrabold text-sm hover:underline">
                Download
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

