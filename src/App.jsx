import { useEffect, useMemo, useState } from "react";

const navSections = [
  {
    title: "Daily Ops",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "dashboard", badge: "8" },
      { id: "schedule", label: "Scheduling", icon: "calendar" },
      { id: "intake", label: "Intake Pipeline", icon: "pipeline", badge: "4" },
    ],
  },
  {
    title: "Manage",
    items: [
      { id: "clients", label: "Clients", icon: "users" },
      { id: "therapists", label: "Therapists", icon: "medical" },
      { id: "actions", label: "Pending Actions", icon: "checkSquare", badge: "6" },
    ],
  },
  {
    title: "Communicate",
    items: [
      { id: "messages", label: "Messages", icon: "chat" },
      { id: "reports", label: "Reports", icon: "report" },
    ],
  },
];

const pageMeta = {
  dashboard: { title: "Dashboard", kicker: "Overview for Monday, March 16, 2026" },
  schedule: { title: "Scheduling", kicker: "Weekly operations calendar for Mar 16 - Mar 22, 2026" },
  intake: { title: "Intake Pipeline", kicker: "Paid submissions, activation steps, and intake scheduling" },
  clients: { title: "Clients", kicker: "Active caseload, intake statuses, and service assignments" },
  therapists: { title: "Therapists", kicker: "Roster coverage, utilisation, and upcoming availability" },
  actions: { title: "Pending Actions", kicker: "Invoices, reschedules, and cover approvals requiring attention" },
  messages: { title: "Messages", kicker: "Family communication and active conversation threads" },
  reports: { title: "Reports", kicker: "Operations, billing, and clinic performance snapshots" },
};

const dashboardStats = [
  {
    eyebrow: "Daily Schedule",
    value: "12",
    label: "Sessions today",
    detail: "Brampton + Mississauga",
    tone: "sky",
    icon: "calendar",
  },
  {
    eyebrow: "Review Queue",
    value: "6",
    label: "Invoices to review",
    detail: "Due before Tuesday 9AM",
    tone: "amber",
    icon: "invoice",
  },
  {
    eyebrow: "Urgent Follow-Up",
    value: "1",
    label: "Unmarked sessions",
    detail: "Chase therapist submission",
    tone: "rose",
    icon: "alert",
  },
  {
    eyebrow: "Pipeline",
    value: "4",
    label: "New intake submissions",
    detail: "All paid and awaiting review",
    tone: "teal",
    icon: "userPlus",
  },
];

const todaySessions = [
  {
    time: "9:00 AM",
    service: "ABA Therapy",
    client: "Client #A12",
    therapist: "Dr. Priya Mehta",
    location: "Brampton - Rm A",
    status: "Completed",
  },
  {
    time: "10:00 AM",
    service: "OT Therapy",
    client: "Client #C14",
    therapist: "Sara Nguyen",
    location: "Brampton - Rm B",
    status: "In Progress",
  },
  {
    time: "11:00 AM",
    service: "Speech Therapy",
    client: "Client #D03",
    therapist: "James Okafor",
    location: "Virtual",
    status: "Scheduled",
  },
  {
    time: "2:00 PM",
    service: "ABA Therapy",
    client: "Client #E21",
    therapist: "Daniel Park",
    location: "In-home",
    status: "No Show",
  },
  {
    time: "3:00 PM",
    service: "ABA Therapy",
    client: "Client #B07",
    therapist: "Dr. Priya Mehta",
    location: "Brampton - Rm A",
    status: "Scheduled",
  },
];

const dashboardActions = [
  {
    title: "Invoice review",
    detail: "6 clients pending review before Tuesday send",
    tone: "amber",
    action: "Review",
    page: "actions",
  },
  {
    title: "Reschedule request",
    detail: "Client #A12 asked to move Mar 18 ABA session",
    tone: "sky",
    action: "Approve",
    page: "actions",
  },
  {
    title: "Session unmarked",
    detail: "Dr. Priya Mehta still needs to submit Mar 14 note",
    tone: "rose",
    action: "Chase",
  },
  {
    title: "New intake",
    detail: "ABA + Speech submission paid and ready for review",
    tone: "teal",
    action: "Review",
    page: "intake",
  },
  {
    title: "Cover approval",
    detail: "Dr. Priya to James Okafor needs admin confirmation",
    tone: "violet",
    action: "Approve",
    page: "actions",
  },
];

