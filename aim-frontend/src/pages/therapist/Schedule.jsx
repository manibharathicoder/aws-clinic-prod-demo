// src/pages/therapist/Schedule.jsx
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const sessions = [
  { time:'9:00 AM',  duration:'60 min', client:'Liam Johnson',  age:7,  type:'ABA Therapy',         room:'Room 1', status:'completed',   notes:'Good engagement, color-sorting task mastered.' },
  { time:'10:30 AM', duration:'45 min', client:'Sofia Patel',   age:5,  type:'ABA Therapy',         room:'Room 1', status:'completed',   notes:'Worked on requesting behaviors. Positive session.' },
  { time:'11:30 AM', duration:'60 min', client:'Noah Williams', age:9,  type:'ABA Therapy',         room:'Room 2', status:'in-progress', notes:'' },
  { time:'1:00 PM',  duration:'45 min', client:'Ava Martinez',  age:6,  type:'ABA Therapy',         room:'Room 1', status:'upcoming',    notes:'' },
  { time:'2:15 PM',  duration:'60 min', client:'Ethan Kim',     age:8,  type:'ABA Therapy',         room:'Room 3', status:'upcoming',    notes:'' },
  { time:'3:30 PM',  duration:'45 min', client:'Mia Thompson',  age:4,  type:'Early Intervention',  room:'Room 2', status:'upcoming',    notes:'' },
];

const weekDays = [
  { day:'Mon', date:'Apr 7', count:6 },
  { day:'Tue', date:'Apr 8', count:5 },
  { day:'Wed', date:'Apr 9', count:6 },
  { day:'Thu', date:'Apr 10',count:4 },
  { day:'Fri', date:'Apr 11',count:3 },
];

const statusStyle = {
  completed:     { bg:'#10b98120', color:'#34d399', dot:'#10b981' },
  'in-progress': { bg:'#06b6d420', color:'#22d3ee', dot:'#06b6d4' },
  upcoming:      { bg:'#1e293b',   color:'#94a3b8', dot:'#475569' },
};

export default function TherapistSchedule() {
  const { user } = useAuth();
  const [activeDay, setActiveDay] = useState(2);

  const completed = sessions.filter(s => s.status === 'completed').length;
  const total = sessions.length;

  return (
    <div style={{ fontFamily:"'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom:'24px' }}>
        <h1 style={{ fontSize:'26px', fontWeight:700, color:'#f1f5f9', marginBottom:'4px' }}>My Schedule</h1>
        <p style={{ fontSize:'14px', color:'#64748b' }}>Welcome, {user?.name}. You have {total - completed} sessions remaining today.</p>
      </div>

      {/* Week strip */}
      <div style={{ display:'flex', gap:'10px', marginBottom:'24px' }}>
        {weekDays.map((d, i) => (
          <button key={i} onClick={() => setActiveDay(i)} style={{
            flex:1, padding:'12px 8px', borderRadius:'12px', border:'none', cursor:'pointer', textAlign:'center',
            background: activeDay === i ? '#6366f1' : '#1e293b',
            transition:'all 0.2s',
          }}>
            <p style={{ fontSize:'11px', color: activeDay===i ? '#c7d2fe' : '#64748b', marginBottom:'4px' }}>{d.day}</p>
            <p style={{ fontSize:'15px', fontWeight:600, color: activeDay===i ? '#fff' : '#e2e8f0' }}>{d.date.split(' ')[1]}</p>
            <p style={{ fontSize:'11px', color: activeDay===i ? '#c7d2fe' : '#475569', marginTop:'4px' }}>{d.count} sessions</p>
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ background:'#1e293b', border:'1px solid #334155', borderRadius:'12px', padding:'16px 20px', marginBottom:'20px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
          <span style={{ fontSize:'13px', color:'#cbd5e1', fontWeight:500 }}>Daily Progress</span>
          <span style={{ fontSize:'13px', color:'#6366f1', fontWeight:600 }}>{completed}/{total} sessions</span>
        </div>
        <div style={{ background:'#0f172a', borderRadius:'99px', height:'8px', overflow:'hidden' }}>
          <div style={{ height:'100%', borderRadius:'99px', background:'linear-gradient(90deg, #6366f1, #06b6d4)',
            width:`${(completed/total)*100}%`, transition:'width 0.5s ease' }} />
        </div>
      </div>

      {/* Session cards */}
      <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
        {sessions.map((s, i) => (
          <div key={i} style={{
            background:'#1e293b', border:'1px solid #334155', borderRadius:'14px', padding:'16px 20px',
            display:'flex', alignItems:'center', gap:'16px',
            opacity: s.status === 'completed' ? 0.75 : 1,
          }}>
            {/* Time */}
            <div style={{ minWidth:'80px', textAlign:'center' }}>
              <p style={{ fontSize:'14px', fontWeight:600, color:'#e2e8f0' }}>{s.time}</p>
              <p style={{ fontSize:'11px', color:'#475569' }}>{s.duration}</p>
            </div>

            {/* Divider dot */}
            <div style={{ width:'10px', height:'10px', borderRadius:'99px', flexShrink:0,
              background: statusStyle[s.status].dot, boxShadow: s.status==='in-progress' ? `0 0 8px ${statusStyle[s.status].dot}` : 'none' }} />

            {/* Info */}
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'3px' }}>
                <p style={{ fontSize:'15px', fontWeight:600, color:'#f1f5f9' }}>{s.client}</p>
                <span style={{ fontSize:'11px', color:'#64748b' }}>Age {s.age}</span>
              </div>
              <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
                <span style={{ fontSize:'12px', color:'#94a3b8' }}>{s.type}</span>
                <span style={{ fontSize:'11px', color:'#475569' }}>·</span>
                <span style={{ fontSize:'12px', color:'#475569' }}>{s.room}</span>
              </div>
              {s.notes && (
                <p style={{ fontSize:'12px', color:'#64748b', marginTop:'6px', fontStyle:'italic' }}>"{s.notes}"</p>
              )}
            </div>

            {/* Status badge */}
            <span style={{ fontSize:'11px', fontWeight:600, padding:'4px 12px', borderRadius:'99px', flexShrink:0,
              background: statusStyle[s.status].bg, color: statusStyle[s.status].color }}>
              {s.status === 'in-progress' ? '● In Progress' : s.status === 'completed' ? '✓ Done' : 'Upcoming'}
            </span>
          </div>
        ))}
      </div>

      {/* Stats summary footer */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'12px', marginTop:'20px' }}>
        {[
          { label:'Week Total', value:'24 sessions' },
          { label:'Total Clients', value:'18 active'  },
          { label:'Hours This Week', value:'19.5 hrs'  },
        ].map((s, i) => (
          <div key={i} style={{ background:'#1e293b', border:'1px solid #334155', borderRadius:'12px', padding:'16px', textAlign:'center' }}>
            <p style={{ fontSize:'11px', color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'6px' }}>{s.label}</p>
            <p style={{ fontSize:'18px', fontWeight:700, color:'#e2e8f0' }}>{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
