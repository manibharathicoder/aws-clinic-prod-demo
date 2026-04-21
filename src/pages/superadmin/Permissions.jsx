import { useMemo, useState } from 'react';
import Card from '../../components/ui/Card.jsx';

const TABLE_GROUPS = [
  { group: 'Scheduling', tables: ['Sessions', 'Schedule Slots', 'Rooms', 'Cover Requests'] },
  { group: 'Clients', tables: ['Client Profiles', 'Intake Forms', 'Documents', 'Consent Records'] },
  { group: 'Clinical', tables: ['Session Notes (Internal)', 'Session Notes (Summary)', 'Progress Reports', 'Goals'] },
  {
    group: 'Financial',
    tables: [
      'Invoices',
      'Payments',
      'Service Rates',
      'Therapist Pay Rates',
      'Price Groups',
      'Tax Config',
      'Payroll Records',
      'OAP Records',
      'Insurance Records',
    ],
  },
  { group: 'Staff', tables: ['Therapist Profiles', 'Pay Statements', 'Availability'] },
  { group: 'System', tables: ['Users', 'Roles', 'Permissions', 'Audit Log', 'System Settings', 'Notifications'] },
];

const ROLES = ['Super Admin', 'Admin', 'Accounting', 'Therapist'];
const OPS = ['C', 'R', 'U', 'D'];

const DEFAULTS = {
  Sessions: { 'Super Admin': 'CRUD', Admin: 'CRUD', Accounting: 'R', Therapist: 'R' },
  'Schedule Slots': { 'Super Admin': 'CRUD', Admin: 'CRUD', Accounting: 'R', Therapist: 'R' },
  Rooms: { 'Super Admin': 'CRUD', Admin: 'CRU', Accounting: '', Therapist: 'R' },
  'Cover Requests': { 'Super Admin': 'CRUD', Admin: 'RU', Accounting: '', Therapist: 'CRU' },
  'Client Profiles': { 'Super Admin': 'CRUD', Admin: 'CRU', Accounting: 'R', Therapist: 'R' },
  'Intake Forms': { 'Super Admin': 'CRUD', Admin: 'CRUD', Accounting: '', Therapist: '' },
  Documents: { 'Super Admin': 'CRUD', Admin: 'CRUD', Accounting: 'R', Therapist: 'R' },
  'Consent Records': { 'Super Admin': 'CRUD', Admin: 'R', Accounting: '', Therapist: 'R' },
  'Session Notes (Internal)': { 'Super Admin': 'CRUD', Admin: '', Accounting: '', Therapist: 'CRU' },
  'Session Notes (Summary)': { 'Super Admin': 'CRUD', Admin: 'R', Accounting: '', Therapist: 'CRUD' },
  'Progress Reports': { 'Super Admin': 'CRUD', Admin: 'R', Accounting: '', Therapist: 'CRUD' },
  Goals: { 'Super Admin': 'CRUD', Admin: '', Accounting: '', Therapist: 'CRUD' },
  Invoices: { 'Super Admin': 'CRUD', Admin: '', Accounting: 'CRUD', Therapist: '' },
  Payments: { 'Super Admin': 'CRUD', Admin: '', Accounting: 'CRUD', Therapist: '' },
  'Service Rates': { 'Super Admin': 'CRUD', Admin: '', Accounting: 'CRUD', Therapist: '' },
  'Therapist Pay Rates': { 'Super Admin': 'CRUD', Admin: '', Accounting: 'CRUD', Therapist: '' },
  'Price Groups': { 'Super Admin': 'CRUD', Admin: 'R', Accounting: 'CRUD', Therapist: '' },
  'Tax Config': { 'Super Admin': 'CRUD', Admin: '', Accounting: 'CRUD', Therapist: '' },
  'Payroll Records': { 'Super Admin': 'CRUD', Admin: '', Accounting: 'CRUD', Therapist: '' },
  'OAP Records': { 'Super Admin': 'CRUD', Admin: '', Accounting: 'CRUD', Therapist: '' },
  'Insurance Records': { 'Super Admin': 'CRUD', Admin: '', Accounting: 'CRUD', Therapist: '' },
  'Therapist Profiles': { 'Super Admin': 'CRUD', Admin: 'CRU', Accounting: 'R', Therapist: 'R' },
  'Pay Statements': { 'Super Admin': 'CRUD', Admin: '', Accounting: 'CRUD', Therapist: 'R' },
  Availability: { 'Super Admin': 'CRUD', Admin: 'R', Accounting: '', Therapist: 'CRU' },
  Users: { 'Super Admin': 'CRUD', Admin: '', Accounting: '', Therapist: '' },
  Roles: { 'Super Admin': 'CRUD', Admin: '', Accounting: '', Therapist: '' },
  Permissions: { 'Super Admin': 'CRUD', Admin: '', Accounting: '', Therapist: '' },
  'Audit Log': { 'Super Admin': 'R', Admin: '', Accounting: '', Therapist: '' },
  'System Settings': { 'Super Admin': 'CRUD', Admin: '', Accounting: '', Therapist: '' },
  Notifications: { 'Super Admin': 'CRUD', Admin: '', Accounting: '', Therapist: '' },
};

