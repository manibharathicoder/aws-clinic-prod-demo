// src/pages/family/Sessions.jsx
import { useAuth } from '../../context/AuthContext';

const child = { name: 'Liam Johnson', age: 7, therapist: 'James Okonkwo', type: 'Speech Therapy', since: 'September 2024' };

const sessions = [
  { date:'Apr 9, 2026',  time:'10:00 AM', therapist:'James Okonkwo', duration:'45 min', status:'completed', summary:'Worked on requesting behaviors. Liam was engaged and responded well to prompts.' },
  { date:'Apr 7, 2026',  time:'10:00 AM', therapist:'James Okonkwo', duration:'45 min', status:'completed', summary:'Focused on articulation exercises. Significant improvement in /r/ sounds.' },
  { date:'Apr 4, 2026',  time:'10:00 AM', therapist:'James Okonkwo', duration:'45 min', status:'completed', summary:'Worked on two-word combinations. Liam initiated communication 8x independently.' },
  { date:'Apr 14, 2026', time:'10:00 AM', therapist:'James Okonkwo', duration:'45 min', status:'upcoming',  summary:'' },
  { date:'Apr 16, 2026', time:'10:00 AM', therapist:'James Okonkwo', duration:'45 min', status:'upcoming',  summary:'' },
];

const progress = [
  { skill:'Requesting (MAND)',      level:78, trend:'+12%' },
  { skill:'Articulation (/r/, /l/)',level:64, trend:'+8%'  },
  { skill:'Social Greetings',       level:90, trend:'+5%'  },
  { skill:'Following Instructions', level:55, trend:'+15%' },
];

const invoices = [
  { id:'INV-0842', date:'Apr 8', amount:'$840', status:'unpaid'  },
  { id:'INV-0831', date:'Mar 24',amount:'$840', status:'paid'    },
  { id:'INV-0819', date:'Mar 10',amount:'$840', status:'paid'    },
];

export default function FamilySessions() {
  const { user } = useAuth();

  return (
    <div style={{ fontFamily:"'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom:'24px' }}>
        <h1 style={{ fontSize:'26px', fontWeight:700, color:'#f1f5f9', marginBottom:'4px' }}>Family Portal</h1>
        <p style={{ fontSize:'14px', color:'#64748b' }}>Welcome, {user?.name}. Track sessions and progress for your child.</p>
      </div>

      {/* Child Card */}
      <div style={{ background:'linear-gradient(135deg, #1e293b, #0f172a)', border:'1px solid #6366f130',
        borderRadius:'16px', padding:'24px', marginBottom:'20px', display:'flex', gap:'20px', alignItems:'center' }}>
        <div style={{ width:'64px', height:'64px', borderRadius:'50%', background:'linear-gradient(135deg, #6366f1, #06b6d4)',
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', flexShrink:0 }}>
          🧒
        </div>
        <div style={{ flex:1 }}>
          <h2 style={{ fontSize:'20px', fontWeight:700, color:'#f1f5f9', marginBottom:'4px' }}>{child.name}</h2>
          <p style={{ fontSize:'13px', color:'#94a3b8', marginBottom:'8px' }}>Age {child.age} · In therapy since {child.since}</p>
          <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
            <span style={{ fontSize:'12px', background:'#6366f120', color:'#a5b4fc', borderRadius:'8px', padding:'4px 12px' }}>
              🩺 {child.therapist}
            </span>
            <span style={{ fontSize:'12px', background:'#06b6d420', color:'#67e8f9', borderRadius:'8px', padding:'4px 12px' }}>
              💬 {child.type}
            </span>
          </div>
        </div>
        <div style={{ textAlign:'center', padding:'0 16px' }}>
          <p style={{ fontSize:'32px', fontWeight:700, color:'#10b981' }}>32</p>
          <p style={{ fontSize:'11px', color:'#64748b', textTransform:'uppercase', letterSpacing:'0.05em' }}>Total Sessions</p>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:'20px', marginBottom:'20px' }}>
        {/* Sessions List */}
        <div style={{ background:'#1e293b', border:'1px solid #334155', borderRadius:'14px', padding:'22px' }}>
          <h2 style={{ fontSize:'15px', fontWeight:600, color:'#e2e8f0', marginBottom:'16px' }}>📅 Sessions</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            {sessions.map((s, i) => (
              <div key={i} style={{ background:'#0f172a', borderRadius:'12px', padding:'14px 16px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px' }}>
                  <div>
                    <p style={{ fontSize:'14px', fontWeight:600, color:'#e2e8f0' }}>{s.date} · {s.time}</p>
                    <p style={{ fontSize:'12px', color:'#64748b' }}>{s.therapist} · {s.duration}</p>
                  </div>
                  <span style={{ fontSize:'11px', fontWeight:600, padding:'3px 10px', borderRadius:'99px',
                    background: s.status==='completed' ? '#10b98120' : '#6366f120',
                    color: s.status==='completed' ? '#34d399' : '#a5b4fc' }}>
                    {s.status==='completed' ? '✓ Completed' : '📅 Upcoming'}
                  </span>
                </div>
                {s.summary && (
                  <p style={{ fontSize:'12px', color:'#94a3b8', marginTop:'8px', lineHeight:'1.6',
                    borderLeft:'2px solid #334155', paddingLeft:'10px' }}>
                    {s.summary}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          {/* Progress */}
          <div style={{ background:'#1e293b', border:'1px solid #334155', borderRadius:'14px', padding:'20px' }}>
            <h2 style={{ fontSize:'15px', fontWeight:600, color:'#e2e8f0', marginBottom:'14px' }}>📈 Skill Progress</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              {progress.map((p, i) => (
                <div key={i}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'5px' }}>
                    <span style={{ fontSize:'12px', color:'#94a3b8' }}>{p.skill}</span>
                    <span style={{ fontSize:'12px', color:'#10b981', fontWeight:600 }}>{p.trend}</span>
                  </div>
                  <div style={{ background:'#0f172a', borderRadius:'99px', height:'6px', overflow:'hidden' }}>
                    <div style={{ height:'100%', borderRadius:'99px', background:'linear-gradient(90deg, #6366f1, #06b6d4)', width:`${p.level}%` }} />
                  </div>
                  <div style={{ textAlign:'right', marginTop:'2px' }}>
                    <span style={{ fontSize:'10px', color:'#475569' }}>{p.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invoices */}
          <div style={{ background:'#1e293b', border:'1px solid #334155', borderRadius:'14px', padding:'20px' }}>
            <h2 style={{ fontSize:'15px', fontWeight:600, color:'#e2e8f0', marginBottom:'14px' }}>🧾 Recent Invoices</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              {invoices.map((inv, i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                  background:'#0f172a', borderRadius:'10px', padding:'10px 14px' }}>
                  <div>
                    <p style={{ fontSize:'13px', fontWeight:600, color:'#6366f1' }}>{inv.id}</p>
                    <p style={{ fontSize:'11px', color:'#475569' }}>{inv.date}</p>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <p style={{ fontSize:'14px', fontWeight:700, color:'#e2e8f0' }}>{inv.amount}</p>
                    <span style={{ fontSize:'10px', fontWeight:600, padding:'2px 8px', borderRadius:'99px',
                      background: inv.status==='paid' ? '#10b98120' : '#f59e0b20',
                      color: inv.status==='paid' ? '#34d399' : '#fbbf24' }}>
                      {inv.status==='paid' ? 'Paid' : 'Unpaid'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
