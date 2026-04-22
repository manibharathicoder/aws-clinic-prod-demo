import { useMemo, useState } from 'react';
import Card from '../../components/ui/Card.jsx';

const THREADS = [
  { name: 'Johnson family', meta: 'Liam · ABA, Speech', last: 'Perfect, thank you so much!', when: '2m ago' },
  { name: 'Patel family', meta: 'Aanya · OT', last: 'When is the Part 2 appointment?', when: '1h ago' },
  { name: 'Chen family', meta: 'Dylan · ABA, Speech, OT', last: 'Thanks for the confirmation email', when: '3h ago' },
  { name: 'Rahman family', meta: 'Zara · ABA', last: 'Will she have the same therapist?', when: 'Yesterday' },
];

const MESSAGES = [
  { from: 'SJ', name: 'Sarah Johnson', own: false, text: 'Hi, Liam has a dentist appointment — can we move his Wednesday ABA to Thursday?', time: 'Mon Mar 15 · 9:12AM' },
  { from: 'SA', name: 'Sarah Ahmed (Admin)', own: true, text: "Hi Sarah! Thursday 10AM works with Dr. Priya. I'll reschedule now and send confirmation.", time: 'Mon Mar 15 · 10:34AM' },
  { from: 'SJ', name: 'Sarah Johnson', own: false, text: 'Perfect, thank you so much!', time: 'Mon Mar 15 · 10:41AM' },
];

export default function AdminMessages() {
  const [active, setActive] = useState(THREADS[0].name);
  const [draft, setDraft] = useState('');

  const title = useMemo(() => {
    return THREADS.find((t) => t.name === active) || THREADS[0];
  }, [active]);

  return (
    <div className="p-8 space-y-8">
      <section className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Messages</h2>
        <p className="text-on-surface-variant font-medium">Family communication threads (demo)</p>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="p-6 flex flex-col h-[480px]">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <div>
              <div className="text-sm font-extrabold text-on-surface">Family messages — {title.name}</div>
              <div className="text-xs text-on-surface-variant">{title.meta}</div>
            </div>
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
                    {m.own ? `You · ${m.time}` : m.time}
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
              placeholder="Type a message…"
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
          <div className="text-sm font-extrabold text-on-surface mb-4">All conversations</div>
          <div className="space-y-2">
            {THREADS.map((t) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setActive(t.name)}
                className={[
                  'w-full text-left p-4 rounded-xl border transition-colors',
                  active === t.name
                    ? 'border-primary bg-primary/5'
                    : 'border-outline-variant/20 bg-surface-container-lowest hover:bg-surface-container',
                ].join(' ')}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-extrabold text-on-surface">{t.name}</div>
                  <div className="text-xs text-on-surface-variant">{t.when}</div>
                </div>
                <div className="text-xs text-on-surface-variant mt-1">{t.meta}</div>
                <div className="text-sm text-on-surface mt-2 truncate">{t.last}</div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

