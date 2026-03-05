import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, TrendingDown, TrendingUp, Minus } from 'lucide-react'
import {
  PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { cn, formatCurrency } from '@/lib/utils'
import { expenseBreakdown, costTrends } from '@/data/fleet-dashboard'
import { insights } from '@/data/dashboard-insights'

const expenseTotal = expenseBreakdown.reduce((s, e) => s + e.amount, 0)

const timePeriods = ['This Month', 'Last Quarter', 'This Year'] as const

const kpis = [
  { label: 'Total Spend', value: 4250000, formatted: formatCurrency(4250000), change: -3.2, isPositive: true },
  { label: 'Avg Cost/Vehicle', value: 5000, formatted: formatCurrency(5000), change: -3.2, isPositive: true },
  { label: 'vs Last Month', value: 3.2, formatted: '3.2%', change: 3.2, isPositive: false },
  { label: 'Potential Savings', value: 47000, formatted: formatCurrency(47000), change: 12.5, isPositive: true },
]

const costDetails = [
  { category: 'Leasing', amount: 1487500, pct: 35, trend: 'stable' as const },
  { category: 'Fuel', amount: 1275000, pct: 30, trend: 'down' as const },
  { category: 'Maintenance', amount: 850000, pct: 20, trend: 'up' as const },
  { category: 'Insurance', amount: 425000, pct: 10, trend: 'stable' as const },
  { category: 'Other', amount: 212500, pct: 5, trend: 'down' as const },
]

const costInsights = insights.filter(
  (i) => i.category === 'Cost Optimization' || i.category === 'Maintenance' || i.category === 'Fuel'
).slice(0, 3)

const severityColor: Record<string, string> = {
  critical: 'bg-red-100 text-red-700',
  high: 'bg-amber-100 text-amber-700',
  medium: 'bg-blue-100 text-blue-700',
  low: 'bg-gray-100 text-gray-600',
}

export function CostsPage() {
  const [period, setPeriod] = useState<typeof timePeriods[number]>('This Month')

  return (
    <div className="max-w-[960px] mx-auto px-6 py-6 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-display font-bold text-gray-900">Cost Analysis</h1>
        <p className="text-sm text-gray-500">Detailed breakdown of fleet expenses</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05 + i * 0.04 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
          >
            <div className="text-xs text-gray-500 mb-1">{kpi.label}</div>
            <div className="text-2xl font-display font-bold text-gray-900">{kpi.formatted}</div>
            <div className="flex items-center gap-1 mt-1">
              {kpi.isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
              )}
              <span className={cn('text-xs font-medium', kpi.isPositive ? 'text-emerald-600' : 'text-red-500')}>
                {Math.abs(kpi.change)}%
              </span>
              <span className="text-xs text-gray-400">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Time Period Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.2 }}
        className="flex gap-2"
      >
        {timePeriods.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              period === p
                ? 'bg-serene-800 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            )}
          >
            {p}
          </button>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Cost Breakdown Donut */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
        >
          <h3 className="font-display font-bold text-gray-900 mb-0.5">Cost Breakdown</h3>
          <p className="text-xs text-gray-500 mb-3">Distribution by category</p>
          <div className="flex justify-center">
            <ResponsiveContainer width={220} height={220}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="amount"
                  strokeWidth={2}
                  stroke="#fff"
                >
                  {expenseBreakdown.map((e) => (
                    <Cell key={e.category} fill={e.color} />
                  ))}
                </Pie>
                <text x="50%" y="46%" textAnchor="middle" className="fill-gray-400 text-[10px]">
                  Total
                </text>
                <text x="50%" y="56%" textAnchor="middle" className="fill-gray-900 text-xs font-bold">
                  {formatCurrency(expenseTotal)}
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-xs">
            {expenseBreakdown.map((e) => (
              <div key={e.category} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
                <span className="text-gray-600">
                  {e.category}: {formatCurrency(e.amount)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cost Trends Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
        >
          <h3 className="font-display font-bold text-gray-900 mb-0.5">Cost Trends</h3>
          <p className="text-xs text-gray-500 mb-3">Monthly cost evolution</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={costTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
              <YAxis
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 11 }}
                formatter={(value) => [formatCurrency(value as number), '']}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="maintenance" name="Maintenance" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.1} strokeWidth={2} />
              <Area type="monotone" dataKey="fuel" name="Fuel" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
              <Area type="monotone" dataKey="leasing" name="Leasing" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Cost Details Table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.35 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
      >
        <h3 className="font-display font-bold text-gray-900 mb-0.5">Cost Details</h3>
        <p className="text-xs text-gray-500 mb-4">Breakdown by category</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="text-right py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="text-right py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">% of Total</th>
              <th className="text-right py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trend</th>
            </tr>
          </thead>
          <tbody>
            {costDetails.map((row, i) => (
              <tr key={row.category} className={cn('border-b border-gray-50 last:border-0', i % 2 === 1 && 'bg-gray-50/50')}>
                <td className="py-3 font-medium text-gray-900">{row.category}</td>
                <td className="py-3 text-right text-gray-700 font-mono">{formatCurrency(row.amount)}</td>
                <td className="py-3 text-right text-gray-500">{row.pct}%</td>
                <td className="py-3 text-right">
                  <span className="inline-flex items-center gap-1">
                    {row.trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-red-500" />}
                    {row.trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-emerald-500" />}
                    {row.trend === 'stable' && <Minus className="w-3.5 h-3.5 text-gray-400" />}
                    <span className={cn(
                      'text-xs font-medium',
                      row.trend === 'up' && 'text-red-500',
                      row.trend === 'down' && 'text-emerald-600',
                      row.trend === 'stable' && 'text-gray-400',
                    )}>
                      {row.trend === 'up' ? 'Increasing' : row.trend === 'down' ? 'Decreasing' : 'Stable'}
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Cost Insights */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
      >
        <h3 className="font-display font-bold text-gray-900 mb-0.5">Cost Insights</h3>
        <p className="text-xs text-gray-500 mb-4">AI-powered cost optimization recommendations</p>
        <div className="space-y-4">
          {costInsights.map((insight) => (
            <div key={insight.id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className={cn('px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider', severityColor[insight.severity])}>
                  {insight.severity}
                </span>
                {insight.isNew && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
                    New
                  </span>
                )}
              </div>
              <h4 className="font-display font-bold text-gray-900 text-sm mb-1">{insight.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-2">{insight.summary}</p>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="text-gray-400">Confidence: {insight.confidence}%</span>
                {insight.impact > 0 && (
                  <span className="text-gray-400">Impact: {formatCurrency(insight.impact)}</span>
                )}
                <span className="px-2 py-0.5 rounded-full bg-serene-25 text-serene-700 font-medium">
                  {insight.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
