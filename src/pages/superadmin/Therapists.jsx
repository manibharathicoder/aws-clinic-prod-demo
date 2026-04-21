import Badge from '../../components/ui/Badge.jsx';
import Card from '../../components/ui/Card.jsx';

export default function SuperAdminTherapists() {
  const therapists = [
    {
      id: 'T-001',
      name: 'Dr. Priya Mehta',
      specialty: 'Speech-Language Pathologist',
      locations: ['Brampton', 'Virtual'],
      utilization: '82%',
      status: { t: 'Active', tone: 'teal' },
    },
    {
      id: 'T-002',
      name: 'Sarah Ahmed',
      specialty: 'Occupational Therapist',
      locations: ['Mississauga'],
      utilization: '76%',
      status: { t: 'Active', tone: 'teal' },
    },
    {
      id: 'T-003',
      name: 'James Okafor',
      specialty: 'ABA Therapist',
      locations: ['Brampton'],
      utilization: '91%',
      status: { t: 'High Load', tone: 'amber' },
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">All Therapists</h2>
        <p className="text-sm text-on-surface-variant">Prototype workflow: therapist profiles, availability, pay rates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {therapists.map((t) => (
          <Card key={t.id} className="p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-lg font-extrabold text-on-surface truncate">{t.name}</div>
                <div className="text-[11px] text-on-surface-variant">{t.id}</div>
              </div>
              <Badge tone={t.status.tone}>{t.status.t}</Badge>
            </div>

            <div className="mt-4 space-y-2">
              <div className="text-sm font-bold text-on-surface-variant">Specialty</div>
              <div className="text-sm text-on-surface">{t.specialty}</div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="text-sm font-bold text-on-surface-variant">Locations</div>
              <div className="flex flex-wrap gap-2">
                {t.locations.map((l) => (
                  <Badge key={l} tone="neutral">
                    {l}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-outline-variant/20 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Utilization
                </div>
                <div className="text-xl font-extrabold text-on-surface">{t.utilization}</div>
              </div>
              <button type="button" className="text-primary font-bold text-xs hover:underline">
                View Profile
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
