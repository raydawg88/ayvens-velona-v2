import { motion } from 'framer-motion'
import {
  ArrowUpRight, ArrowDownRight, Minus, ShieldAlert, AlertTriangle, Sparkles,
} from 'lucide-react'
import {
  LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import { cn, formatCurrency } from '@/lib/utils'
import {
  safetyKpis,
  safetyScoreTrend,
  incidentsByType,
  riskDrivers,
  recentIncidents,
} from '@/data/dashboard-safety'
import { insights } from '@/data/dashboard-insights'

const totalIncidentCost = recentIncidents.reduce((sum, inc) => sum + inc.cost, 0)

const severityColors: Record<string, string> = {
  'High': 'bg-red-100 text-red-700',
  'Medium': 'bg-amber-100 text-amber-700',
  'Low': 'bg-gray-100 text-gray-600',
}

const statusColors: Record<string, string> = {
  'Under Review': 'bg-amber-100 text-amber-700',
  'Closed': 'bg-gray-100 text-gray-600',
  'Informative': 'bg-blue-100 text-blue-700',
}

const severityBadge: Record<string, string> = {
  critical: 'bg-red-100 text-red-700',
  high: 'bg-amber-100 text-amber-700',
  medium: 'bg-blue-100 text-blue-700',
  low: 'bg-gray-100 text-gray-700',
}

function getScoreColor(score: number): string {
  if (score < 75) return 'bg-red-500'
  if (score < 90) return 'bg-amber-500'
  return 'bg-emerald-500'
}

function getScoreTextColor(score: number): string {
  if (score < 75) return 'text-red-600'
  if (score < 90) return 'text-amber-600'
  return 'text-emerald-600'
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('')
}

const safetyInsights = insights
  .filter(i => i.category === 'Safety')
  .slice(0, 3)

export function SafetyPage() {
  return (
    <div className="max-w-[960px] mx-auto px-6 py-6 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-display font-bold text-gray-900">Safety</h1>
        <p className="text-sm text-gray-500">Safety metrics and performance</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        {safetyKpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05 + i * 0.04 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
          >
            <div className="text-xs text-gray-500 mb-1">{kpi.label}</div>
            <div className="text-xl font-display font-bold text-gray-900">{kpi.value}</div>
            <div className="flex items-center gap-1 mt-1">
              {kpi.delta === 0 ? (
                <Minus className="w-3.5 h-3.5 text-gray-400" />
              ) : kpi.isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
              )}
              <span className={cn(
                'text-xs font-medium',
                kpi.delta === 0 ? 'text-gray-400' : kpi.isPositive ? 'text-emerald-600' : 'text-red-500'
              )}>
                {kpi.delta === 0 ? 'No change' : `${Math.abs(kpi.delta)}%`}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Safety Score Trend */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
        >
          <h3 className="font-display font-bold text-gray-900 mb-0.5">Safety Score Trend</h3>
          <p className="text-xs text-gray-500 mb-3">Monthly safety score progression</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={safetyScoreTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
              <YAxis
                domain={[80, 100]}
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 11 }}
                formatter={(value) => [`${value as number}/100`, 'Safety Score']}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#0ea5e9"
                strokeWidth={2.5}
                dot={{ fill: '#0ea5e9', r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Incidents by Type */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
        >
          <h3 className="font-display font-bold text-gray-900 mb-0.5">Incidents by Type</h3>
          <p className="text-xs text-gray-500 mb-3">Breakdown of incident categories</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={incidentsByType}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  dataKey="count"
                  strokeWidth={2}
                  stroke="#fff"
                >
                  {incidentsByType.map((entry) => (
                    <Cell key={entry.type} fill={entry.color} />
                  ))}
                </Pie>
                <text x="50%" y="46%" textAnchor="middle" className="fill-gray-400 text-[10px]">Total</text>
                <text x="50%" y="56%" textAnchor="middle" className="fill-gray-900 text-xs font-bold">
                  {incidentsByType.reduce((s, e) => s + e.count, 0)}
                </text>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {incidentsByType.map((entry) => (
                <div key={entry.type} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-gray-600">{entry.type}</span>
                  </div>
                  <span className="text-gray-900 font-mono font-medium">{entry.count}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Risk Drivers */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <ShieldAlert className="w-4 h-4 text-gray-400" />
          <h3 className="font-display font-bold text-gray-900">Risk Drivers</h3>
          <span className="text-xs text-gray-400">Drivers requiring attention</span>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {riskDrivers.map((driver, i) => (
            <motion.div
              key={driver.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.45 + i * 0.04 }}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
            >
              {/* Avatar */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold',
                  getScoreColor(driver.score)
                )}>
                  {getInitials(driver.name)}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-gray-900 truncate">{driver.name}</div>
                  <div className="text-[10px] text-gray-400">ID: {driver.id}</div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-1 mb-3 text-[10px] text-gray-500">
                <div>{driver.experience} yrs experience</div>
                <div>{driver.location}</div>
              </div>

              {/* Score */}
              <div className="mb-2">
                <div className="flex items-baseline gap-1">
                  <span className={cn('text-xl font-display font-bold', getScoreTextColor(driver.score))}>
                    {driver.score}
                  </span>
                  <span className="text-[10px] text-gray-400">/100</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${driver.score}%` }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.05, ease: 'easeOut' }}
                    className={cn('h-full rounded-full', getScoreColor(driver.score))}
                  />
                </div>
              </div>

              {/* Incidents */}
              <div className="text-[10px] text-gray-500 mb-2">
                {driver.incidents} incident{driver.incidents !== 1 ? 's' : ''} this year
              </div>

              {/* Alerts */}
              {driver.alerts.length > 0 && (
                <div className="space-y-1">
                  {driver.alerts.map((alert, j) => (
                    <div key={j} className="flex items-start gap-1 text-[10px] text-red-600 bg-red-50 rounded px-1.5 py-1">
                      <AlertTriangle className="w-2.5 h-2.5 mt-0.5 shrink-0" />
                      {alert}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Incidents Table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
      >
        <h3 className="font-display font-bold text-gray-900 mb-0.5">Recent Incidents</h3>
        <p className="text-xs text-gray-500 mb-4">Latest safety events and their resolution</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 pr-3 text-gray-500 font-medium">Date</th>
                <th className="text-left py-2 pr-3 text-gray-500 font-medium">Driver</th>
                <th className="text-left py-2 pr-3 text-gray-500 font-medium">Vehicle</th>
                <th className="text-left py-2 pr-3 text-gray-500 font-medium">Type</th>
                <th className="text-left py-2 pr-3 text-gray-500 font-medium">Severity</th>
                <th className="text-left py-2 pr-3 text-gray-500 font-medium">Location</th>
                <th className="text-right py-2 pr-3 text-gray-500 font-medium">Cost</th>
                <th className="text-left py-2 text-gray-500 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentIncidents.map((inc) => (
                <tr key={inc.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-2.5 pr-3 text-gray-700">{inc.date}</td>
                  <td className="py-2.5 pr-3">
                    <div className="font-medium text-gray-900">{inc.driver}</div>
                    <div className="text-gray-400 text-[10px]">{inc.driverId}</div>
                  </td>
                  <td className="py-2.5 pr-3 text-gray-700 font-mono">{inc.vehicle}</td>
                  <td className="py-2.5 pr-3 text-gray-700">{inc.type}</td>
                  <td className="py-2.5 pr-3">
                    <span className={cn('px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider', severityColors[inc.severity])}>
                      {inc.severity}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 text-gray-700 max-w-[140px] truncate" title={inc.location}>{inc.location}</td>
                  <td className="py-2.5 pr-3 text-right text-gray-700 font-mono">{inc.cost > 0 ? formatCurrency(inc.cost) : '-'}</td>
                  <td className="py-2.5">
                    <span className={cn('px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider', statusColors[inc.status])}>
                      {inc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
          <span>{recentIncidents.length} recent incidents</span>
          <span>Total cost: <span className="font-medium text-gray-900">{formatCurrency(totalIncidentCost)}</span></span>
        </div>
      </motion.div>

      {/* Safety Insights */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.55 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
      >
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="font-display font-bold text-gray-900">Safety Insights</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4">AI-powered safety recommendations</p>
        <div className="space-y-4">
          {safetyInsights.map((insight) => (
            <div key={insight.id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className={cn('px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider', severityBadge[insight.severity])}>
                  {insight.severity}
                </span>
                {insight.isNew && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">New</span>
                )}
                {insight.impact > 0 && (
                  <span className="text-[10px] text-gray-400">Impact: {formatCurrency(insight.impact)}</span>
                )}
              </div>
              <h4 className="font-display font-bold text-gray-900 text-sm mb-1">{insight.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{insight.summary}</p>
              {insight.recommendation && (
                <p className="text-xs text-serene-600 mt-1.5 flex items-start gap-1">
                  <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                  {insight.recommendation}
                </p>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
