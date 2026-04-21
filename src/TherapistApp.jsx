import { useEffect, useMemo, useState } from "react";

const navSections = [
  {
    title: "My Schedule",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "dashboard" },
      { id: "schedule", label: "My Schedule", icon: "calendar" },
      { id: "allSchedule", label: "All Schedules", icon: "groupCalendar" },
    ],
  },
  {
    title: "Clinical",
    items: [
      { id: "sessions", label: "Session Notes", icon: "notes" },
      { id: "cover", label: "Cover Requests", icon: "swap", badge: "1" },
    ],
  },
  {
    title: "Personal",
    items: [
      { id: "payStatement", label: "Pay Statements", icon: "payments" },
      { id: "chat", label: "Staff Chat", icon: "chat" },
    ],
  },
];

const pageMeta = {
  dashboard: {
    title: "Dashboard",
    kicker: "Therapist snapshot for Dr. Priya Mehta",
  },
  schedule: {
    title: "My Schedule",
    kicker: "Week of March 16 - 22, 2026",
  },
  allSchedule: {
    title: "All Schedules",
    kicker: "Clinic-wide availability for cover coordination",
  },
  sessions: {
    title: "Session Notes",
    kicker: "Write notes, publish family summaries, and close open sessions",
  },
  cover: {
    title: "Cover Requests",
    kicker: "Incoming requests and your recent cover activity",
  },
  payStatement: {
    title: "Pay Statements",
    kicker: "Review deadline March 17, 2026 - payment date April 15, 2026",
  },
  chat: {
    title: "Staff Chat",
    kicker: "Team coordination and encrypted direct messages",
  },
};

const stats = [
  {
    eyebrow: "Workload",
    value: "5",
    label: "Sessions this week",
    detail: "Across clinic, virtual, and in-home visits",
    tone: "teal",
    icon: "calendar",
  },
  {
    eyebrow: "Today",
    value: "2",
    label: "Sessions today",
    detail: "ABA plus supervision block",
    tone: "sky",
    icon: "dashboard",
  },
  {
    eyebrow: "Coverage",
    value: "1",
    label: "Cover request",
    detail: "Awaiting your response",
    tone: "violet",
    icon: "swap",
  },
  {
    eyebrow: "Payroll",
    value: "48hr",
    label: "Pay review window",
    detail: "Confirm or dispute before cutoff",
    tone: "amber",
    icon: "payments",
  },
];

const upcomingSessions = [
  {
    time: "9:00 AM",
    type: "ABA Therapy",
    client: "Client #A12",
    location: "Brampton - Rm A",
    status: "Completed",
  },
  {
    time: "11:00 AM",
    type: "Supervision",
    client: "Client #C14",
    location: "Brampton - Clinical Room",
    status: "Completed",
  },
  {
    time: "Wed 10:00 AM",
    type: "ABA Therapy",
    client: "Client #A12",
    location: "Brampton - Rm A",
    status: "Scheduled",
  },
];

const dashboardActions = [
  {
    title: "Notes pending",
    detail: "Mar 14 ABA session for Client #B07 still needs notes.",
    tone: "amber",
    cta: "Write now",
    target: "sessions",
  },
  {
    title: "Incoming cover",
    detail: "James Okafor requested cover for Mar 20 at 10AM.",
    tone: "violet",
    cta: "Review",
    target: "cover",
  },
  {
    title: "Pay statement open",
    detail: "Review and confirm your Mar 1 - 15 statement.",
    tone: "sky",
    cta: "Open",
    target: "payStatement",
  },
];

const weekDays = [
  {
    day: "Mon 16",
    today: true,
    entries: [
      { time: "9AM", label: "ABA - A12", tone: "violet" },
      { time: "11AM", label: "Supervision", tone: "amber" },
    ],
  },
  { day: "Tue 17", entries: [] },
  {
    day: "Wed 18",
    entries: [{ time: "10AM", label: "ABA - A12", tone: "violet" }],
  },
  {
    day: "Thu 19",
    entries: [{ time: "9AM", label: "ABA - B07 (virtual)", tone: "sky" }],
  },
  {
    day: "Fri 20",
    entries: [{ time: "2PM", label: "ABA - E21 (in-home)", tone: "amber" }],
  },
  { day: "Sat 21", entries: [] },
  { day: "Sun 22", entries: [] },
];

