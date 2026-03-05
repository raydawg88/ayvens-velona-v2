import { motion } from 'framer-motion'
import { ShieldAlert, FileSearch, MapPin, BrainCircuit, Sparkles, ChevronRight, AlertTriangle, Euro, Target, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { cn, formatCurrency } from '@/lib/utils'
import {
  theftStats,
  theftCities,
  theftInsights,
  flaggedIncidents,
  embezzlementFlags,
  dayOfWeekData,
  riskFactors,
  theftAgents,
} from '@/data/theft-intelligence'

const agentIconMap = { ShieldAlert, FileSearch, MapPin, BrainCircuit }

const riskColors = {
  high: { dot: '#ef4444', ring: '#fecaca' },
  elevated: { dot: '#f59e0b', ring: '#fef3c7' },
  low: { dot: '#10b981', ring: '#d1fae5' },
}

// ── Compact City Map ─────────────────────────────────────────────────
function CityMap() {
  // Simple dot map: no outlines, just positioned city dots on a neutral bg
  return (
    <div className="bg-gray-50 rounded-lg p-4 h-full min-h-[280px] relative overflow-hidden">
      {/* Faint grid for spatial context */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.15]" viewBox="0 0 100 100">
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="#94a3b8" strokeWidth={0.3} />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="#94a3b8" strokeWidth={0.3} />
        ))}
      </svg>

      {/* Legend */}
      <div className="relative flex items-center gap-3 mb-3 text-[10px]">
        {(['high', 'elevated', 'low'] as const).map(level => (
          <div key={level} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: riskColors[level].dot }} />
            <span className="text-gray-500 capitalize">{level}</span>
          </div>
        ))}
      </div>

      {/* City dots positioned as percentage within the container */}
      <div className="relative w-full" style={{ height: 220 }}>
        {theftCities.map((city, i) => {
          const colors = riskColors[city.risk]
          // Normalize positions to percentages for the container
          // Original coords were in a 600x450 viewBox, map to percentages
          const leftPct = ((city.x - 120) / 320) * 100
          const topPct = ((city.y - 80) / 320) * 100
          const size = Math.max(20, Math.min(36, city.incidents * 2.2))

          return (
            <motion.div
              key={city.city}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
              className="absolute flex items-center gap-1.5"
              style={{
                left: `${Math.max(0, Math.min(75, leftPct))}%`,
                top: `${Math.max(0, Math.min(85, topPct))}%`,
              }}
            >
              <motion.div
                animate={city.risk === 'high' ? { scale: [1, 1.2, 1] } : {}}
                transition={city.risk === 'high' ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
                className="rounded-full flex items-center justify-center shrink-0"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: colors.dot,
                  boxShadow: `0 0 0 3px ${colors.ring}`,
                }}
              >
                <span className="text-white text-[9px] font-bold">{city.incidents}</span>
              </motion.div>
              <span className="text-[9px] font-medium text-gray-600 whitespace-nowrap">{city.city}</span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ── Main Page ────────────────────────────────────────────────────────
export function TheftIntelligencePage() {
  const statCards = [
    { label: 'Value at Risk', value: formatCurrency(theftStats.atRiskValue), icon: Euro, color: 'red' as const },
    { label: 'Vehicles Flagged', value: String(theftStats.vehiclesFlagged), icon: AlertTriangle, color: 'amber' as const },
    { label: 'Hotspots Detected', value: String(theftStats.hotspotsDetected), icon: Target, color: 'serene' as const },
    { label: 'Recovery Rate', value: `${theftStats.recoveryRate}%`, icon: TrendingUp, color: 'emerald' as const },
  ]

  const statColorMap = {
    red: { iconBg: 'bg-red-100', iconText: 'text-red-600', border: 'border-l-red-500' },
    amber: { iconBg: 'bg-amber-100', iconText: 'text-amber-600', border: 'border-l-amber-500' },
    serene: { iconBg: 'bg-serene-100', iconText: 'text-serene-600', border: 'border-l-serene-500' },
    emerald: { iconBg: 'bg-emerald-100', iconText: 'text-emerald-600', border: 'border-l-emerald-500' },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mini Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center gap-4">
          <img
            src="https://www.ayvens.com/-/media/ayvens/public/cp/logos/website/ayvens-logo-serene-blue-with-tagline.png"
            alt="Ayvens"
            className="h-10"
          />
          <div className="w-px h-6 bg-gray-200" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="font-display font-bold text-serene-800">Velona AI Theft & Embezzlement Intelligence</span>
          </div>
          <div className="ml-auto">
            <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium">
              Live Demo
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-8 space-y-8">
        {/* Title */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-display font-bold text-serene-800">Theft & Embezzlement Intelligence</h1>
          <p className="text-gray-500 mt-1 max-w-2xl">
            63 theft incidents and 23 embezzlement indicators analyzed across your fleet.
          </p>
        </motion.section>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, i) => {
            const colors = statColorMap[stat.color]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
                className={cn('bg-white rounded-xl border border-gray-100 shadow-sm p-5 border-l-4', colors.border)}
              >
                <div className="flex items-center gap-3">
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', colors.iconBg)}>
                    <stat.icon className={cn('w-5 h-5', colors.iconText)} />
                  </div>
                  <div>
                    <div className="text-2xl font-display font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Insight Cards (THE HERO) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {theftInsights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
              className={cn(
                'rounded-xl border p-6',
                insight.type === 'risk' ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'
              )}
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className={cn(
                  'text-xs font-semibold uppercase tracking-wider',
                  insight.type === 'risk' ? 'text-red-600' : 'text-emerald-600'
                )}>
                  {insight.type === 'risk' ? 'Risk Alert' : 'Pattern Detected'}
                </span>
                <span className={cn(
                  'ml-auto px-2.5 py-1 rounded-full text-xs font-bold',
                  insight.type === 'risk' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                )}>
                  {insight.metric}
                </span>
              </div>
              <h4 className={cn(
                'font-display font-bold text-lg mb-2',
                insight.type === 'risk' ? 'text-red-900' : 'text-emerald-900'
              )}>
                {insight.headline}
              </h4>
              <p className={cn(
                'text-sm leading-relaxed',
                insight.type === 'risk' ? 'text-red-700' : 'text-emerald-700'
              )}>
                {insight.body}
              </p>
              <button className={cn(
                'mt-4 flex items-center gap-1 text-sm font-semibold',
                insight.type === 'risk' ? 'text-red-700' : 'text-emerald-700'
              )}>
                View details <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Map + Flagged Incidents side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Compact Map (1/3 width) */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
          >
            <h3 className="font-display font-bold text-gray-900 text-sm mb-1">Incident Hotspots</h3>
            <p className="text-xs text-gray-500 mb-3">10 cities, last 90 days</p>
            <CityMap />
          </motion.div>

          {/* Flagged Incidents (2/3 width) */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
            className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm"
          >
            <div className="p-5 pb-3 border-b border-gray-100">
              <h3 className="font-display font-bold text-gray-900">Recent Findings</h3>
              <p className="text-xs text-gray-500 mt-0.5">Vehicles flagged for anomalous behavior</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                    <th className="px-5 py-2.5 font-medium">Vehicle</th>
                    <th className="px-5 py-2.5 font-medium">Type</th>
                    <th className="px-5 py-2.5 font-medium">Location</th>
                    <th className="px-5 py-2.5 font-medium">Risk</th>
                    <th className="px-5 py-2.5 font-medium">Finding</th>
                    <th className="px-5 py-2.5 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {flaggedIncidents.map((inc, i) => (
                    <motion.tr
                      key={inc.vin}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="border-b border-gray-50 hover:bg-gray-50/50"
                    >
                      <td className="px-5 py-2.5">
                        <div className="font-mono text-xs text-gray-700">{inc.vin}</div>
                        <div className="text-[10px] text-gray-400">{inc.model}</div>
                      </td>
                      <td className="px-5 py-2.5 text-xs text-gray-700">{inc.type}</td>
                      <td className="px-5 py-2.5 text-xs text-gray-600">{inc.location}</td>
                      <td className="px-5 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className={cn(
                                'h-full rounded-full',
                                inc.riskScore >= 80 ? 'bg-red-500' : inc.riskScore >= 60 ? 'bg-amber-500' : 'bg-emerald-500'
                              )}
                              style={{ width: `${inc.riskScore}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-gray-500">{inc.riskScore}</span>
                        </div>
                      </td>
                      <td className="px-5 py-2.5 text-[11px] text-gray-600 max-w-[220px]">{inc.finding}</td>
                      <td className="px-5 py-2.5">
                        <span className={cn(
                          'px-2 py-0.5 rounded-full text-[10px] font-medium capitalize',
                          inc.status === 'investigating' && 'bg-red-50 text-red-700',
                          inc.status === 'monitoring' && 'bg-amber-50 text-amber-700',
                          inc.status === 'alert-sent' && 'bg-serene-25 text-serene-700',
                          inc.status === 'review' && 'bg-violet-50 text-violet-700',
                          inc.status === 'preventive' && 'bg-emerald-50 text-emerald-700',
                          inc.status === 'advisory' && 'bg-gray-100 text-gray-600',
                        )}>
                          {inc.status.replace('-', ' ')}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Patterns: 2-col */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Theft by Day of Week */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
          >
            <h3 className="font-display font-bold text-gray-900 mb-1">Theft by Day of Week</h3>
            <p className="text-xs text-gray-500 mb-4">Friday-Sunday accounts for 78% of attempts</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dayOfWeekData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
                  formatter={(value) => [`${value as number} incidents`, 'Count']}
                />
                <Bar dataKey="incidents" radius={[4, 4, 0, 0]}>
                  {dayOfWeekData.map((entry) => (
                    <Cell
                      key={entry.day}
                      fill={entry.incidents >= 10 ? '#ef4444' : entry.incidents >= 5 ? '#f59e0b' : '#10b981'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Risk Factors */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.55 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
          >
            <h3 className="font-display font-bold text-gray-900 mb-1">Top Risk Factors</h3>
            <p className="text-xs text-gray-500 mb-4">Contributing factors across all incidents</p>
            <div className="space-y-4">
              {riskFactors.map((factor, i) => (
                <div key={factor.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{factor.label}</span>
                    <span className="text-sm font-mono font-medium text-gray-900">{factor.pct}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${factor.pct}%` }}
                      transition={{ duration: 0.8, delay: 0.6 + i * 0.08, ease: 'easeOut' }}
                      className={cn(
                        'h-full rounded-full',
                        factor.pct >= 60 ? 'bg-red-500' : factor.pct >= 45 ? 'bg-amber-500' : 'bg-serene-500'
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Embezzlement Indicators */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
        >
          <h3 className="font-display font-bold text-gray-900 mb-1">Embezzlement Indicators</h3>
          <p className="text-sm text-gray-500 mb-4">Internal fraud and misuse signals detected by Velona AI</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {embezzlementFlags.map((flag, i) => (
              <motion.div
                key={flag.type}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 + i * 0.06 }}
                className="bg-amber-50 border border-amber-100 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-bold text-amber-900 text-sm">{flag.type}</span>
                  <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {flag.count}
                  </span>
                </div>
                <p className="text-xs text-amber-700">{flag.description}</p>
                <button className="mt-2 flex items-center gap-1 text-xs font-medium text-amber-800">
                  Investigate <ChevronRight className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Agent Network (compact) */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="border-t border-gray-200 pt-8"
        >
          <div className="text-center mb-5">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Powered by</span>
            </div>
            <h3 className="font-display font-bold text-gray-900">4 Velona AI Agents</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {theftAgents.map((agent, i) => {
              const Icon = agentIconMap[agent.icon]
              const agentColors: Record<string, { bg: string; icon: string }> = {
                red: { bg: 'bg-red-100', icon: 'text-red-600' },
                amber: { bg: 'bg-amber-100', icon: 'text-amber-600' },
                serene: { bg: 'bg-serene-100', icon: 'text-serene-600' },
                violet: { bg: 'bg-violet-100', icon: 'text-violet-600' },
              }
              const colors = agentColors[agent.color]
              return (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 + i * 0.06 }}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start gap-3"
                >
                  <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', colors.bg)}>
                    <Icon className={cn('w-4 h-4', colors.icon)} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-900 text-sm">{agent.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{agent.role}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>
      </main>
    </div>
  )
}
