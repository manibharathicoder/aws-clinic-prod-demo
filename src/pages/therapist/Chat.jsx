import { useState } from 'react';
import Card from '../../components/ui/Card.jsx';
import Badge from '../../components/ui/Badge.jsx';

const MESSAGES = [
  {
    from: 'SA',
    own: false,
    tone: 'secondary',
    text: 'Reminder: Monday invoice review deadline today by 5PM please confirm your sessions are marked ✅',
    meta: 'Sarah Ahmed (Admin) · 8:02AM',
  },
  {
    from: 'JP',
    own: false,
    tone: 'amber',
    text: 'Hey, does anyone have availability Thu 2PM to cover an ABA session? I have a conflict.',
    meta: 'James Okafor · 9:14AM',
  },
  {
    from: 'PM',
    own: true,
    tone: 'primary',
    text: "I'm free Thursday 2PM! Sending you a cover request now.",
    meta: 'You · 9:22AM',
  },
  { from: 'JP', own: false, tone: 'amber', text: 'Amazing thank you! Request sent 🙏', meta: 'James Okafor · 9:23AM' },
];

const CHANNELS = [
  ['# all-staff', 'All clinic staff', 'Active', 'teal'],
  ['# cover-requests', 'Post open cover needs', 'Active', 'violet'],
  ['# brampton-clinic', 'Brampton team', 'Active', 'secondary'],
  ['🔒 James Okafor', 'Direct message', 'Active', 'amber'],
  ['🔒 Sara Nguyen', 'Direct message', '—', 'gray'],
];

export default function TherapistChat() {
  const [draft, setDraft] = useState('');

  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Staff Chat</h2>
        <p className="text-on-surface-variant font-medium">Channels and direct messages (demo)</p>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="p-6 flex flex-col h-[520px]">
          <div className="pb-3 border-b border-outline-variant/20">
            <div className="text-sm font-extrabold text-on-surface"># all-staff</div>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {MESSAGES.map((m, idx) => (
              <div key={idx} className={['flex gap-3', m.own ? 'flex-row-reverse' : ''].join(' ')}>
                <div
                  className={[
                    'w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold',
                    m.own ? 'bg-primary/10 text-primary' : 'bg-surface-container text-on-surface',
                  ].join(' ')}
                >
                  {m.from}
                </div>
                <div className="max-w-[75%]">
                  <div
                    className={[
                      'px-4 py-3 rounded-2xl text-sm',
                      m.own ? 'bg-primary/10 text-on-surface' : 'bg-surface-container-lowest border border-outline-variant/20 text-on-surface',
                    ].join(' ')}
                  >
                    {m.text}
                  </div>
                  <div className={['mt-1 text-[10px]', m.own ? 'text-right text-on-surface-variant' : 'text-on-surface-variant'].join(' ')}>
                    {m.meta}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-outline-variant/20 flex gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Message #all-staff…"
            />
            <button
              type="button"
              className="px-4 py-3 rounded-xl bg-primary text-white font-extrabold text-sm"
              onClick={() => setDraft('')}
            >
              Send
            </button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm font-extrabold text-on-surface mb-4">Channels & direct messages</div>
          <div className="space-y-2">
            {CHANNELS.map(([name, desc, st, tone]) => (
              <div
                key={name}
                className="p-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest flex items-center justify-between gap-3"
              >
                <div>
                  <div className="text-sm font-extrabold text-on-surface">{name}</div>
                  <div className="text-xs text-on-surface-variant mt-1">{desc}</div>
                </div>
                <Badge tone={tone === 'secondary' ? 'teal' : tone}>{st}</Badge>
              </div>
            ))}
          </div>

          <div className="mt-4 text-[11px] text-on-surface-variant rounded-xl bg-surface-container p-3 border border-outline-variant/20">
            🔒 Direct messages are encrypted end-to-end. Admin and management cannot read DMs.
          </div>
        </Card>
      </div>
    </div>
  );
}