const allScheduleRows = [
  ["Dr. Priya Mehta (you)", "ABA session", "-", "Supervision", "-", "-"],
  ["James Okafor", "Free", "Speech", "Free", "Speech", "Free"],
  ["Sara Nguyen", "OT", "Free", "OT", "-", "Free"],
  ["Daniel Park", "ABA", "ABA", "Free", "ABA", "Free"],
];

const sessionRows = [
  ["Mar 16 - 9AM", "Client #A12", "ABA", "Brampton", "Completed", "Write notes"],
  ["Mar 16 - 11AM", "Client #C14", "Supervision", "Brampton", "Completed", "Write notes"],
  ["Mar 18 - 10AM", "Client #A12", "ABA", "Brampton", "Scheduled", "After session"],
  ["Mar 14 - 9AM", "Client #B07", "ABA", "Virtual", "Notes pending", "Write now"],
];

const payRows = [
  ["Mar 1", "Client #A12", "ABA - In-person", "Primary", "60 min", "$XX.XX"],
  ["Mar 3", "Client #C14", "ABA - In-person", "Supervisor", "30 min", "$XX.XX"],
  ["Mar 5", "Client #A12", "ABA - Virtual", "Primary", "60 min", "$XX.XX"],
  ["Mar 8", "Client #B07", "ABA - In-person", "Assistant", "45 min", "$XX.XX"],
  ["Mar 10", "-", "Centre task", "Centre task", "60 min", "$XX.XX"],
];

const channels = [
  { name: "# all-staff", desc: "All clinic staff", activity: "Active", tone: "teal" },
  { name: "# cover-requests", desc: "Post open cover needs", activity: "Active", tone: "violet" },
  { name: "# brampton-clinic", desc: "Brampton team", activity: "Active", tone: "sky" },
  { name: "James Okafor", desc: "Direct message", activity: "Active", tone: "amber", direct: true },
  { name: "Sara Nguyen", desc: "Direct message", activity: "-", tone: "slate", direct: true },
];

const iconPaths = {
  dashboard: "M4 5h7v6H4zM13 5h7v10h-7zM4 13h7v6H4zM13 17h7v2h-7z",
  calendar: "M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
  groupCalendar: "M8 2v3M16 2v3M3 7h18M5 5h14a2 2 0 0 1 2 2v5M8 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 1v-1a3 3 0 0 0-3-3h-1",
  notes: "M6 4h12v16H6zM9 8h6M9 12h6M9 16h4",
  swap: "M8 7h11M15 3l4 4-4 4M16 17H5M9 13l-4 4 4 4",
  payments: "M3 7h18v10H3zM7 12h4M15 10h2M15 14h2",
  chat: "M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  bell: "M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0a3 3 0 0 1-6 0",
  help: "M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4M12 17h.01",
  arrowRight: "m9 18 6-6-6-6",
  plus: "M12 5v14M5 12h14",
};

const modalConfig = {
  sessionNotes: {
    title: "Session Notes - Client #A12",
    subtitle: "ABA Therapy - Mar 16, 2026 - 60 min - Brampton",
    fields: [
      {
        label: "Internal notes",
        helper: "Clinic-only and never shown to family",
        placeholder: "Clinical observations, data notes, supervisor feedback...",
      },
      {
        label: "Summary for family",
        helper: "Visible in the family portal and downloadable as PDF",
        placeholder: "Session highlights, progress update, home activities recommended...",
      },
    ],
    action: "Save & publish summary",
    toast: "Notes saved. Family summary published to portal.",
  },
  dispute: {
    title: "Raise Pay Statement Dispute",
    subtitle: "Your dispute will be sent to accounting immediately.",
    fields: [
      {
        label: "Which session?",
        helper: "Select the session or centre task with the issue",
        placeholder: "Mar 1 - Client #A12 - ABA 60min",
      },
      {
        label: "Reason for dispute",
        helper: "Example: session was 75 minutes, or session did not occur",
        placeholder: "Describe the issue in detail...",
      },
    ],
    action: "Submit dispute",
    toast: "Dispute submitted. Accounting will review before April 15 payment.",
  },
};

