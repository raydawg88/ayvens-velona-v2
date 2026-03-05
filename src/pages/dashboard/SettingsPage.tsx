import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User, Brain, SlidersHorizontal, Bell, Globe, Lock, Plug, FileText,
  GripVertical, RotateCcw, ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { aiPriorities, assumptions, integrations } from '@/data/dashboard-settings'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'ai-priorities', label: 'AI Priorities', icon: Brain },
  { id: 'assumptions', label: 'Assumptions', icon: SlidersHorizontal },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'regional', label: 'Regional', icon: Globe },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'legal', label: 'Legal', icon: FileText },
] as const

type TabId = (typeof tabs)[number]['id']

function ProfileTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center text-white text-xl font-bold">
          MG
        </div>
        <button className="text-sm font-medium text-serene-600 hover:text-serene-700 transition-colors">
          Change photo
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FieldInput label="First name" defaultValue="Maria" />
        <FieldInput label="Last name" defaultValue="Garcia Fernandez" />
        <FieldInput label="Email" defaultValue="maria.garcia@translogistica.es" type="email" />
        <FieldInput label="Phone" defaultValue="+34 612 345 678" type="tel" />
        <FieldInput label="Position" defaultValue="Fleet Manager" className="col-span-2" />
      </div>
      <div className="flex justify-end">
        <button className="px-4 py-2 rounded-lg bg-serene-600 text-white text-sm font-semibold hover:bg-serene-700 transition-colors">
          Save changes
        </button>
      </div>
    </div>
  )
}

function FieldInput({
  label, defaultValue, type = 'text', className,
}: {
  label: string; defaultValue: string; type?: string; className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-serene-500/30 focus:border-serene-500 transition-colors"
      />
    </div>
  )
}

function AiPrioritiesTab() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Drag to reorder how Velona AI prioritizes insights and recommendations.
      </p>
      <div className="space-y-2">
        {aiPriorities.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-3 bg-white rounded-lg border border-gray-100 px-4 py-3"
          >
            <GripVertical className="w-4 h-4 text-gray-300 cursor-grab" />
            <span className="w-6 h-6 rounded-full bg-serene-100 text-serene-700 flex items-center justify-center text-xs font-bold">
              {p.id}
            </span>
            <div className="flex-1 min-w-0">
              <span className="font-bold text-sm text-gray-900">{p.name}</span>
              <span className="text-xs text-gray-500 ml-2">{p.description}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 justify-end pt-2">
        <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          Reset to defaults
        </button>
        <button className="px-4 py-2 rounded-lg bg-serene-600 text-white text-sm font-semibold hover:bg-serene-700 transition-colors">
          Save order
        </button>
      </div>
    </div>
  )
}

