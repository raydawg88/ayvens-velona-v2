import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { regions } from '@/data/regions'
import { useStore } from '@/store/useStore'

const pageTitles: Record<string, string> = {
  '/portfolio': 'Portfolio Overview',
  '/fleet': 'Fleet',
  '/insights': 'Insights',
  '/costs': 'Costs',
  '/safety': 'Safety',
  '/maintenance': 'Maintenance',
  '/reports': 'Reports',
  '/sustainability': 'Sustainability',
  '/settings': 'Settings',
}

const navLinks = [
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
  const { selectedRegion, setSelectedRegion } = useStore()
  const pageTitle = pageTitles[location.pathname] || ''
  const isPortfolio = location.pathname === '/portfolio'

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center h-20 gap-6">
          {/* Ayvens Logo */}
          <Link to="/portfolio" className="flex items-center gap-2 shrink-0">
            <img
              src="https://www.ayvens.com/-/media/ayvens/public/cp/logos/website/ayvens-logo-serene-blue-with-tagline.png"
              alt="Ayvens"
              className="h-18"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling?.classList.remove('hidden')
              }}
            />
            <span className="hidden font-display font-bold text-serene-800 text-lg">Ayvens</span>
          </Link>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-200" />

          {/* Page Title */}
          <h1 className="text-xl font-display font-bold text-serene-800 shrink-0">{pageTitle}</h1>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Region filter pills (only on portfolio) */}
          {isPortfolio && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedRegion(null)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                  !selectedRegion
                    ? "bg-serene-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                All Regions
              </button>
              {regions.map(r => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRegion(selectedRegion === r.id ? null : r.id)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5",
                    selectedRegion === r.id
                      ? "bg-serene-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  <span>{r.flag}</span>
                  {r.name}
                </button>
              ))}
            </div>
          )}

          {/* Nav links for non-portfolio pages */}
          {!isPortfolio && (
            <div className="flex items-center gap-1">
              {navLinks.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-serene-50 text-serene-700"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Sub-info line for portfolio */}
        {isPortfolio && (
          <div className="pb-2 -mt-1">
            <p className="text-sm text-gray-400">
              {selectedRegion ? regions.find(r => r.id === selectedRegion)?.name : 'All regions'}
            </p>
          </div>
        )}
      </div>
    </nav>
  )
}
