import Card from '../../components/ui/Card.jsx';

export default function SuperAdminClinic() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">Clinic Config</h2>
        <p className="text-sm text-on-surface-variant">From prototype: locations, rooms, services, rates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="text-sm font-extrabold text-on-surface">Locations</div>
          <p className="text-xs text-on-surface-variant mt-2">Brampton, Mississauga (placeholder)</p>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-extrabold text-on-surface">Rooms</div>
          <p className="text-xs text-on-surface-variant mt-2">Room A, Room B… (placeholder)</p>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-extrabold text-on-surface">Service Catalog</div>
          <p className="text-xs text-on-surface-variant mt-2">ABA, OT, SLP… (placeholder)</p>
        </Card>
      </div>
    </div>
  );
}