const weeklySchedule = [
  ["Mon 9:00AM", "Client #A12", "ABA", "Dr. Priya Mehta", "Brampton - Rm A", "Completed", "View notes"],
  ["Mon 10:00AM", "Client #C14", "OT", "Sara Nguyen", "Brampton - Rm B", "Completed", "View notes"],
  ["Tue 9:00AM", "Client #B07", "ABA", "Daniel Park", "Mississauga", "Scheduled", "Edit / Cancel"],
  ["Tue 11:00AM", "Client #D03", "Speech", "James Okafor", "Virtual", "Scheduled", "Edit / Cancel"],
  ["Wed 10:00AM", "Client #A12", "ABA", "James Okafor (Covered)", "Brampton - Rm A", "Scheduled", "View chain"],
  ["Thu 2:00PM", "Client #E21", "ABA", "Dr. Priya Mehta", "In-home", "No Show", "View charge"],
];

const intakeStats = [
  { value: "4", label: "New submissions", detail: "All paid", tone: "amber" },
  { value: "2", label: "Intake in progress", detail: "Awaiting assessment", tone: "sky" },
  { value: "1", label: "Pending activation", detail: "Invite not opened", tone: "rose" },
  { value: "47", label: "Active clients", detail: "+4 this month", tone: "teal" },
];

const intakeRows = [
  ["Johnson family", "Child: Liam, 5yrs", ["ABA", "Speech"], "$350", "Invite not opened", "Resend portal invite", "Resend / View"],
  ["Patel family", "Child: Aanya, 7yrs", ["OT"], "$275", "Intake scheduled", "Part 1 - Mar 20 virtual", "View / Reschedule"],
  ["Chen family", "Child: Dylan, 6yrs", ["ABA", "Speech", "OT"], "$550", "New - needs review", "Assign therapist + book", "Review"],
  ["Rahman family", "Child: Zara, 4yrs", ["ABA"], "$275", "Active client", "Regular sessions booked", "View profile"],
];

const clientRows = [
  ["Client #A12", "[Name protected - click to view]", ["ABA", "Speech"], "Dr. Priya Mehta", "Brampton", "Brampton", "Active", "View / Schedule"],
  ["Client #B07", "", ["ABA"], "Daniel Park", "Mississauga", "Mississauga", "Active", "View / Schedule"],
  ["Client #C14", "", ["OT"], "Sara Nguyen", "Brampton", "Custom", "Intake", "View / Book intake"],
  ["Client #D03", "", ["Speech"], "James Okafor", "Virtual", "Mississauga", "Active", "View / Schedule"],
  ["Client #E21", "", ["ABA", "OT"], "Dr. Priya Mehta", "In-home", "Brampton", "Outstanding $2,800", "View / Flag"],
];

const therapistStats = [
  { value: "8", label: "Active therapists", detail: "Across both locations", tone: "teal" },
  { value: "87%", label: "Utilisation", detail: "Rolling 30-day average", tone: "sky" },
  { value: "1", label: "Cover request", detail: "Awaiting admin confirmation", tone: "violet" },
  { value: "2", label: "Availability gaps", detail: "Thursday afternoon", tone: "amber" },
];

const therapistRows = [
  ["Dr. Priya Mehta", "ABA", "Brampton", "12 this week", "1 cover to approve", "High", "View roster"],
  ["James Okafor", "Speech / ABA", "Mississauga", "10 this week", "Accepted Wed cover", "Medium", "View roster"],
  ["Sara Nguyen", "OT", "Brampton", "8 this week", "Awaiting notes sign-off", "Medium", "View roster"],
  ["Daniel Park", "ABA", "Mississauga", "14 this week", "No-show follow-up on Client #E21", "High", "View roster"],
  ["Aisha Rahman", "ABA", "In-home", "6 this week", "Open for Friday PM intake pairing", "Low", "Assign"],
];

const pendingInvoiceItems = [
  "Client #A12 - 3 sessions + 15min late pickup; draft needs extra line item",
  "Client #B07 - 2 sessions + 1 late cancel; verify cancellation charge",
  "Client #C14 - 2 sessions ready to approve",
  "Client #D03 - 3 sessions ready to approve",
];

const requestCards = [
  {
    title: "Reschedule requests",
    tone: "sky",
    items: [
      "Client #A12 rescheduling Mar 18 ABA due to dentist appointment",
      "Client #B07 cancelling Mar 19 Speech due to travel",
    ],
  },
  {
    title: "Cover approval",
    tone: "violet",
    items: ["Dr. Priya -> James Okafor, Mar 18 ABA 10AM, therapist accepted"],
  },
];

