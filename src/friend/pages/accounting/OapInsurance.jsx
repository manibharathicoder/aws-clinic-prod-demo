import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

const OAP = [
  { client: 'Client #A12', allocation: '$22,000', used: '$17,600', remaining: '$4,400', status: { t: '80% used', tone: 'amber' } },
  { client: 'Client #F09', allocation: '$20,000', used: '$8,200', remaining: '$11,800', status: { t: '41% used', tone: 'teal' } },
];

const INS = [
  { client: 'Client #G18', coverage: '$5,000', used: '$2,400', remaining: '$2,600', status: { t: '48% used', tone: 'teal' } },
  { client: 'Client #H15', coverage: '$3,500', used: '$3,000', remaining: '$500', status: { t: '86% used', tone: 'amber' } },
];

export default function AccountingOapInsurance() {
  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">OAP & Insurance</h2>
        <p className="text-on-surface-variant font-medium">Funding utilization and coverage tracking (demo)</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 overflow-x-auto">
          <div className="text-sm font-extrabold text-on-surface mb-4">OAP — Ontario Autism Program clients</div>
          <table className="min-w-[740px] w-full text-sm">
            <thead className="text-left text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              <tr>
                <th className="py-3 pr-3">Client</th>
                <th className="py-3 pr-3">Annual allocation</th>
                <th className="py-3 pr-3">Used</th>
                <th className="py-3 pr-3">Remaining</th>
                <th className="py-3 pr-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {OAP.map((r) => (
                <tr key={r.client} className="border-t border-outline-variant/20">
                  <td className="py-3 pr-3 font-bold text-on-surface">{r.client}</td>
                  <td className="py-3 pr-3 tabular-nums font-extrabold text-on-surface">{r.allocation}</td>
                  <td className="py-3 pr-3 tabular-nums font-extrabold text-tertiary">{r.used}</td>
                  <td className="py-3 pr-3 tabular-nums font-extrabold text-on-surface">{r.remaining}</td>
                  <td className="py-3 pr-3">
                    <Badge tone={r.status.tone}>{r.status.t}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-6 overflow-x-auto">
          <div className="text-sm font-extrabold text-on-surface mb-4">Private insurance clients</div>
          <table className="min-w-[740px] w-full text-sm">
            <thead className="text-left text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              <tr>
                <th className="py-3 pr-3">Client</th>
                <th className="py-3 pr-3">Annual coverage</th>
                <th className="py-3 pr-3">Used</th>
                <th className="py-3 pr-3">Remaining</th>
                <th className="py-3 pr-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {INS.map((r) => (
                <tr key={r.client} className="border-t border-outline-variant/20">
                  <td className="py-3 pr-3 font-bold text-on-surface">{r.client}</td>
                  <td className="py-3 pr-3 tabular-nums font-extrabold text-on-surface">{r.coverage}</td>
                  <td className="py-3 pr-3 tabular-nums font-extrabold text-on-surface">{r.used}</td>
                  <td className="py-3 pr-3 tabular-nums font-extrabold text-on-surface">{r.remaining}</td>
                  <td className="py-3 pr-3">
                    <Badge tone={r.status.tone}>{r.status.t}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
