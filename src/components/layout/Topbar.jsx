import MaterialIcon from '../MaterialIcon.jsx';

export default function Topbar() {
  return (
    <header className="flex justify-between items-center h-16 px-8 w-full bg-[#F8F9FF]/85 backdrop-blur-md sticky top-0 z-40 shadow-[0_12px_32px_rgba(25,28,32,0.04)]">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-full max-w-md">
          <MaterialIcon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#111827]/45"
          />
          <input
            className="w-full bg-white border border-[#111827]/25 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#111827]/35 placeholder:text-[#111827]/40 transition-all"
            placeholder="Search across clinical records..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center px-4 py-1.5 bg-surface-container rounded-full gap-4 mr-4">
          <button type="button" className="text-xs font-bold text-primary">
            24 Hours
          </button>
          <button
            type="button"
            className="text-xs font-medium text-on-surface-variant hover:text-on-surface"
          >
            7 Days
          </button>
          <button
            type="button"
            className="text-xs font-medium text-on-surface-variant hover:text-on-surface"
          >
            30 Days
          </button>
        </div>

        <button
          type="button"
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#FFFFFF] transition-all duration-300 relative"
        >
          <MaterialIcon name="notifications" className="text-on-surface-variant" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-white" />
        </button>

        <button
          type="button"
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#FFFFFF] transition-all duration-300"
        >
          <MaterialIcon name="settings" className="text-on-surface-variant" />
        </button>

        <div className="h-8 w-[1px] bg-outline-variant/30 mx-2" />

        <div className="flex items-center gap-3 pl-2">
          <img
            alt="Provider Profile Avatar"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/10"
            style={{ width: 36, height: 36 }}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCUa1sj5t4vy_mKQjiAk6XnzLi94s5Oz2pwH9Tw_bvX7ZjfwHndOJ1HAceFMrVruTIa6jdpQ6Q9jAuF-Mk5QDbgemcxMSsLpGCus46cy-x94eSzMP9q8SMP71vL9iiPhzAeTCR5_y6FmhqZ0B4Im9UtgV0CRaE8P9staB40TfvufGJVRuK7P6JKmiyX7oX5S2hrY8oMri14ayOKxMzDCFQZfKZDKHhbJiof33DNPHg9cicp3uCIsAOiaPDDnONPlH44el1aXdQVA"
          />
        </div>
      </div>
    </header>
  );
}