const messageThreads = [
  ["Johnson family", "Liam - ABA, Speech", "Perfect, thank you so much!", "2m ago", "coral"],
  ["Patel family", "Aanya - OT", "When is the Part 2 appointment?", "1h ago", "amber"],
  ["Chen family", "Dylan - ABA, Speech, OT", "Thanks for the confirmation email", "3h ago", "teal"],
  ["Rahman family", "Zara - ABA", "Will she have the same therapist?", "Yesterday", "violet"],
];

const reportStats = [
  { value: "94%", label: "Attendance rate", detail: "Sessions completed as planned", tone: "teal" },
  { value: "6.2%", label: "Cancellation rate", detail: "Rolling monthly average", tone: "amber" },
  { value: "$3,420", label: "Outstanding invoices", detail: "4 overdue accounts", tone: "rose" },
  { value: "68 / 32", label: "Clinic split", detail: "Brampton vs Mississauga", tone: "sky" },
];

const reportRows = [
  ["March KPI report", "Operations", "Ready", "Attendance, utilisation, intake conversion", "Open"],
  ["Weekly invoice risk list", "Billing", "Updated today", "Outstanding balances and threshold warnings", "Review"],
  ["Therapist utilisation snapshot", "Staffing", "Updated today", "Coverage, cover requests, and idle windows", "Open"],
  ["Intake conversion funnel", "Growth", "Ready", "Paid submissions through active-client activation", "Open"],
];

const modals = {
  bookSession: {
    title: "Book New Session",
    subtitle: "All session data is encrypted and HIPAA-compliant.",
    sections: [
      ["Client", "Search by name or ID"],
      ["Therapist", "Dr. Priya Mehta"],
      ["Service type", "ABA Therapy"],
      ["Location", "Brampton"],
      ["Date", "2026-03-18"],
      ["Time", "9:00 AM"],
    ],
    note: "All client data is encrypted at rest and in transit. Access is logged for HIPAA audit compliance.",
    confirm: "Book session",
  },
  addClient: {
    title: "Add New Client",
    subtitle: "All fields are HIPAA-protected and encrypted.",
    sections: [
      ["Child's full name", "Legal name"],
      ["Date of birth", "YYYY-MM-DD"],
      ["Parent or guardian", "Full name"],
      ["Email", "family@email.com"],
      ["Services", "ABA + Speech"],
      ["Price group", "Brampton"],
    ],
    note: "Rates are set by Accounting separately. Admin assigns the price group name only.",
    confirm: "Create client",
  },
  invoiceReview: {
    title: "Invoice Review - Client #A12",
    subtitle: "Week of Mar 10-16, 2026 - Draft invoice",
    sections: [
      ["ABA Therapy - Mar 11 - 60 min", "$XX.XX"],
      ["ABA Therapy - Mar 13 - 60 min", "$XX.XX"],
      ["ABA Therapy - Mar 16 - 60 min", "$XX.XX"],
      ["Late pickup Mar 16 - 15 min", "$XX.XX"],
    ],
    note: "Approve once service codes match authorization letters and extra time is captured.",
    confirm: "Approve invoice",
  },
};

const iconPaths = {
  clinic:
    "M8 7V6a4 4 0 1 1 8 0v1h1.5A2.5 2.5 0 0 1 20 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-8A2.5 2.5 0 0 1 6.5 7H8zm2 0h4V6a2 2 0 1 0-4 0v1zm1 3v2H9v2h2v2h2v-2h2v-2h-2v-2h-2z",
  dashboard:
    "M4 5h7v6H4zM13 5h7v10h-7zM4 13h7v6H4zM13 17h7v2h-7z",
  calendar:
    "M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
  pipeline:
    "M5 6h6v4H5zM13 14h6v4h-6zM11 8h2v2h-2zM9 16h2v2H9zM11 9v6",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  medical:
    "M9 4h6v4h4v6h-4v6H9v-6H5V8h4z",
  checkSquare:
    "M9 11l2 2 4-4M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z",
  chat:
    "M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  report:
    "M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm8 1v5h5M8 13h8M8 17h8M8 9h3",
  invoice:
    "M7 3h8l4 4v14H7zM15 3v5h5M10 12h6M10 16h6",
  alert:
    "M12 9v4M12 17h.01M10.29 3.86 1.82 3.3a2 2 0 0 1 3.46 0l8.47 15.3A2 2 0 0 1 20.47 21H3.53a2 2 0 0 1-1.75-2.84z",
  userPlus:
    "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M19 8v6M16 11h6",
  bell:
    "M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0a3 3 0 0 1-6 0",
  help:
    "M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4M12 17h.01",
  filter:
    "M4 5h16M7 12h10M10 19h4",
  plus:
    "M12 5v14M5 12h14",
  arrowRight:
    "m9 18 6-6-6-6",
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
      className={`icon ${className}`.trim()}
      aria-hidden="true"
    >
      <path d={iconPaths[name]} />
    </svg>
  );
}

