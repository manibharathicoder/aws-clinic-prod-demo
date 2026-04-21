import Card from '../../components/ui/Card.jsx';

export default function SuperAdminSettings() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">System Settings</h2>
        <p className="text-sm text-on-surface-variant">From prototype: notifications, global config, integrations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="text-sm font-extrabold text-on-surface">Notifications</div>
          <p className="text-xs text-on-surface-variant mt-2">Email/SMS templates, triggers (placeholder)</p>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-extrabold text-on-surface">Security</div>
          <p className="text-xs text-on-surface-variant mt-2">MFA, password policy, audit retention (placeholder)</p>
        </Card>
      </div>
    </div>
  );
}

