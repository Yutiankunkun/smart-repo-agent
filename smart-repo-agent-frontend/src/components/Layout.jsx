import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg transition-colors ${
      isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
    }`;

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-slate-100">
      {/* Mobile header */}
      <header className="sm:hidden flex items-center justify-between p-4 bg-slate-800 text-white shrink-0">
        <h1 className="text-base font-semibold tracking-tight">Report Agent System</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-slate-700"
          aria-label="メニュー"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {sidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - slide-in on mobile when open */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 fixed sm:relative inset-y-0 left-0 sm:inset-auto z-50 sm:z-auto w-52 sm:w-56 bg-slate-800 text-white flex flex-col shrink-0 sm:min-h-screen transition-transform duration-200 shadow-lg sm:shadow-none`}
      >
        <div className="p-5 sm:p-6 border-b border-slate-700">
          <h1 className="text-base sm:text-lg font-semibold text-slate-100 tracking-tight">Report Agent System</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavLink to="/" end className={navLinkClass} onClick={() => setSidebarOpen(false)}>
            学生管理
          </NavLink>
          <NavLink to="/chat" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
            面談アシスタント
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto min-h-0 bg-slate-50/80">
        <Outlet />
      </main>
    </div>
  );
}