function AssumptionsTab() {
  return (
    <div className="space-y-6">
      {assumptions.map((group) => (
        <div key={group.name}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-gray-900">{group.name}</h3>
            <button className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors">
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
          <div className="bg-white rounded-lg border border-gray-100 divide-y divide-gray-50">
            {group.items.map((item) => (
              <div key={item.label} className="flex items-center gap-3 px-4 py-2.5 text-sm">
                <span className="flex-1 text-gray-700">{item.label}</span>
                <input
                  defaultValue={item.value}
                  className="w-24 px-2 py-1 rounded border border-gray-200 text-right text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-serene-500/30 focus:border-serene-500 transition-colors"
                />
                <span className="w-20 text-xs text-gray-400">{item.unit}</span>
                <span className="text-[10px] text-gray-400 hidden lg:block w-36 truncate" title={item.source}>
                  {item.source}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function NotificationsTab() {
  const toggles = [
    { label: 'Email notifications', description: 'Receive email updates', defaultOn: true },
    { label: 'Push notifications', description: 'Browser push notifications', defaultOn: true },
    { label: 'Weekly summary', description: 'Weekly fleet performance digest', defaultOn: true },
    { label: 'AI Insights', description: 'New Velona AI discoveries', defaultOn: true },
    { label: 'Maintenance alerts', description: 'Upcoming and overdue maintenance', defaultOn: true },
    { label: 'Safety alerts', description: 'Incidents and safety score changes', defaultOn: false },
  ]

  return (
    <div className="space-y-1">
      {toggles.map((t) => (
        <div key={t.label} className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div>
            <div className="text-sm font-medium text-gray-900">{t.label}</div>
            <div className="text-xs text-gray-500">{t.description}</div>
          </div>
          <div
            className={cn(
              'w-10 h-6 rounded-full relative transition-colors',
              t.defaultOn ? 'bg-serene-600' : 'bg-gray-200',
            )}
          >
            <div
              className={cn(
                'w-4 h-4 rounded-full bg-white absolute top-1 transition-all shadow-sm',
                t.defaultOn ? 'left-5' : 'left-1',
              )}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function RegionalTab() {
  const selects = [
    { label: 'Language', options: ['Spanish (Spain)', 'English', 'French', 'German', 'Portuguese'] },
    { label: 'Timezone', options: ['Europe/Madrid (UTC+1)', 'Europe/London (UTC+0)', 'Europe/Paris (UTC+1)', 'Europe/Berlin (UTC+1)'] },
    { label: 'Date format', options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'] },
    { label: 'Currency', options: ['EUR (€)', 'GBP (£)', 'USD ($)'] },
    { label: 'Distance units', options: ['Kilometers (km)', 'Miles (mi)'] },
    { label: 'Fuel units', options: ['Liters (L)', 'Gallons (gal)'] },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {selects.map((s) => (
          <div key={s.label}>
            <label className="block text-xs font-medium text-gray-500 mb-1">{s.label}</label>
            <select
              defaultValue={s.options[0]}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-serene-500/30 focus:border-serene-500 transition-colors"
            >
              {s.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-2">
        <button className="px-4 py-2 rounded-lg bg-serene-600 text-white text-sm font-semibold hover:bg-serene-700 transition-colors">
          Save preferences
        </button>
      </div>
    </div>
  )
}

function SecurityTab() {
  return (
    <div className="space-y-6">
      {/* Password */}
      <div className="bg-white rounded-lg border border-gray-100 p-4">
        <h3 className="text-sm font-bold text-gray-900 mb-1">Password</h3>
        <p className="text-xs text-gray-500 mb-3">Last changed 3 months ago</p>
        <button className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Change password
        </button>
      </div>

      {/* 2FA */}
      <div className="flex items-center justify-between bg-white rounded-lg border border-gray-100 p-4">
        <div>
          <h3 className="text-sm font-bold text-gray-900">Two-factor authentication</h3>
          <p className="text-xs text-gray-500">Add an extra layer of security</p>
        </div>
        <div className="w-10 h-6 rounded-full bg-gray-200 relative">
          <div className="w-4 h-4 rounded-full bg-white absolute top-1 left-1 shadow-sm" />
        </div>
      </div>

      {/* Sessions */}
      <div className="bg-white rounded-lg border border-gray-100 p-4">
        <h3 className="text-sm font-bold text-gray-900 mb-1">Active sessions</h3>
        <p className="text-xs text-gray-500 mb-3">2 active devices</p>
        <button className="px-4 py-2 rounded-lg border border-red-200 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
          Close all sessions
        </button>
      </div>
    </div>
  )
}

function IntegrationsTab() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {integrations.map((integration) => (
        <div key={integration.name} className="bg-white rounded-lg border border-gray-100 p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-gray-900">{integration.name}</span>
            <span
              className={cn(
                'px-2 py-0.5 rounded-full text-[10px] font-semibold',
                integration.status === 'Connected'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-500',
              )}
            >
              {integration.status}
            </span>
          </div>
          <p className="text-xs text-gray-500">{integration.description}</p>
          {integration.lastSync && (
            <p className="text-[10px] text-gray-400">Last sync: {integration.lastSync}</p>
          )}
          <button
            className={cn(
              'mt-auto px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors',
              integration.status === 'Connected'
                ? 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                : 'bg-serene-600 text-white hover:bg-serene-700',
            )}
          >
            {integration.status === 'Connected' ? 'Configure' : 'Connect'}
          </button>
        </div>
      ))}
    </div>
  )
}

function LegalTab() {
  const docs = [
    { name: 'Terms of Service', updated: 'October 2024' },
    { name: 'Privacy Policy', updated: 'November 2024' },
    { name: 'Data Processing Agreement', updated: 'September 2024' },
  ]

  return (
    <div className="space-y-2">
      {docs.map((doc) => (
        <div key={doc.name} className="flex items-center justify-between bg-white rounded-lg border border-gray-100 px-4 py-3">
          <div>
            <div className="text-sm font-medium text-gray-900">{doc.name}</div>
            <div className="text-[10px] text-gray-400">Last updated: {doc.updated}</div>
          </div>
          <button className="inline-flex items-center gap-1 text-xs font-semibold text-serene-600 hover:text-serene-700 transition-colors">
            View <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  )
}

const tabContent: Record<TabId, React.FC> = {
  profile: ProfileTab,
  'ai-priorities': AiPrioritiesTab,
  assumptions: AssumptionsTab,
  notifications: NotificationsTab,
  regional: RegionalTab,
  security: SecurityTab,
  integrations: IntegrationsTab,
  legal: LegalTab,
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('profile')
  const ActiveContent = tabContent[activeTab]

  return (
    <div className="max-w-[960px] mx-auto px-6 py-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-display font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Account preferences and settings</p>
      </motion.div>

      {/* Tab layout */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="flex gap-6"
      >
        {/* Left nav */}
        <nav className="w-48 shrink-0 space-y-0.5">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left',
                  activeTab === tab.id
                    ? 'bg-serene-50 text-serene-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>

        {/* Right content */}
        <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <ActiveContent />
        </div>
      </motion.div>
    </div>
  )
}