function Badge({ children, tone = "slate" }) {
  return <span className={`badge tone-${tone}`}>{children}</span>;
}

function StatusPill({ status }) {
  const key = status.toLowerCase().replace(/\s+/g, "-");
  return <span className={`status-pill ${key}`}>{status}</span>;
}

function StatCard({ stat, compact = false }) {
  return (
    <article className={`stat-card tone-${stat.tone} ${compact ? "is-compact" : ""}`}>
      <div className="stat-header">
        <span className="stat-icon">
          <Icon name={stat.icon ?? "report"} />
        </span>
        <span className="stat-eyebrow">{stat.eyebrow ?? stat.label}</span>
      </div>
      <div>
        <strong>{stat.value}</strong>
        <p>{stat.label}</p>
        <span>{stat.detail}</span>
      </div>
    </article>
  );
}

function Panel({ title, action, children, className = "" }) {
  return (
    <article className={`panel ${className}`.trim()}>
      {(title || action) && (
        <div className="panel-header">
          <h3>{title}</h3>
          {action}
        </div>
      )}
      {children}
    </article>
  );
}

function Table({ columns, rows, renderRow, mobileRender }) {
  return (
    <>
      <div className="desktop-table">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => renderRow(row, index))}
          </tbody>
        </table>
      </div>
      {mobileRender && <div className="mobile-stack">{rows.map((row, index) => mobileRender(row, index))}</div>}
    </>
  );
}

