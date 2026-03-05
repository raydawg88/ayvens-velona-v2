import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Lightbulb, Bell, DollarSign, Truck, Wrench,
  Shield, FileText, Settings, Sparkles, Send, LogOut, Leaf, Battery, AlertTriangle, Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { quickQuestions } from '@/data/fleet-dashboard'

const sidebarNavItems = [
  { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Insights', icon: Lightbulb, path: '/dashboard/insights' },
  { label: 'Action Center', icon: Bell, path: '/dashboard/actions' },
  { label: 'Costs', icon: DollarSign, path: '/dashboard/costs' },
  { label: 'Fleet', icon: Truck, path: '/dashboard/fleet' },
  { label: 'Maintenance', icon: Wrench, path: '/dashboard/maintenance' },
  { label: 'Safety', icon: Shield, path: '/dashboard/safety' },
  { label: 'Reports', icon: FileText, path: '/dashboard/reports' },
  { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  { divider: true, label: 'AI Modules' },
  { label: 'Sustainability', icon: Leaf, path: '/dashboard/sustainability' },
  { label: 'EV Battery', icon: Battery, path: '/dashboard/ev-battery' },
  { label: 'Smart Charging', icon: Zap, path: '/dashboard/smart-charging' },
  { label: 'Theft Intel', icon: AlertTriangle, path: '/dashboard/theft-intelligence' },
] as const

export function DashboardLayout() {
  const [chatInput, setChatInput] = useState('')
  const location = useLocation()

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-[220px] bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="px-5 pt-5 pb-4">
          <img
            src="https://www.ayvens.com/-/media/ayvens/public/cp/logos/website/ayvens-logo-serene-blue-with-tagline.png"
            alt="Ayvens"
            className="h-12"
          />
        </div>

        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {sidebarNavItems.map((item) => {
            if ('divider' in item && item.divider) {
              return (
                <div key={item.label} className="pt-4 pb-1 px-3">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{item.label}</span>
                </div>
              )
            }
            const navItem = item as { label: string; icon: typeof LayoutDashboard; path: string }
            const isActive = location.pathname === navItem.path
            return (
              <Link
                key={navItem.label}
                to={navItem.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-serene-50 text-serene-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                )}
              >
                <navItem.icon className={cn('w-4 h-4', isActive ? 'text-serene-600' : 'text-gray-400')} />
                {navItem.label}
              </Link>
            )
          })}
        </nav>

        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-serene-100 flex items-center justify-center text-xs font-bold text-serene-700">
              MG
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate flex items-center gap-1.5">
                Maria Garcia <span>🇪🇸</span>
              </div>
              <div className="text-[10px] text-gray-400">Fleet Manager</div>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-1.5 mt-3 text-xs text-gray-400 hover:text-serene-600 transition-colors">
            <LogOut className="w-3 h-3" /> Switch Mode
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Right Panel: Velona AI */}
      <aside className="w-[280px] bg-white border-l border-gray-100 flex flex-col shrink-0">
        <div className="px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="font-display font-bold text-gray-900">Velona AI</span>
          </div>
          <p className="text-xs text-gray-400">Ask me anything about your fleet</p>
        </div>

        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Quick Questions</p>
          <div className="space-y-1.5">
            {quickQuestions.map(q => (
              <button
                key={q}
                className="w-full text-left px-3 py-2 rounded-lg bg-gray-50 text-xs text-gray-600 hover:bg-serene-25 hover:text-serene-700 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 px-5 py-4 overflow-y-auto">
          <div className="bg-gray-50 rounded-xl p-3.5">
            <p className="text-xs text-gray-700 leading-relaxed">
              Hello! I'm Velona, your AI fleet analytics assistant. How can I help you today?
            </p>
            <p className="text-[10px] text-gray-400 mt-2">about 23 hours ago</p>
          </div>
        </div>

        <div className="px-4 pb-4 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about your fleet..."
              className="flex-1 px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-serene-400 focus:ring-1 focus:ring-serene-400"
            />
            <button className="w-9 h-9 rounded-lg bg-serene-600 flex items-center justify-center text-white hover:bg-serene-700 transition-colors shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}
