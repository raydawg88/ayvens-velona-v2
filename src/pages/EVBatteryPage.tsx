import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, CartesianGrid,
} from 'recharts'
import {
  Battery, AlertTriangle, Sparkles, ChevronRight, Shield,
  BatteryCharging, Thermometer, BarChart3,
} from 'lucide-react'
import { cn, formatCurrency, formatNumber, formatPercent } from '@/lib/utils'
import { evBatteryData } from '@/data/ev-batteries'

export function EVBatteryPage() {
  const data = evBatteryData
  const criticalCount = data.vehicles.filter(v => v.status === 'critical').length
  const watchCount = data.vehicles.filter(v => v.status === 'watch').length
  const healthyCount = data.totalEvs - data.vehiclesFlagged

  const capabilities = [
    {
      number: 1,
      title: 'State of Health (SoH)',
      description: 'Track battery degradation against expected curves, enabling warranty claims and end-of-lease valuations.',
    },
    {
      number: 2,
      title: 'State of Charge (SoC)',
      description: 'Real-time SoC visibility for range anxiety mitigation, driver coaching, and dispatch planning.',
    },
    {
      number: 3,
      title: 'Energy Consumption Optimization',
      description: 'Identify inefficient driving behaviors and charging patterns to extend battery longevity.',
    },
  ]

  const moreCapabilities = [
    {
      number: 4,
      icon: Thermometer,
      title: 'Thermal Management',
      description: 'Cell temperature tracking detects anomalies before they cause degradation or costly replacements.',
    },
    {
      number: 5,
      icon: BatteryCharging,
      title: 'Charging Intelligence',
      description: 'Smart schedules based on grid pricing, battery state, and fleet needs reduce costs and wear.',
    },
    {
      number: 6,
      icon: BarChart3,
      title: 'Residual Value Prediction',
      description: 'AI-powered health projections forecast end-of-lease values with 94% accuracy.',
    },
  ]

  return (
    <div className="pb-16">

      {/* ================================================================= */}
      {/* HEADER */}
      {/* ================================================================= */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-serene-100 flex items-center justify-center">
            <Battery className="w-5 h-5 text-serene-600" />
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold tracking-wider">
            VELONA AI
          </span>
          <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Capability</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-serene-900 mb-2">
          Battery Management & EV Insights
        </h1>
        <p className="text-gray-500 max-w-2xl">
          Deep battery intelligence across your entire EV portfolio. Manage health, predict costs, and optimize the lease lifecycle for {formatNumber(data.totalEvs)} electric vehicles.
        </p>
      </motion.div>

      {/* ================================================================= */}
      {/* CAPABILITIES + FLEET HEALTH OVERVIEW — side by side */}
      {/* ================================================================= */}
      <motion.section
        className="mb-14"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Capability cards */}
          <div className="space-y-4">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.number}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.08 }}
                className="border-l-[3px] border-emerald-400 bg-white rounded-r-xl shadow-sm px-6 py-5"
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">
                    {cap.number}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-serene-900 mb-1">{cap.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Fleet health at-a-glance */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
          >
            <h3 className="font-display font-semibold text-serene-800 mb-5">Fleet Battery Overview</h3>

            {/* Big number + ring summary */}
            <div className="flex items-center gap-8 mb-8">
              <div>
                <p className="text-5xl font-display font-bold text-emerald-600 tabular-nums">{formatPercent(data.avgBatteryHealth)}</p>
                <p className="text-sm text-gray-500 mt-1">avg battery health</p>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(healthyCount / data.totalEvs) * 100}%` }} />
                  </div>
                  <span className="text-sm text-gray-600 w-20 text-right">{healthyCount} healthy</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(watchCount / data.totalEvs) * 100}%` }} />
                  </div>
                  <span className="text-sm text-gray-600 w-20 text-right">{watchCount} watch</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${(criticalCount / data.totalEvs) * 100}%` }} />
                  </div>
                  <span className="text-sm text-gray-600 w-20 text-right">{criticalCount} critical</span>
                </div>
              </div>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-display font-bold text-serene-900 tabular-nums">{formatNumber(data.totalEvs)}</p>
                <p className="text-xs text-gray-500 mt-0.5">EVs monitored</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-display font-bold text-serene-900 tabular-nums">{data.avgCurrentRange}/{data.avgRatedRange}</p>
                <p className="text-xs text-gray-500 mt-0.5">avg range (km)</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-display font-bold text-emerald-700 tabular-nums">{formatCurrency(data.replacementCostAvoided)}</p>
                <p className="text-xs text-gray-500 mt-0.5">cost avoided</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================================================================= */}
      {/* 3 MORE CAPABILITIES */}
      {/* ================================================================= */}
      <motion.section
        className="mb-14"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {moreCapabilities.map((cap) => {
            const Icon = cap.icon
            return (
              <div key={cap.number} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-serene-50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-serene-600" />
                  </div>
                  <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">{cap.number}</span>
                </div>
                <h3 className="font-display font-semibold text-serene-800 mb-2">{cap.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
              </div>
            )
          })}
        </div>
      </motion.section>

      {/* ================================================================= */}
      {/* VELONA AI INSIGHTS */}
      {/* ================================================================= */}
      <motion.section
        className="mb-14"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-2xl font-display font-bold text-serene-900">Velona AI Insights</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.insights.map((insight, i) => {
            const isRisk = insight.type === 'risk'
            return (
              <div key={i} className={cn('rounded-xl p-6 border', isRisk ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100')}>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className={cn('text-xs font-bold uppercase tracking-wider', isRisk ? 'text-red-600' : 'text-emerald-700')}>
                    {isRisk ? 'Action Required' : 'Opportunity'}
                  </span>
                </div>
                <h3 className={cn('text-lg font-display font-bold mb-2', isRisk ? 'text-red-900' : 'text-emerald-900')}>
                  {insight.headline}
                </h3>
                <p className={cn('text-sm mb-4', isRisk ? 'text-red-700/70' : 'text-emerald-700/70')}>
                  {insight.body}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {insight.vehicles.map(v => (
                    <span key={v} className={cn('px-2.5 py-1 rounded-lg text-xs font-medium', isRisk ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700')}>
                      {v}
                    </span>
                  ))}
                </div>
                <button className={cn('flex items-center gap-1 text-sm font-semibold transition-colors', isRisk ? 'text-red-700 hover:text-red-800' : 'text-emerald-700 hover:text-emerald-800')}>
                  {isRisk ? 'View replacement plan' : 'View optimization plan'} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      </motion.section>

      {/* ================================================================= */}
      {/* CHARTS */}
      {/* ================================================================= */}
      <motion.section
        className="mb-14"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        <h2 className="text-2xl font-display font-bold text-serene-900 mb-5">Battery Analytics</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-display font-semibold text-serene-800 mb-1">Health Distribution</h3>
            <p className="text-sm text-gray-400 mb-5">{formatNumber(data.totalEvs)} vehicles by battery health</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.healthDistribution} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <XAxis dataKey="range" tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <Tooltip
                    formatter={(value) => [`${value} vehicles`, 'Count']}
                    contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13 }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                    {data.healthDistribution.map((entry, i) => (
                      <motion.rect key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-display font-semibold text-serene-800 mb-1">Degradation Trend</h3>
            <p className="text-sm text-gray-400 mb-5">Fleet avg vs worst vehicle — 12 months</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.degradationTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="worstGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.08} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} domain={[70, 100]} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13 }}
                    formatter={(value) => [`${(value as number).toFixed(1)}%`, undefined]}
                  />
                  <Area type="monotone" dataKey="avgHealth" stroke="#10b981" strokeWidth={2.5} fill="url(#avgGrad)" name="Fleet Average" />
                  <Area type="monotone" dataKey="worstHealth" stroke="#ef4444" strokeWidth={2} strokeDasharray="6 4" fill="url(#worstGrad)" name="Worst Vehicle" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ================================================================= */}
      {/* VEHICLE TABLE */}
      {/* ================================================================= */}
      <motion.section
        className="mb-14"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-2xl font-display font-bold text-serene-900">Monitored Vehicles</h2>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-sm text-red-600 bg-red-50 px-3 py-1.5 rounded-full font-medium">
              <AlertTriangle className="w-3.5 h-3.5" /> {criticalCount} critical
            </span>
            <span className="flex items-center gap-1.5 text-sm text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full font-medium">
              <Shield className="w-3.5 h-3.5" /> {watchCount} watch
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Vehicle</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Customer</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Health</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Range</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Cycles</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Age</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.vehicles.map((v) => {
                  const healthColor =
                    v.batteryHealth >= 90 ? 'text-emerald-700 bg-emerald-50'
                      : v.batteryHealth >= 80 ? 'text-amber-700 bg-amber-50'
                      : 'text-red-700 bg-red-50'
                  const statusStyle =
                    v.status === 'healthy' ? 'text-emerald-700 bg-emerald-50'
                      : v.status === 'watch' ? 'text-amber-700 bg-amber-50'
                      : 'text-red-700 bg-red-50'

                  return (
                    <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-medium text-serene-800">{v.model}</p>
                        <p className="text-xs text-gray-400 font-mono">{v.vin}</p>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{v.customerName}</td>
                      <td className="px-5 py-3.5 text-right">
                        <span className={cn('inline-block text-xs font-bold px-2.5 py-1 rounded-full tabular-nums', healthColor)}>
                          {v.batteryHealth.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <p className="text-sm text-gray-600 tabular-nums">{v.currentRange}/{v.ratedRange} km</p>
                        <p className="text-xs text-gray-400">-{v.ratedRange - v.currentRange} km</p>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 text-right tabular-nums">{formatNumber(v.chargeCycles)}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 text-right tabular-nums">{v.ageMonths} mo</td>
                      <td className="px-5 py-3.5">
                        <span className={cn('inline-block text-xs font-bold px-2.5 py-1 rounded-full capitalize', statusStyle)}>
                          {v.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-400 pt-4">
        <Sparkles className="w-4 h-4 text-amber-400" />
        Battery intelligence powered by <span className="font-semibold text-gray-500">Velona AI</span>
      </div>
    </div>
  )
}
