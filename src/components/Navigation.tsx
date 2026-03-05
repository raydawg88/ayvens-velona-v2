import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Fleet', path: '/fleet' },
  { label: 'Insights', path: '/insights' },
  { label: 'Costs', path: '/costs' },
  { label: 'Safety', path: '/safety' },
  { label: 'Maintenance', path: '/maintenance' },
  { label: 'Reports', path: '/reports' },
  { label: 'Sustainability', path: '/sustainability' },
  { label: 'Settings', path: '/settings' },
]

export function Navigation() {
  const location = useLocation()

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1400px] px-4">
      <div className="h-14 rounded-full bg-gray-900/95 backdrop-blur-xl flex items-center justify-between px-6 shadow-lg shadow-black/10">
        {/* Logo */}
        <Link to="/portfolio" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-ayvens-green/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-ayvens-lime" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="text-white font-display font-semibold text-lg tracking-tight">Velona</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "text-serene-300 bg-white/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/" className="text-white/50 hover:text-white/80 text-sm transition-colors">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  )
}
