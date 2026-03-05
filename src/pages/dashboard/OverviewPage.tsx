import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Sparkles, ChevronRight, ArrowUpRight, ArrowDownRight,
} from 'lucide-react'
import {
  PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { cn, formatCurrency } from '@/lib/utils'
import {
  fleetStats, expenseBreakdown, costTrends, vehicleStatus,
  fleetByType, recentInsights, velonaBanner,
} from '@/data/fleet-dashboard'

const expenseTotal = expenseBreakdown.reduce((s, e) => s + e.amount, 0)

export function OverviewPage() {
  return (
    <div className="max-w-[960px] mx-auto px-6 py-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-display font-bold text-gray-900">Overview</h1>
        <p className="text-sm text-gray-500">Complete analysis of your fleet</p>
      </motion.div>

      {/* Velona AI Banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}
        className="bg-serene-800 rounded-xl p-5 text-white"
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-gray-900 text-[10px] font-bold tracking-wider">VELONA AI</span>
        </div>
        <div className="text-xl font-display font-bold mb-1">Velona AI discoveries: {velonaBanner.discoveries}</div>
        <div className="text-white/60 text-sm mb-3">
          Potential Savings: <span className="text-white font-bold text-lg">{formatCurrency(velonaBanner.potentialSavings)}</span>
        </div>
        <Link to="/dashboard/insights" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-serene-800 text-sm font-semibold hover:bg-white/90 transition-colors">
          View all insights <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4">
        {fleetStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 + i * 0.04 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
          >
            <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
            <div className="text-2xl font-display font-bold text-gray-900">{stat.value}</div>
            <div className="flex items-center gap-1 mt-1">
              {stat.isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
              )}
              <span className={cn('text-xs font-medium', stat.isPositive ? 'text-emerald-600' : 'text-red-500')}>
                {stat.change}%
              </span>
              <span className="text-xs text-gray-400">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-display font-bold text-gray-900 mb-0.5">Breakdown</h3>
          <p className="text-xs text-gray-500 mb-3">Detailed breakdown of fleet expenses</p>
          <div className="flex justify-center">
            <ResponsiveContainer width={220} height={220}>
              <PieChart>
                <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="amount" strokeWidth={2} stroke="#fff">
                  {expenseBreakdown.map(e => <Cell key={e.category} fill={e.color} />)}
                </Pie>
                <text x="50%" y="46%" textAnchor="middle" className="fill-gray-400 text-[10px]">Total</text>
                <text x="50%" y="56%" textAnchor="middle" className="fill-gray-900 text-xs font-bold">{formatCurrency(expenseTotal)}</text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-xs">
            {expenseBreakdown.map(e => (
              <div key={e.category} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
                <span className="text-gray-600">{e.category}: {formatCurrency(e.amount)}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.35 }} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-display font-bold text-gray-900 mb-0.5">Trends</h3>
          <p className="text-xs text-gray-500 mb-3">Cost Trends</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={costTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 11 }} formatter={(value) => [formatCurrency(value as number), '']} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="maintenance" name="Maintenance" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.1} strokeWidth={2} />
              <Area type="monotone" dataKey="fuel" name="Fuel" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
              <Area type="monotone" dataKey="leasing" name="Leasing" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Recent Insights */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display font-bold text-gray-900">Recent Insights</h3>
            <Link to="/dashboard/insights" className="flex items-center gap-1 text-xs text-serene-600 font-medium hover:text-serene-700">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-xs text-gray-500 mb-4">Critical & High</p>
          <div className="space-y-4">
            {recentInsights.map((insight, i) => (
              <div key={i} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-red-100 text-red-700">{insight.severity}</span>
                  {insight.isNew && <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">New</span>}
                </div>
                <h4 className="font-display font-bold text-gray-900 text-sm mb-1">{insight.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-2">{insight.description}</p>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-gray-400">Confidence: {insight.confidence}</span>
                  <span className="px-2 py-0.5 rounded-full bg-serene-25 text-serene-700 font-medium">{insight.category}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Fleet Status */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.45 }} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-display font-bold text-gray-900 mb-0.5">Fleet Status</h3>
          <p className="text-xs text-gray-500 mb-3">Vehicle status and details</p>
          <p className="text-xs font-medium text-gray-700 mb-2">Vehicle Status</p>
          <div className="flex justify-center">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={vehicleStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={72} dataKey="count" strokeWidth={2} stroke="#fff">
                  {vehicleStatus.map(e => <Cell key={e.status} fill={e.color} />)}
                </Pie>
                <text x="50%" y="48%" textAnchor="middle" className="fill-gray-900 text-sm font-bold">
                  {vehicleStatus[0].count} ({vehicleStatus[0].pct}%)
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-1 mb-5 text-[10px]">
            {vehicleStatus.map(v => (
              <div key={v.status} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: v.color }} />
                <span className="text-gray-600">{v.status}: {v.count} ({v.pct}%)</span>
              </div>
            ))}
          </div>
          <p className="text-xs font-medium text-gray-700 mb-3">Fleet by Type</p>
          <div className="space-y-3">
            {fleetByType.map(ft => (
              <div key={ft.type} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-12">{ft.type}</span>
                <div className="flex-1 h-5 rounded bg-gray-100 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${ft.pct}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} className="h-full rounded" style={{ backgroundColor: ft.color }} />
                </div>
                <span className="text-xs text-gray-600 font-mono w-20 text-right">{ft.count} ({ft.pct}%)</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
            {[
              { value: '850', label: 'Total Vehicles' },
              { value: '92%', label: 'Active Rate' },
              { value: '4.2 yrs', label: 'Avg. Fleet Age' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-lg font-display font-bold text-gray-900">{s.value}</div>
                <div className="text-[10px] text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
