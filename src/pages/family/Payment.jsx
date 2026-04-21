import Toggle from '../../components/ui/Toggle.jsx';
import Card from '../../components/ui/Card.jsx';
import { useState } from 'react';

export default function FamilyPayment() {
  const [autoPay, setAutoPay] = useState(true);
  const [receipts, setReceipts] = useState(true);

  return (
    <div className="p-8 space-y-6">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Payment Settings</h2>
        <p className="text-on-surface-variant font-medium">Auto-pay and notifications (demo)</p>
      </section>

      <Card className="p-6">
        <div className="flex items-center justify-between py-3 border-b border-outline-variant/20">
          <div>
            <div className="font-extrabold text-on-surface">Auto-pay</div>
            <div className="text-xs text-on-surface-variant">Charge card on file for unpaid invoices.</div>
          </div>
          <Toggle checked={autoPay} onChange={setAutoPay} onLabel="ON" offLabel="OFF" tone="teal" />
        </div>

        <div className="flex items-center justify-between py-3 border-b border-outline-variant/20">
          <div>
            <div className="font-extrabold text-on-surface">Card on file</div>
            <div className="text-xs text-on-surface-variant">Visa ··· 4242 (demo)</div>
          </div>
          <button type="button" className="px-4 py-2 rounded-xl bg-surface-container text-on-surface-variant font-extrabold">
            Update
          </button>
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <div className="font-extrabold text-on-surface">Email receipts</div>
            <div className="text-xs text-on-surface-variant">Send receipts and reminders by email.</div>
          </div>
          <Toggle checked={receipts} onChange={setReceipts} onLabel="ON" offLabel="OFF" tone="amber" />
        </div>
      </Card>
    </div>
  );
}

