import MaterialIcon from '../../components/MaterialIcon.jsx';

export default function SuperAdminDashboard() {
  return (
        <div className="p-8 space-y-8">
          <section className="flex flex-col gap-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Systems Overview</h2>
            <p className="text-on-surface-variant font-medium">
              Real-time performance metrics for Clinical Sanctuary
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_12px_32px_rgba(25,28,32,0.02)] flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <MaterialIcon name="payments" />
                </div>
                <span className="text-[10px] font-bold text-primary bg-primary-fixed-dim/20 px-2 py-1 rounded-full">
                  +12.5%
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface-variant mb-1">Monthly Revenue</p>
                <h3 className="text-2xl font-extrabold text-on-surface">$48,240</h3>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_12px_32px_rgba(25,28,32,0.02)] flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                  <MaterialIcon name="diversity_1" />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface-variant mb-1">Active Clients</p>
                <h3 className="text-2xl font-extrabold text-on-surface">47</h3>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_12px_32px_rgba(25,28,32,0.02)] flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-tertiary/10 rounded-lg text-tertiary">
                  <MaterialIcon name="clinical_notes" />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface-variant mb-1">Active Therapists</p>
                <h3 className="text-2xl font-extrabold text-on-surface">8</h3>
              </div>
            </div>

            <div className="bg-error-container/20 p-6 rounded-xl border border-error/10 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-error/10 rounded-lg text-error">
                  <MaterialIcon name="warning" />
                </div>
                <span className="text-[10px] font-bold text-error bg-error/10 px-2 py-1 rounded-full uppercase tracking-tighter">
                  Action Required
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-error-container mb-1">Outstanding Balance</p>
                <h3 className="text-2xl font-extrabold text-error">$3,420</h3>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_12px_32px_rgba(25,28,32,0.02)]">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="font-bold text-on-surface">Attendance Rate</h4>
                    <MaterialIcon name="more_vert" className="text-outline" />
                  </div>
                  <div className="relative flex items-center justify-center py-4">
                    <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                      <circle
                        className="text-surface-container"
                        cx="80"
                        cy="80"
                        fill="transparent"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="12"
                      />
                      <circle
                        className="text-primary transition-all duration-1000"
                        cx="80"
                        cy="80"
                        fill="transparent"
                        r="70"
                        stroke="currentColor"
                        strokeDasharray="440"
                        strokeDashoffset="25.5"
                        strokeWidth="12"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-on-surface">94.2%</span>
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                        Optimized
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_12px_32px_rgba(25,28,32,0.02)]">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-bold text-on-surface-variant">Space Utilization</p>
                      <span className="text-lg font-extrabold text-on-surface">76%</span>
                    </div>
                    <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full rounded-full" style={{ width: '76%' }} />
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_12px_32px_rgba(25,28,32,0.02)] relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-bold text-on-surface-variant">Staff Utilization</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-error bg-error/10 px-2 py-0.5 rounded-full">
                          Critical Load
                        </span>
                        <span className="text-lg font-extrabold text-on-surface">92%</span>
                      </div>
                    </div>
                    <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
                      <div className="bg-error h-full rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative rounded-2xl p-8 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-5" />
                <div className="absolute inset-0 border border-primary/10 rounded-2xl" />
                <div className="relative z-10 flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-primary/10 flex items-center justify-center shrink-0">
                    <MaterialIcon name="auto_awesome" className="text-primary text-3xl" filled />
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-primary mb-2">Predictive Capacity Analysis</h4>
                    <p className="text-on-surface text-lg leading-relaxed font-medium">
                      &quot;AI analysis suggests a{' '}
                      <span className="text-primary font-bold">15% increase</span> in demand for Speech Therapy by next
                      quarter. Recommendation: Consider opening 2 additional slots on Monday/Thursday afternoons.&quot;
                    </p>
                    <button
                      type="button"
                      className="mt-4 text-sm font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      View Full Projection <MaterialIcon name="arrow_forward" className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-surface-container-low rounded-2xl p-6 border border-[#BACAC3]/20">
                <h4 className="font-bold text-on-surface mb-6 flex items-center gap-2">
                  <MaterialIcon name="priority_high" className="text-primary" />
                  System Action Items
                </h4>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border-l-4 border-error shadow-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-bold text-error uppercase">Billing Discrepancy</span>
                      <span className="text-xs font-bold text-on-surface-variant">$1,240.00</span>
                    </div>
                    <p className="text-sm font-bold text-on-surface">Critical Billing Discrepancy</p>
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        className="text-[10px] font-bold px-3 py-1.5 bg-error text-white rounded-lg hover:bg-error/90 transition-colors"
                      >
                        Resolve Now
                      </button>
                      <button
                        type="button"
                        className="text-[10px] font-bold px-3 py-1.5 bg-surface-container text-on-surface-variant rounded-lg"
                      >
                        Ignore
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border-l-4 border-primary shadow-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-bold text-primary uppercase">Staffing Request</span>
                      <span className="text-xs font-medium text-on-surface-variant">Today</span>
                    </div>
                    <p className="text-sm font-bold text-on-surface">Permission Request (Dr. Aris)</p>
                    <div className="mt-3 flex gap-2">
                      <button type="button" className="text-[10px] font-bold px-3 py-1.5 bg-primary text-white rounded-lg">
                        Review Access
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border-l-4 border-outline shadow-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-bold text-outline uppercase">Clinical Compliance</span>
                      <span className="text-xs font-bold text-on-surface-variant">5 Pending</span>
                    </div>
                    <p className="text-sm font-bold text-on-surface">Unsigned Clinical Notes</p>
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        className="text-[10px] font-bold px-3 py-1.5 border border-outline-variant text-on-surface-variant rounded-lg"
                      >
                        Notify Staff
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-outline-variant/30">
                  <div className="bg-gradient-to-br from-on-background to-inverse-surface rounded-xl p-5 text-white shadow-xl">
                    <h5 className="text-sm font-bold mb-1 opacity-80">Security Audit</h5>
                    <p className="text-xs opacity-60 mb-4">Last audit performed 48 hours ago</p>
                    <button
                      type="button"
                      className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors"
                    >
                      Generate Compliance Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-surface-container-lowest rounded-2xl p-8 shadow-[0_12px_32px_rgba(25,28,32,0.02)] min-h-[300px] relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-xl font-extrabold text-on-surface tracking-tight">Active Therapist Presence</h4>
                  <button type="button" className="p-2 hover:bg-surface-container rounded-lg transition-colors">
                    <MaterialIcon name="open_in_new" className="text-on-surface-variant" />
                  </button>
                </div>

                <div className="flex items-end justify-between gap-4 h-40">
                  {[
                    'h-1/2',
                    'h-3/4',
                    'h-2/3',
                    'h-full',
                    'h-1/2',
                    'h-5/6',
                    'h-2/3',
                  ].map((height, idx) => (
                    <div key={idx} className={`flex-1 bg-primary/5 rounded-t-lg ${height} group relative`}>
                      <div className="absolute bottom-0 left-0 right-0 bg-primary/40 h-full origin-bottom transition-transform group-hover:scale-y-90" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                    <span
                      key={d}
                      className={`text-[10px] font-bold uppercase ${d === 'Wed' ? 'text-primary' : 'text-outline-variant'}`}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-container to-primary rounded-2xl p-8 flex flex-col justify-end relative overflow-hidden group shadow-xl shadow-primary/20">
              <img
                alt="clinical modern interior"
                className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay scale-110 group-hover:scale-100 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-Yzbuzcuq7UsGp_OAE_4gbknnMeScHIuHqy1oyLxZ19orFT6snvankQEMPFNs6hByRA0Zu2p36BKpRAIfsE0M-U-4mzrZFBKk4oQUvLr0lFqoIN64ISEek2xTDbzc2Vq5yR3KrFYxzB18h6Bo4VNg_BAXDQfSeICiyqzcOYZhbpoUz2d4o8mw3sAyO4HPsSemwSo3N36Z6-ZGtDDCliy7BRnLNgTP9LjyqopPVPbLcnzK-Tt99_DTU6Fqgi1FzpXH2lIS6SOzdA"
              />
              <div className="relative z-10 text-white">
                <h5 className="text-2xl font-extrabold tracking-tight mb-2">Facility Manager</h5>
                <p className="text-sm opacity-90 font-medium mb-6">
                  Review room allocation and sanitary compliance reports for the main wing.
                </p>
                <button
                  type="button"
                  className="px-6 py-2.5 bg-white text-primary rounded-xl font-bold text-sm shadow-lg hover:bg-on-primary transition-all active:scale-95"
                >
                  Open Console
                </button>
              </div>
            </div>
          </section>
        </div>
  );
}