function Icon({ name, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`therapist-icon ${className}`.trim()}
      aria-hidden="true"
    >
      <path d={iconPaths[name]} />
    </svg>
  );
}

function TherapistApp() {
  const [activePage, setActivePage] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  const allItems = useMemo(() => navSections.flatMap((section) => section.items), []);
  const activeMeta = pageMeta[activePage];

  const navigate = (page) => {
    setActivePage(page);
    setMenuOpen(false);
  };

  return (
    <div className="therapist-shell">
      <div
        className={`therapist-mobile-backdrop ${menuOpen ? "visible" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      <aside className={`therapist-sidebar ${menuOpen ? "open" : ""}`}>
        <div className="therapist-brand">
          <div className="therapist-brand-mark">
            <span
              className="material-symbols-outlined therapist-logo-symbol"
              style={{ fontVariationSettings: "'FILL' 1" }}
              aria-hidden="true"
            >
              medical_services
            </span>
          </div>
          <div>
            <h1>AIM Therapist</h1>
            <p>Clinical Portal</p>
          </div>
        </div>

        <nav className="therapist-nav-groups">
          {navSections.map((section) => (
            <div key={section.title} className="therapist-nav-group">
              <p>{section.title}</p>
              <div className="therapist-nav-list">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`therapist-nav-item ${activePage === item.id ? "active" : ""}`}
                    onClick={() => navigate(item.id)}
                  >
                    <span className="therapist-nav-icon">
                      <Icon name={item.icon} />
                    </span>
                    <span>{item.label}</span>
                    {item.badge ? <span className="therapist-nav-badge">{item.badge}</span> : null}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <button className="therapist-primary-button" type="button" onClick={() => setModal("sessionNotes")}>
          <Icon name="plus" />
          Open Notes
        </button>

        <div className="therapist-sidebar-footer">
          <a href="#">Settings</a>
          <a href="#">Support</a>
        </div>
      </aside>

      <main className="therapist-main">
        <header className="therapist-topbar">
          <div className="therapist-topbar-left">
            <button className="therapist-menu-button" type="button" onClick={() => setMenuOpen((v) => !v)}>
              <span />
              <span />
              <span />
            </button>
            <div>
              <p>{activeMeta.kicker}</p>
              <h2>{activeMeta.title}</h2>
            </div>
          </div>

          <div className="therapist-topbar-right">
            <button className="therapist-icon-button" type="button" aria-label="Notifications">
              <span className="therapist-notif-dot" />
              <Icon name="bell" />
            </button>
            <button className="therapist-icon-button" type="button" aria-label="Help">
              <Icon name="help" />
            </button>
            <div className="therapist-header-profile">
              <div className="therapist-avatar">PM</div>
              <div>
                <strong>Dr. Priya Mehta</strong>
                <span>ABA Therapist - Brampton</span>
              </div>
            </div>
          </div>
        </header>

        <section className="therapist-content">
          {renderPage(activePage, navigate, setModal, setToast)}
        </section>
      </main>

      {modal ? (
        <TherapistModal
          modalKey={modal}
          onClose={() => setModal(null)}
          onConfirm={() => {
            setToast(modalConfig[modal].toast);
            setModal(null);
          }}
        />
      ) : null}

      {toast ? <div className="therapist-toast">{toast}</div> : null}
    </div>
  );
}

function renderPage(activePage, navigate, setModal, setToast) {
  switch (activePage) {
    case "dashboard":
      return (
        <>
          <div className="therapist-alert info">
            <strong>Therapist Dashboard</strong>
            <span>Stay on top of schedule, notes, cover, and pay in one view.</span>
          </div>

          <div className="therapist-stats-grid">
            {stats.map((stat) => (
              <article key={stat.label} className={`therapist-stat-card tone-${stat.tone}`}>
                <div className="therapist-stat-head">
                  <span className="therapist-stat-icon">
                    <Icon name={stat.icon} />
                  </span>
                  <span>{stat.eyebrow}</span>
                </div>
                <strong>{stat.value}</strong>
                <p>{stat.label}</p>
                <small>{stat.detail}</small>
              </article>
            ))}
          </div>

          <div className="therapist-grid">
            <section className="therapist-panel">
              <div className="therapist-panel-head">
                <h3>My upcoming sessions</h3>
                <button className="therapist-link-button" type="button" onClick={() => navigate("schedule")}>
                  Full schedule <Icon name="arrowRight" />
                </button>
              </div>
              <div className="therapist-session-list">
                {upcomingSessions.map((session) => (
                  <article key={`${session.time}-${session.client}`} className="therapist-session-card">
                    <div className="therapist-session-row">
                      <strong>{session.time}</strong>
                      <StatusPill status={session.status} />
                    </div>
                    <div className="therapist-badge-row">
                      <Badge tone={serviceTone(session.type)}>{serviceShort(session.type)}</Badge>
                      <span>{session.client}</span>
                    </div>
                    <p>{session.location}</p>
                  </article>
                ))}
              </div>
            </section>

            <div className="therapist-side-stack">
              <section className="therapist-panel">
                <div className="therapist-panel-head">
                  <h3>Action items</h3>
                </div>
                <div className="therapist-action-list">
                  {dashboardActions.map((action) => (
                    <div key={action.title} className="therapist-action-item">
                      <span className={`therapist-action-dot tone-${action.tone}`} />
                      <div>
                        <strong>{action.title}</strong>
                        <p>{action.detail}</p>
                      </div>
                      <button className="therapist-link-button" type="button" onClick={() => navigate(action.target)}>
                        {action.cta}
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="therapist-hero-card">
                <p>Clinical Readiness</p>
                <h3>All critical therapist tasks are in range</h3>
                <span>
                  One cover request and one note backlog item are still open. Everything
                  else is on track for this week.
                </span>
              </section>
            </div>
          </div>
        </>
      );

    case "schedule":
      return (
        <>
          <div className="therapist-toolbar">
            <div className="therapist-toggle-group">
              <button className="therapist-ghost-button neutral" type="button">Monthly</button>
              <button className="therapist-primary-button small" type="button">Weekly</button>
            </div>
          </div>

          <section className="therapist-panel">
            <div className="therapist-panel-head">
              <h3>Week of Mar 16-22, 2026 - Dr. Priya Mehta's schedule</h3>
            </div>
            <div className="therapist-calendar-grid">
              {weekDays.map((day) => (
                <article key={day.day} className={`therapist-day-card ${day.today ? "today" : ""}`}>
                  <strong>{day.day}</strong>
                  {day.today ? <small>Today</small> : null}
                  <div className="therapist-day-events">
                    {day.entries.length ? (
                      day.entries.map((entry) => (
                        <span key={`${entry.time}-${entry.label}`} className={`therapist-day-event tone-${entry.tone}`}>
                          {entry.time} - {entry.label}
                        </span>
                      ))
                    ) : (
                      <em>No sessions</em>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      );

    case "allSchedule":
      return (
        <>
          <div className="therapist-alert teal">
            <strong>Availability view</strong>
            <span>
              You can see all therapist availability to find cover. Other therapists'
              client names are hidden for privacy.
            </span>
          </div>

          <section className="therapist-panel">
            <div className="therapist-panel-head">
              <h3>All therapists - Mar 16 availability</h3>
            </div>
            <ResponsiveTable
              columns={["Therapist", "9AM", "10AM", "11AM", "2PM", "3PM"]}
              rows={allScheduleRows}
              renderDesktop={(row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  {row.slice(1).map((cell, index) => (
                    <td key={`${row[0]}-${index}`}>{availabilityCell(cell)}</td>
                  ))}
                </tr>
              )}
              renderMobile={(row) => (
                <article key={row[0]} className="therapist-mobile-card">
                  <div className="therapist-mobile-card-row">
                    <strong>{row[0]}</strong>
                  </div>
                  {["9AM", "10AM", "11AM", "2PM", "3PM"].map((slot, index) => (
                    <div key={`${row[0]}-${slot}`} className="therapist-mobile-line">
                      <span>{slot}</span>
                      <em>{renderAvailabilityText(row[index + 1])}</em>
                    </div>
                  ))}
                </article>
              )}
            />
          </section>
        </>
      );

    case "sessions":
      return (
        <>
          <div className="therapist-page-note">
            Click a session to write notes or mark complete.
          </div>
          <section className="therapist-panel">
            <ResponsiveTable
              columns={["Date", "Client", "Service", "Location", "Status", "Notes"]}
              rows={sessionRows}
              renderDesktop={(row) => (
                <tr key={row.join("-")}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td><Badge tone={serviceTone(row[2])}>{row[2]}</Badge></td>
                  <td>{row[3]}</td>
                  <td>{statusBadge(row[4])}</td>
                  <td>
                    {row[5] === "After session" ? (
                      <span className="therapist-muted">{row[5]}</span>
                    ) : (
                      <button className="therapist-link-button" type="button" onClick={() => setModal("sessionNotes")}>
                        {row[5]}
                      </button>
                    )}
                  </td>
                </tr>
              )}
              renderMobile={(row) => (
                <article key={row.join("-")} className="therapist-mobile-card">
                  <div className="therapist-mobile-card-row">
                    <strong>{row[0]}</strong>
                    {statusBadge(row[4])}
                  </div>
                  <div className="therapist-badge-row">
                    <Badge tone={serviceTone(row[2])}>{row[2]}</Badge>
                    <span>{row[1]}</span>
                  </div>
                  <p>{row[3]}</p>
                  {row[5] === "After session" ? (
                    <em>{row[5]}</em>
                  ) : (
                    <button className="therapist-link-button" type="button" onClick={() => setModal("sessionNotes")}>
                      {row[5]}
                    </button>
                  )}
                </article>
              )}
            />
          </section>
        </>
      );

    case "cover":
      return (
        <>
          <div className="therapist-alert amber">
            <strong>Cover request received</strong>
            <span>
              James Okafor requested cover for an ABA session on Mar 20 at 10AM.
            </span>
          </div>

          <div className="therapist-grid">
            <section className="therapist-panel">
              <div className="therapist-panel-head">
                <h3>Incoming cover request</h3>
              </div>
              <div className="therapist-callout">
                <strong>Session to cover</strong>
                <p>ABA Therapy - Mar 20, 2026 - 10:00 to 11:00 AM</p>
                <p>Brampton - Room A - Client name hidden</p>
                <small>Requested by James Okafor: "Personal appointment, can't make it"</small>
              </div>
              <div className="therapist-inline-actions">
                <button className="therapist-primary-button small" type="button" onClick={() => setToast("Cover accepted. Admin will confirm and your schedule will update.")}>
                  Accept cover
                </button>
                <button className="therapist-ghost-button neutral" type="button" onClick={() => setToast("Cover declined. James will try another therapist.")}>
                  Decline
                </button>
              </div>
            </section>

            <section className="therapist-panel">
              <div className="therapist-panel-head">
                <h3>My cover request history</h3>
              </div>
              <div className="therapist-action-list">
                <div className="therapist-action-item">
                  <span className="therapist-action-dot tone-teal" />
                  <div>
                    <strong>Approved cover</strong>
                    <p>Mar 12 - ABA session covered by James Okafor.</p>
                  </div>
                  <Badge tone="teal">Approved by admin</Badge>
                </div>
                <div className="therapist-action-item">
                  <span className="therapist-action-dot tone-slate" />
                  <div>
                    <strong>No cover found</strong>
                    <p>Feb 28 - Speech session - no available therapist.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      );

    case "payStatement":
      return (
        <>
          <div className="therapist-alert amber">
            <strong>Review deadline</strong>
            <span>
              March 17, 2026. If no action is taken, the statement auto-confirms.
              Payment date is April 15, 2026.
            </span>
          </div>

          <section className="therapist-panel">
            <div className="therapist-panel-head">
              <h3>Pay statement - Mar 1-15, 2026</h3>
              <div className="therapist-inline-actions">
                <button className="therapist-ghost-button neutral" type="button">Download PDF</button>
                <button className="therapist-ghost-button warn" type="button" onClick={() => setModal("dispute")}>
                  Raise dispute
                </button>
                <button className="therapist-primary-button small" type="button" onClick={() => setToast("Pay statement confirmed. Payment will be processed on April 15.")}>
                  Confirm
                </button>
              </div>
            </div>

            <ResponsiveTable
              columns={["Date", "Client", "Service", "Role", "Duration", "Amount"]}
              rows={payRows}
              renderDesktop={(row) => (
                <tr key={row.join("-")}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td><Badge tone={roleTone(row[3])}>{row[3]}</Badge></td>
                  <td>{row[4]}</td>
                  <td>{row[5]}</td>
                </tr>
              )}
              renderMobile={(row) => (
                <article key={row.join("-")} className="therapist-mobile-card">
                  <div className="therapist-mobile-card-row">
                    <strong>{row[0]}</strong>
                    <span>{row[5]}</span>
                  </div>
                  <p>{row[1]}</p>
                  <div className="therapist-badge-row">
                    <Badge tone={roleTone(row[3])}>{row[3]}</Badge>
                    <span>{row[4]}</span>
                  </div>
                  <em>{row[2]}</em>
                </article>
              )}
            />

            <div className="therapist-summary-bar">
              <span>Pay rates are shown as totals only - individual rates not displayed.</span>
              <strong>Total: $XXX.XX</strong>
            </div>
          </section>
        </>
      );

    case "chat":
      return (
        <div className="therapist-grid">
          <section className="therapist-panel chat-panel">
            <div className="therapist-panel-head">
              <h3># all-staff</h3>
            </div>
            <div className="therapist-chat-stream">
              <ChatMessage
                initials="SA"
                tone="sky"
                text="Reminder: Monday invoice review deadline today by 5PM. Please confirm your sessions are marked."
                meta="Sarah Ahmed (Admin) - 8:02AM"
              />
              <ChatMessage
                initials="JP"
                tone="amber"
                text="Hey, does anyone have availability Thu 2PM to cover an ABA session? I have a conflict."
                meta="James Okafor - 9:14AM"
              />
              <ChatMessage
                initials="PM"
                tone="teal"
                own
                text="I'm free Thursday 2PM. Sending you a cover request now."
                meta="You - 9:22AM"
              />
              <ChatMessage
                initials="JP"
                tone="amber"
                text="Amazing thank you. Request sent."
                meta="James Okafor - 9:23AM"
              />
            </div>
            <div className="therapist-compose">
              <input className="therapist-input" placeholder="Message #all-staff..." />
              <button className="therapist-primary-button small" type="button" onClick={() => setToast("Message sent to #all-staff.")}>
                Send
              </button>
            </div>
          </section>

          <section className="therapist-panel">
            <div className="therapist-panel-head">
              <h3>Channels & direct messages</h3>
            </div>
            <div className="therapist-channel-list">
              {channels.map((channel) => (
                <button
                  key={channel.name}
                  type="button"
                  className="therapist-channel-row"
                  onClick={() => setToast(`${channel.name} opened.`)}
                >
                  <span className={`therapist-channel-avatar tone-${channel.tone}`}>
                    {channel.direct ? "DM" : "#"}
                  </span>
                  <div>
                    <strong>{channel.direct ? `Direct: ${channel.name}` : channel.name}</strong>
                    <p>{channel.desc}</p>
                  </div>
                  <Badge tone={channel.tone}>{channel.activity}</Badge>
                </button>
              ))}
            </div>
            <div className="therapist-encryption-note">
              Direct messages are encrypted end-to-end. Admin and management cannot
              read DMs.
            </div>
          </section>
        </div>
      );

    default:
      return null;
  }
}

function TherapistModal({ modalKey, onClose, onConfirm }) {
  const modal = modalConfig[modalKey];
  if (!modal) return null;

  return (
    <div className="therapist-modal-backdrop" onClick={onClose} role="presentation">
      <div className="therapist-modal-card" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <div className="therapist-modal-head">
          <div>
            <h3>{modal.title}</h3>
            <p>{modal.subtitle}</p>
          </div>
        </div>
        <div className="therapist-modal-fields">
          {modal.fields.map((field) => (
            <label key={field.label} className="therapist-modal-field">
              <span>{field.label}</span>
              <small>{field.helper}</small>
              <textarea placeholder={field.placeholder} />
            </label>
          ))}
        </div>
        <div className="therapist-modal-actions">
          <button className="therapist-ghost-button neutral" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="therapist-primary-button small" type="button" onClick={onConfirm}>
            {modal.action}
          </button>
        </div>
      </div>
    </div>
  );
}

function ResponsiveTable({ columns, rows, renderDesktop, renderMobile }) {
  return (
    <>
      <div className="therapist-desktop-table">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>{rows.map(renderDesktop)}</tbody>
        </table>
      </div>
      <div className="therapist-mobile-stack">{rows.map(renderMobile)}</div>
    </>
  );
}

function ChatMessage({ initials, tone, text, meta, own = false }) {
  return (
    <div className={`therapist-chat-message ${own ? "own" : ""}`}>
      <span className={`therapist-channel-avatar tone-${tone}`}>{initials}</span>
      <div className="therapist-chat-copy">
        <div className={`therapist-chat-bubble ${own ? "own" : ""}`}>{text}</div>
        <small>{meta}</small>
      </div>
    </div>
  );
}

function Badge({ children, tone }) {
  return <span className={`therapist-badge tone-${tone}`}>{children}</span>;
}

function StatusPill({ status }) {
  return <span className={`therapist-status ${status.toLowerCase().replace(/\s+/g, "-")}`}>{status}</span>;
}

function availabilityCell(cell) {
  if (cell === "Free") return <span className="therapist-free">Free ✓</span>;
  if (cell === "-") return <span className="therapist-muted">-</span>;
  return <Badge tone={serviceTone(cell)}>{cell}</Badge>;
}

function renderAvailabilityText(cell) {
  if (cell === "Free") return "Free ✓";
  return cell;
}

function statusBadge(status) {
  const toneMap = {
    Completed: "teal",
    Scheduled: "sky",
    "Notes pending": "amber",
  };
  return <Badge tone={toneMap[status] ?? "slate"}>{status}</Badge>;
}

function serviceTone(value) {
  const label = value.toLowerCase();
  if (label.includes("aba")) return "violet";
  if (label.includes("speech")) return "sky";
  if (label.includes("supervision")) return "amber";
  if (label.includes("ot")) return "amber";
  return "slate";
}

function roleTone(value) {
  const label = value.toLowerCase();
  if (label.includes("primary")) return "violet";
  if (label.includes("supervisor")) return "amber";
  if (label.includes("assistant")) return "teal";
  if (label.includes("centre")) return "rose";
  return "slate";
}

function serviceShort(value) {
  if (value.includes("ABA")) return "ABA";
  if (value.includes("Supervision")) return "Supervision";
  return value;
}

export default TherapistApp;
