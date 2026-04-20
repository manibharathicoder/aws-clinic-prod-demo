// src/pages/accounting/Dashboard.jsx

const stats = [
  { label: 'Unpaid Invoices', value: '17',    change: '$12,400 outstanding', icon: '🧾', color: '#f59e0b', bg: '#f59e0b15' },
  { label: 'Revenue (Month)', value: '$48K',  change: '+12% vs March',       icon: '💰', color: '#10b981', bg: '#10b98115' },
  { label: 'Pending Claims',  value: '8',     change: '3 need review',       icon: '📋', color: '#6366f1', bg: '#6366f115' },
  { label: 'Overdue > 30d',   value: '4',     change: '$3,200 at risk',      icon: '⚠️', color: '#ef4444', bg: '#ef444415' },
];

const invoices = [
  { id:'INV-0842', client:'Johnson Family',  date:'Apr 8, 2026', amount:'$840',  status:'unpaid',   due:'Apr 22' },
  { id:'INV-0841', client:'Patel Family',    date:'Apr 7, 2026', amount:'$1,120',status:'paid',     due:'Apr 21' },
  { id:'INV-0840', client:'Williams Family', date:'Apr 5, 2026', amount:'$560',  status:'overdue',  due:'Apr 5'  },
  { id:'INV-0839', client:'Martinez Family', date:'Apr 3, 2026', amount:'$980',  status:'unpaid',   due:'Apr 17' },
  { id:'INV-0838', client:'Kim Family',      date:'Apr 1, 2026', amount:'$720',  status:'paid',     due:'Apr 15' },
  { id:'INV-0837', client:'Torres Family',   date:'Mar 28, 2026',amount:'$1,400',status:'overdue',  due:'Mar 28' },
];

const statusStyle = {
  paid:    { bg:'#10b98120', color:'#34d399', label:'Paid'    },
  unpaid:  { bg:'#f59e0b20', color:'#fbbf24', label:'Unpaid'  },
  overdue: { bg:'#ef444420', color:'#f87171', label:'Overdue' },
};

const monthlyRevenue = [
  { month:'Nov', amount: 38 }, { month:'Dec', amount: 42 },
  { month:'Jan', amount: 35 }, { month:'Feb', amount: 44 },
  { month:'Mar', amount: 43 }, { month:'Apr', amount: 48 },
];
const maxRev = Math.max(...monthlyRevenue.map(r => r.amount));