function Modal({ modalKey, onClose, onConfirm, showToast }) {
  const modal = modals[modalKey];

  if (!modal) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="modal-card" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-head">
          <div>
            <h3>{modal.title}</h3>
            <p>{modal.subtitle}</p>
          </div>
          <button className="icon-button subtle" type="button" onClick={onClose} aria-label="Close dialog">
            <Icon name="help" className="close-rotated" />
          </button>
        </div>
        <div className="modal-grid">
          {modal.sections.map(([label, value]) => (
            <label key={label} className="modal-field">
              <span>{label}</span>
              <input readOnly value={value} />
            </label>
          ))}
        </div>
        <p className="modal-note">{modal.note}</p>
        <div className="modal-actions">
          <button className="ghost-button neutral" type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="primary-button"
            type="button"
            onClick={() => {
              onConfirm();
              showToast(`${modal.confirm} queued successfully.`);
            }}
          >
            {modal.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [modalKey, setModalKey] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const timer = setTimeout(() => setToastMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const flatNav = useMemo(
    () => navSections.flatMap((section) => section.items),
    [],
  );

  const activeMeta = pageMeta[activePage];

  const selectPage = (page) => {
    setActivePage(page);
    setMenuOpen(false);
  };

  const showToast = (message) => setToastMessage(message);

  return (
    <div className="app-shell">
      <div
        className={`mobile-backdrop ${menuOpen ? "is-visible" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      <aside className={`sidebar ${menuOpen ? "is-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <span
              className="material-symbols-outlined brand-symbol"
              style={{ fontVariationSettings: "'FILL' 1" }}
              aria-hidden="true"
            >
              medical_services
            </span>
          </div>
          <div>
            <h1>AIM Admin</h1>
            <p>Clinic Management Portal</p>
          </div>
        </div>

        <nav className="sidebar-sections">
          {navSections.map((section) => (
            <div key={section.title} className="sidebar-group">
              <p className="sidebar-label">{section.title}</p>
              <div className="sidebar-nav">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`nav-link ${activePage === item.id ? "active" : ""}`}
                    onClick={() => selectPage(item.id)}
                  >
                    <span className="nav-icon">
                      <Icon name={item.icon} />
                    </span>
                    <span>{item.label}</span>
                    {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <button className="primary-button" type="button" onClick={() => setModalKey("bookSession")}>
          <Icon name="plus" />
          New Appointment
        </button>

        <div className="sidebar-footer">
          <a href="#">Settings</a>
          <a href="#">Support</a>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="menu-button"
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
            >
              <span />
              <span />
              <span />
            </button>
            <div>
              <p className="page-kicker">{activeMeta.kicker}</p>
              <h2>{activeMeta.title}</h2>
            </div>
          </div>

          <div className="topbar-right">
            <button className="icon-button" type="button" aria-label="Notifications">
              <span className="notification-dot" />
              <Icon name="bell" />
            </button>
            <button className="icon-button" type="button" aria-label="Help">
              <Icon name="help" />
            </button>
            <div className="profile-card">
              <div className="avatar">SA</div>
              <div>
                <strong>Sarah Ahmed</strong>
                <span>Admin - Brampton</span>
              </div>
            </div>
          </div>
        </header>

        <section className="content-grid">{renderPage(activePage, selectPage, setModalKey, showToast)}</section>
      </main>

      {modalKey ? (
        <Modal
          modalKey={modalKey}
          onClose={() => setModalKey(null)}
          onConfirm={() => setModalKey(null)}
          showToast={showToast}
        />
      ) : null}

      {toastMessage ? <div className="toast">{toastMessage}</div> : null}
    </div>
  );
}

function renderPage(activePage, selectPage, setModalKey, showToast) {
  switch (activePage) {
    case "dashboard":
      return (
        <>
          <div className="alert-banner">
            <div className="alert-icon">!</div>
            <div>
              <h3>Monday review due today</h3>
              <p>
                6 client invoices need review before Tuesday 9AM invoice run.
                Ensure all service codes match authorization letters.
              </p>
            </div>
            <button className="ghost-button" type="button" onClick={() => selectPage("actions")}>
              Review now
            </button>
          </div>

          <section className="stats-grid">
            {dashboardStats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </section>

          <section className="dashboard-grid">
            <Panel
              title="Today's sessions"
              action={
                <button className="text-link" type="button" onClick={() => selectPage("schedule")}>
                  Full calendar <Icon name="arrowRight" />
                </button>
              }
            >
              <Table
                columns={["Time", "Service", "Client", "Therapist", "Location", "Status"]}
                rows={todaySessions}
                renderRow={(session) => (
                  <tr key={`${session.time}-${session.client}`}>
                    <td>{session.time}</td>
                    <td>
                      <Badge tone={serviceTone(session.service)}>{serviceShort(session.service)}</Badge>
                    </td>
                    <td>{session.client}</td>
                    <td>{session.therapist}</td>
                    <td>{session.location}</td>
                    <td>
                      <StatusPill status={session.status} />
                    </td>
                  </tr>
                )}
                mobileRender={(session) => (
                  <article key={`${session.time}-${session.client}`} className="mobile-card">
                    <div className="mobile-card-row">
                      <strong>{session.time}</strong>
                      <StatusPill status={session.status} />
                    </div>
                    <div className="mobile-meta">
                      <Badge tone={serviceTone(session.service)}>{serviceShort(session.service)}</Badge>
                      <span>{session.client}</span>
                    </div>
                    <p>{session.therapist}</p>
                    <span>{session.location}</span>
                  </article>
                )}
              />
            </Panel>

            <div className="side-stack">
              <Panel title="Action items">
                <div className="action-list">
                  {dashboardActions.map((action) => (
                    <div key={action.title} className="action-item">
                      <span className={`action-dot tone-${action.tone}`} />
                      <div>
                        <strong>{action.title}</strong>
                        <p>{action.detail}</p>
                      </div>
                      <button
                        className="text-link"
                        type="button"
                        onClick={() => (action.page ? selectPage(action.page) : showToast(`${action.title} opened.`))}
                      >
                        {action.action}
                      </button>
                    </div>
                  ))}
                </div>
              </Panel>

              <article className="performance-card">
                <div>
                  <p className="performance-kicker">Clinic Performance</p>
                  <h3>88% roster utilisation</h3>
                  <p className="performance-copy">
                    The current therapist roster is near optimal capacity with enough space
                    to absorb high-priority intake conversions this week.
                  </p>
                </div>
                <div className="chart-bars" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </article>
            </div>
          </section>
        </>
      );

    case "schedule":
      return (
        <>
          <div className="toolbar">
            <div className="toolbar-group">
              <button className="ghost-button neutral" type="button">
                Prev week
              </button>
              <div className="toolbar-label">Mar 16 - Mar 22, 2026</div>
              <button className="ghost-button neutral" type="button">
                Next week
              </button>
            </div>
            <div className="toolbar-group wrap">
              <span className="toolbar-filter">
                <Icon name="filter" /> Filter
              </span>
              <Badge tone="violet">Brampton</Badge>
              <Badge tone="sky">Mississauga</Badge>
              <Badge tone="amber">In-home</Badge>
              <Badge tone="rose">Virtual</Badge>
              <button className="primary-button" type="button" onClick={() => setModalKey("bookSession")}>
                <Icon name="plus" />
                Book session
              </button>
            </div>
          </div>

          <Panel title="Weekly schedule">
            <Table
              columns={["Time", "Client", "Service", "Therapist", "Location", "Status", "Actions"]}
              rows={weeklySchedule}
              renderRow={(row) => (
                <tr key={row.join("-")}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>
                    <Badge tone={serviceTone(row[2])}>{row[2]}</Badge>
                  </td>
                  <td>{row[3]}</td>
                  <td>{row[4]}</td>
                  <td>
                    <StatusPill status={row[5]} />
                  </td>
                  <td>{row[6]}</td>
                </tr>
              )}
              mobileRender={(row) => (
                <article key={row.join("-")} className="mobile-card">
                  <div className="mobile-card-row">
                    <strong>{row[0]}</strong>
                    <StatusPill status={row[5]} />
                  </div>
                  <div className="mobile-meta">
                    <Badge tone={serviceTone(row[2])}>{row[2]}</Badge>
                    <span>{row[1]}</span>
                  </div>
                  <p>{row[3]}</p>
                  <span>{row[4]}</span>
                  <em>{row[6]}</em>
                </article>
              )}
            />
          </Panel>
        </>
      );

    case "intake":
      return (
        <>
          <section className="stats-grid">
            {intakeStats.map((stat) => (
              <StatCard key={stat.label} stat={{ ...stat, eyebrow: stat.label, icon: "report" }} compact />
            ))}
          </section>

          <Panel
            title="Intake pipeline"
            action={
              <button className="primary-button compact" type="button" onClick={() => setModalKey("addClient")}>
                <Icon name="plus" />
                Manual entry
              </button>
            }
          >
            <Table
              columns={["Family", "Services", "Paid", "Status", "Next step", "Actions"]}
              rows={intakeRows}
              renderRow={(row) => (
                <tr key={row[0]}>
                  <td>
                    <strong>{row[0]}</strong>
                    <div className="subtext">{row[1]}</div>
                  </td>
                  <td>{row[2].map((service) => <Badge key={service} tone={serviceTone(service)}>{service}</Badge>)}</td>
                  <td>
                    <Badge tone="teal">{row[3]}</Badge>
                  </td>
                  <td>{statusBadge(row[4])}</td>
                  <td>{row[5]}</td>
                  <td>{row[6]}</td>
                </tr>
              )}
              mobileRender={(row) => (
                <article key={row[0]} className="mobile-card">
                  <div className="mobile-card-row">
                    <strong>{row[0]}</strong>
                    <Badge tone="teal">{row[3]}</Badge>
                  </div>
                  <p>{row[1]}</p>
                  <div className="badge-row">
                    {row[2].map((service) => (
                      <Badge key={service} tone={serviceTone(service)}>
                        {service}
                      </Badge>
                    ))}
                    {statusBadge(row[4])}
                  </div>
                  <span>{row[5]}</span>
                  <em>{row[6]}</em>
                </article>
              )}
            />
          </Panel>
        </>
      );

    case "clients":
      return (
        <>
          <div className="toolbar">
            <div className="search-shell">
              <input className="search-input" placeholder="Search clients by name or ID..." />
            </div>
            <button className="primary-button" type="button" onClick={() => setModalKey("addClient")}>
              <Icon name="plus" />
              Add client
            </button>
          </div>

          <Panel title="Client roster">
            <Table
              columns={["Client", "Services", "Primary therapist", "Location", "Price group", "Status", "Actions"]}
              rows={clientRows}
              renderRow={(row) => (
                <tr key={row[0]}>
                  <td>
                    <strong>{row[0]}</strong>
                    {row[1] ? <div className="subtext">{row[1]}</div> : null}
                  </td>
                  <td>{row[2].map((service) => <Badge key={service} tone={serviceTone(service)}>{service}</Badge>)}</td>
                  <td>{row[3]}</td>
                  <td>{row[4]}</td>
                  <td>
                    <Badge tone="slate">{row[5]}</Badge>
                  </td>
                  <td>{statusBadge(row[6])}</td>
                  <td>{row[7]}</td>
                </tr>
              )}
              mobileRender={(row) => (
                <article key={row[0]} className="mobile-card">
                  <div className="mobile-card-row">
                    <strong>{row[0]}</strong>
                    {statusBadge(row[6])}
                  </div>
                  {row[1] ? <p>{row[1]}</p> : null}
                  <div className="badge-row">
                    {row[2].map((service) => (
                      <Badge key={service} tone={serviceTone(service)}>
                        {service}
                      </Badge>
                    ))}
                    <Badge tone="slate">{row[5]}</Badge>
                  </div>
                  <span>{row[3]} - {row[4]}</span>
                  <em>{row[7]}</em>
                </article>
              )}
            />
          </Panel>
        </>
      );

    case "therapists":
      return (
        <>
          <section className="stats-grid">
            {therapistStats.map((stat) => (
              <StatCard key={stat.label} stat={{ ...stat, eyebrow: stat.label, icon: "medical" }} compact />
            ))}
          </section>

          <section className="dashboard-grid">
            <Panel title="Therapist roster">
              <Table
                columns={["Therapist", "Primary services", "Base", "Load", "Flag", "Priority", "Actions"]}
                rows={therapistRows}
                renderRow={(row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                    <td>{row[4]}</td>
                    <td>{priorityBadge(row[5])}</td>
                    <td>{row[6]}</td>
                  </tr>
                )}
                mobileRender={(row) => (
                  <article key={row[0]} className="mobile-card">
                    <div className="mobile-card-row">
                      <strong>{row[0]}</strong>
                      {priorityBadge(row[5])}
                    </div>
                    <p>{row[1]} - {row[2]}</p>
                    <span>{row[3]}</span>
                    <span>{row[4]}</span>
                    <em>{row[6]}</em>
                  </article>
                )}
              />
            </Panel>

            <div className="side-stack">
              <Panel title="Coverage notes">
                <div className="action-list">
                  <div className="action-item">
                    <span className="action-dot tone-violet" />
                    <div>
                      <strong>Cover request pending</strong>
                      <p>Dr. Priya to James Okafor for Wed 10AM ABA session.</p>
                    </div>
                  </div>
                  <div className="action-item">
                    <span className="action-dot tone-amber" />
                    <div>
                      <strong>Thursday gap</strong>
                      <p>Two in-home slots remain unassigned for Mississauga coverage.</p>
                    </div>
                  </div>
                  <div className="action-item">
                    <span className="action-dot tone-teal" />
                    <div>
                      <strong>Open availability</strong>
                      <p>Aisha Rahman can absorb one new Friday PM intake pairing.</p>
                    </div>
                  </div>
                </div>
              </Panel>

              <Panel title="Roster health">
                <div className="metric-list">
                  <div className="metric-row">
                    <span>Average sessions per therapist</span>
                    <strong>10.0</strong>
                  </div>
                  <div className="metric-row">
                    <span>Notes submitted on time</span>
                    <strong>96%</strong>
                  </div>
                  <div className="metric-row">
                    <span>Cross-location flexibility</span>
                    <strong>3 staff</strong>
                  </div>
                  <div className="metric-row">
                    <span>Cover requests this week</span>
                    <strong>1 open</strong>
                  </div>
                </div>
              </Panel>
            </div>
          </section>
        </>
      );

    case "actions":
      return (
        <section className="dashboard-grid">
          <Panel title="Invoice review - 6 pending" className="accent-amber">
            <div className="action-list">
              {pendingInvoiceItems.map((item, index) => (
                <div key={item} className="action-item">
                  <span className={`action-dot ${index < 2 ? "tone-amber" : "tone-teal"}`} />
                  <div>
                    <strong>{index < 2 ? "Needs review" : "Ready to approve"}</strong>
                    <p>{item}</p>
                  </div>
                  <button
                    className="text-link"
                    type="button"
                    onClick={() => (index === 0 ? setModalKey("invoiceReview") : showToast(`${item} opened.`))}
                  >
                    {index < 2 ? "Review" : "Approve"}
                  </button>
                </div>
              ))}
            </div>
            <div className="panel-footer">
              <button className="primary-button wide" type="button" onClick={() => showToast("All ready invoices approved and queued for Tuesday send.")}>
                Approve all ready
              </button>
            </div>
          </Panel>

          <div className="side-stack">
            {requestCards.map((card) => (
              <Panel key={card.title} title={card.title}>
                <div className="action-list">
                  {card.items.map((item) => (
                    <div key={item} className="action-item">
                      <span className={`action-dot tone-${card.tone}`} />
                      <div>
                        <strong>{card.title}</strong>
                        <p>{item}</p>
                      </div>
                      <button className="text-link" type="button" onClick={() => showToast(`${card.title} updated.`)}>
                        Confirm
                      </button>
                    </div>
                  ))}
                </div>
              </Panel>
            ))}
          </div>
        </section>
      );

    case "messages":
      return (
        <section className="dashboard-grid">
          <Panel title="Family messages - Johnson family" className="chat-panel">
            <div className="chat-stream">
              <ChatBubble
                initials="SJ"
                tone="rose"
                text="Hi, Liam has a dentist appointment - can we move his Wednesday ABA to Thursday?"
                meta="Mon Mar 15 - 9:12AM"
              />
              <ChatBubble
                initials="SA"
                tone="sky"
                own
                text="Hi Sarah. Thursday 10AM works with Dr. Priya. I'll reschedule now and send confirmation."
                meta="Mon Mar 15 - 10:34AM"
              />
              <ChatBubble
                initials="SJ"
                tone="rose"
                text="Perfect, thank you so much!"
                meta="Mon Mar 15 - 10:41AM"
              />
            </div>
            <div className="chat-compose">
              <input className="search-input" placeholder="Type a message..." />
              <button className="primary-button" type="button" onClick={() => showToast("Message sent.")}>
                Send
              </button>
            </div>
          </Panel>

          <Panel title="All conversations">
            <div className="thread-list">
              {messageThreads.map((thread) => (
                <button key={thread[0]} type="button" className="thread-row" onClick={() => showToast(`${thread[0]} thread opened.`)}>
                  <span className={`thread-avatar tone-${thread[4]}`}>{thread[0].slice(0, 2).toUpperCase()}</span>
                  <span className="thread-copy">
                    <strong>{thread[0]}</strong>
                    <span>{thread[1]}</span>
                    <p>{thread[2]}</p>
                  </span>
                  <em>{thread[3]}</em>
                </button>
              ))}
            </div>
          </Panel>
        </section>
      );

    case "reports":
      return (
        <>
          <section className="stats-grid">
            {reportStats.map((stat) => (
              <StatCard key={stat.label} stat={{ ...stat, eyebrow: stat.label, icon: "report" }} compact />
            ))}
          </section>

          <section className="dashboard-grid">
            <Panel title="Available reports">
              <Table
                columns={["Report", "Category", "Status", "Summary", "Action"]}
                rows={reportRows}
                renderRow={(row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{statusBadge(row[2])}</td>
                    <td>{row[3]}</td>
                    <td>{row[4]}</td>
                  </tr>
                )}
                mobileRender={(row) => (
                  <article key={row[0]} className="mobile-card">
                    <div className="mobile-card-row">
                      <strong>{row[0]}</strong>
                      {statusBadge(row[2])}
                    </div>
                    <p>{row[1]}</p>
                    <span>{row[3]}</span>
                    <em>{row[4]}</em>
                  </article>
                )}
              />
            </Panel>

            <div className="side-stack">
              <Panel title="Report highlights">
                <div className="metric-list">
                  <div className="metric-row">
                    <span>Weekly invoice risk list</span>
                    <strong>4 overdue</strong>
                  </div>
                  <div className="metric-row">
                    <span>Paid intake conversion</span>
                    <strong>75%</strong>
                  </div>
                  <div className="metric-row">
                    <span>Therapist utilisation</span>
                    <strong>87%</strong>
                  </div>
                  <div className="metric-row">
                    <span>No-show rate</span>
                    <strong>1 flagged</strong>
                  </div>
                </div>
              </Panel>

              <article className="performance-card">
                <div>
                  <p className="performance-kicker">Reporting Direction</p>
                  <h3>Operations and billing are aligned</h3>
                  <p className="performance-copy">
                    The clinic is seeing strong intake conversion, but the next improvement
                    opportunity is reducing invoice review lag and clearing older balances.
                  </p>
                </div>
                <div className="chart-bars" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </article>
            </div>
          </section>
        </>
      );

    default:
      return null;
  }
}

function ChatBubble({ initials, tone, text, meta, own = false }) {
  return (
    <div className={`chat-message ${own ? "own" : ""}`}>
      <span className={`thread-avatar tone-${tone}`}>{initials}</span>
      <div className="chat-copy">
        <div className={`chat-bubble ${own ? "own" : ""}`}>{text}</div>
        <span>{meta}</span>
      </div>
    </div>
  );
}

function serviceTone(service) {
  const key = service.toLowerCase();
  if (key.includes("aba")) return "violet";
  if (key.includes("speech")) return "sky";
  if (key.includes("ot")) return "amber";
  return "slate";
}

function serviceShort(service) {
  if (service.includes("Speech")) return "Speech";
  if (service.includes("OT")) return "OT";
  if (service.includes("ABA")) return "ABA";
  return service;
}

function statusBadge(status) {
  const toneMap = {
    Active: "teal",
    "Invite not opened": "amber",
    "Intake scheduled": "sky",
    "New - needs review": "amber",
    Intake: "sky",
    "Outstanding $2,800": "amber",
    Ready: "teal",
    "Updated today": "sky",
  };

  return <Badge tone={toneMap[status] ?? "slate"}>{status}</Badge>;
}

function priorityBadge(priority) {
  const tone = priority === "High" ? "rose" : priority === "Medium" ? "amber" : "teal";
  return <Badge tone={tone}>{priority}</Badge>;
}

export default App;