function initialMatrix() {
  const m = {};
  for (const group of TABLE_GROUPS) {
    for (const table of group.tables) {
      m[table] = {};
      for (const role of ROLES) {
        const ops = DEFAULTS[table]?.[role] ?? '';
        m[table][role] = new Set(ops.split(''));
      }
    }
  }
  return m;
}

export default function SuperAdminPermissions() {
  const [role, setRole] = useState('Super Admin');
  const [matrix, setMatrix] = useState(() => initialMatrix());

  const allTables = useMemo(() => TABLE_GROUPS.flatMap((g) => g.tables), []);

  const toggle = (table, op) => {
    setMatrix((prev) => {
      const next = { ...prev };
      const nextRoleOps = new Set(next[table][role]);
      if (nextRoleOps.has(op)) nextRoleOps.delete(op);
      else nextRoleOps.add(op);
      next[table] = { ...next[table], [role]: nextRoleOps };
      return next;
    });
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">Permissions</h2>
          <p className="text-sm text-on-surface-variant">Prototype matrix (CRUD) by role</p>
        </div>

        <div className="flex items-center gap-2">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={[
                'text-xs font-bold px-3 py-2 rounded-xl border transition-colors',
                role === r
                  ? 'bg-primary/10 border-primary/30 text-primary'
                  : 'bg-white border-outline-variant/30 text-on-surface-variant hover:text-on-surface',
              ].join(' ')}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <Card className="p-5">
        <div className="text-xs text-on-surface-variant mb-4">
          Click C/R/U/D to grant or remove permissions for <span className="font-bold text-on-surface">{role}</span>.
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[980px] w-full">
            <thead>
              <tr className="text-left">
                <th className="text-xs font-bold uppercase tracking-widest text-on-surface-variant py-3 pr-3">
                  Table
                </th>
                {OPS.map((op) => (
                  <th
                    key={op}
                    className="text-xs font-bold uppercase tracking-widest text-on-surface-variant py-3 text-center"
                  >
                    {op}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_GROUPS.map((g) => (
                <>
                  <tr key={g.group}>
                    <td
                      colSpan={5}
                      className="py-2 px-3 text-[11px] font-extrabold uppercase tracking-widest text-on-surface-variant bg-surface-container-low rounded-lg"
                    >
                      {g.group}
                    </td>
                  </tr>
                  {g.tables.map((t) => (
                    <tr key={t} className="border-b border-outline-variant/20">
                      <td className="py-3 pr-3 text-sm font-bold text-on-surface">{t}</td>
                      {OPS.map((op) => {
                        const on = matrix[t][role].has(op);
                        return (
                          <td key={op} className="py-3 text-center">
                            <button
                              type="button"
                              onClick={() => toggle(t, op)}
                              className={[
                                'w-8 h-8 rounded-lg border text-[11px] font-extrabold transition-colors',
                                on
                                  ? 'bg-primary/10 border-primary/40 text-primary'
                                  : 'bg-transparent border-outline-variant/30 text-outline',
                              ].join(' ')}
                              aria-label={`${on ? 'Remove' : 'Grant'} ${op} for ${role} on ${t}`}
                            >
                              {op}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-[11px] text-on-surface-variant">
          Totals for this role:{' '}
          <span className="font-bold text-on-surface">
            {allTables.reduce((acc, t) => acc + matrix[t][role].size, 0)}
          </span>{' '}
          permissions toggled.
        </div>
      </Card>
    </div>
  );
}