export default function AccountingDashboard() {
  return (
    <div style={{ fontFamily:"'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom:'28px' }}>
        <h1 style={{ fontSize:'26px', fontWeight:700, color:'#f1f5f9', marginBottom:'4px' }}>Accounting Dashboard</h1>
        <p style={{ fontSize:'14px', color:'#64748b' }}>Invoices, revenue, and financial reports for April 2026</p>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(210px, 1fr))', gap:'14px', marginBottom:'24px' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background:'#1e293b', border:'1px solid #334155', borderRadius:'14px', padding:'20px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'12px' }}>
              <p style={{ fontSize:'11px', color:'#64748b', textTransform:'uppercase', letterSpacing:'0.06em' }}>{s.label}</p>
              <span style={{ fontSize:'18px', background:s.bg, borderRadius:'8px', padding:'4px 8px' }}>{s.icon}</span>
            </div>
            <p style={{ fontSize:'30px', fontWeight:700, color:s.color, marginBottom:'4px' }}>{s.value}</p>
            <p style={{ fontSize:'12px', color:'#475569' }}>{s.change}</p>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:'20px', marginBottom:'20px' }}>
        {/* Invoice Table */}
        <div style={{ background:'#1e293b', border:'1px solid #334155', borderRadius:'14px', padding:'22px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
            <h2 style={{ fontSize:'15px', fontWeight:600, color:'#e2e8f0' }}>🧾 Recent Invoices</h2>
            <button style={{ fontSize:'12px', color:'#6366f1', background:'#6366f115', border:'none', borderRadius:'8px', padding:'5px 12px', cursor:'pointer' }}>
              View All
            </button>
          </div>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid #334155' }}>
                {['Invoice','Client','Date','Amount','Status','Due'].map(h => (
                  <th key={h} style={{ padding:'8px 10px', textAlign:'left', fontSize:'11px', color:'#64748b', textTransform:'uppercase', letterSpacing:'0.05em', fontWeight:600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => (
                <tr key={i} style={{ borderBottom:'1px solid #0f172a' }}>
                  <td style={{ padding:'11px 10px', fontSize:'13px', fontWeight:600, color:'#6366f1' }}>{inv.id}</td>
                  <td style={{ padding:'11px 10px', fontSize:'13px', color:'#e2e8f0' }}>{inv.client}</td>
                  <td style={{ padding:'11px 10px', fontSize:'12px', color:'#64748b' }}>{inv.date}</td>
                  <td style={{ padding:'11px 10px', fontSize:'13px', fontWeight:600, color:'#e2e8f0' }}>{inv.amount}</td>
                  <td style={{ padding:'11px 10px' }}>
                    <span style={{ fontSize:'11px', fontWeight:600, padding:'3px 10px', borderRadius:'99px',
                      background:statusStyle[inv.status].bg, color:statusStyle[inv.status].color }}>
                      {statusStyle[inv.status].label}
                    </span>
                  </td>
                  <td style={{ padding:'11px 10px', fontSize:'12px', color: inv.status==='overdue' ? '#f87171' : '#64748b' }}>{inv.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Revenue Chart */}
        <div style={{ background:'#1e293b', border:'1px solid #334155', borderRadius:'14px', padding:'22px' }}>
          <h2 style={{ fontSize:'15px', fontWeight:600, color:'#e2e8f0', marginBottom:'20px' }}>📊 Revenue (6 Months)</h2>
          <div style={{ display:'flex', alignItems:'flex-end', gap:'10px', height:'140px', marginBottom:'10px' }}>
            {monthlyRevenue.map((r, i) => (
              <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
                <span style={{ fontSize:'10px', color:'#64748b' }}>${r.amount}K</span>
                <div style={{ width:'100%', borderRadius:'6px 6px 0 0',
                  height: `${(r.amount / maxRev) * 110}px`,
                  background: i === monthlyRevenue.length-1 ? '#6366f1' : '#334155',
                  transition:'all 0.3s' }} />
                <span style={{ fontSize:'10px', color:'#64748b' }}>{r.month}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop:'1px solid #334155', paddingTop:'14px', marginTop:'8px' }}>
            <p style={{ fontSize:'12px', color:'#64748b' }}>Total YTD Revenue</p>
            <p style={{ fontSize:'22px', fontWeight:700, color:'#10b981' }}>$250K</p>
          </div>
        </div>
      </div>

      {/* Rates Summary */}
      <div style={{ background:'#1e293b', border:'1px solid #334155', borderRadius:'14px', padding:'22px' }}>
        <h2 style={{ fontSize:'15px', fontWeight:600, color:'#e2e8f0', marginBottom:'16px' }}>💲 Current Service Rates</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'12px' }}>
          {[
            { service:'ABA Therapy',         rate:'$120/hr', sessions:'248 this month' },
            { service:'Speech Therapy',       rate:'$95/hr',  sessions:'186 this month' },
            { service:'Occupational Therapy', rate:'$110/hr', sessions:'142 this month' },
            { service:'Physical Therapy',     rate:'$105/hr', sessions:'98 this month'  },
          ].map((r, i) => (
            <div key={i} style={{ background:'#0f172a', borderRadius:'10px', padding:'14px 16px' }}>
              <p style={{ fontSize:'13px', fontWeight:600, color:'#e2e8f0', marginBottom:'6px' }}>{r.service}</p>
              <p style={{ fontSize:'20px', fontWeight:700, color:'#10b981', marginBottom:'4px' }}>{r.rate}</p>
              <p style={{ fontSize:'11px', color:'#475569' }}>{r.sessions}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
