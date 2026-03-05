import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, Minus, Wrench, AlertTriangle, Sparkles } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { cn, formatCurrency } from '@/lib/utils'
import {
  maintenanceKpis,
  monthlyMaintenanceTrend,
  topSuppliers,
  scheduledMaintenance,
} from '@/data/dashboard-maintenance'
import { insights } from '@/data/dashboard-insights'

const maxSupplierSpend = Math.max(...topSuppliers.map(s => s.spend))
const totalEstimatedCost = scheduledMaintenance.reduce((sum, m) => sum + m.estimatedCost, 0)

const statusColors: Record<string, string> = {
  'Scheduled': 'bg-emerald-100 text-emerald-700',
  'Pending Confirmation': 'bg-amber-100 text-amber-700',
  'Overdue': 'bg-red-100 text-red-700',
}

const priorityColors: Record<string, string> = {
  'High': 'bg-red-100 text-red-700',
  'Medium': 'bg-amber-100 text-amber-700',
  'Low': 'bg-gray-100 text-gray-600',
}

const severityBadge: Record<string, string> = {
  critical: 'bg-red-100 text-red-700',
  high: 'bg-amber-100 text-amber-700',
  medium: 'bg-blue-100 text-blue-700',
  low: 'bg-gray-100 text-gray-700',
}

const maintenanceInsights = insights
  .filter(i => i.category === 'Maintenance')
  .slice(0, 3)

export function MaintenancePage() {
  return (
    <div className="max-w-[960px] mx-auto px-6 py-6 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-display font-bold text-gray-900">Maintenance</h1>
        <p className="text-sm text-gray-500">Scheduling and maintenance costs</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        {maintenanceKpis.map((kpi, i) => (
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
        {/* Monthly Maintenance Trend */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
        >
          <h3 className="font-display font-bold text-gray-900 mb-0.5">Monthly Maintenance Trend</h3>
          <p className="text-xs text-gray-500 mb-3">Cost evolution over the last 12 months</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyMaintenanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
              <YAxis
                tick={{ fontSize: 10, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 11 }}
                formatter={(value) => [formatCurrency(value as number), 'Spend']}
              />
              <Bar dataKey="amount" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Suppliers by Spend */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
        >
          <h3 className="font-display font-bold text-gray-900 mb-0.5">Top Suppliers by Spend</h3>
          <p className="text-xs text-gray-500 mb-3">Maintenance spend by supplier</p>
          <div className="space-y-3">
            {topSuppliers.map((supplier, i) => (
              <div key={supplier.name} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-28 truncate" title={supplier.name}>{supplier.name}</span>
                <div className="flex-1 h-5 rounded bg-gray-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(supplier.spend / maxSupplierSpend) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
                    className="h-full rounded"
                    style={{ backgroundColor: supplier.color }}
                  />
                </div>
                <span className="text-xs text-gray-600 font-mono w-20 text-right">{formatCurrency(supplier.spend)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Upcoming Maintenance Table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
      >
        <div className="flex items-center gap-2 mb-1">
          <Wrench className="w-4 h-4 text-gray-400" />
          <h3 className="font-display font-bold text-gray-900">Upcoming Maintenance</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4">Scheduled maintenance and inspections</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 pr-3 text-gray-500 font-medium">Vehicle</th>
                <th className="text-left py-2 pr-3 text-gray-500 font-medium">Type</th>
                <th className="text-left py-2 pr-3 text-gray-500 font-medium">Date</th>
                <th className="text-left py-2 pr-3 text-gray-500 font-medium">Supplier</th>
                <th className="text-right py-2 pr-3 text-gray-500 font-medium">Est. Cost</th>
                <th className="text-left py-2 pr-3 text-gray-500 font-medium">Status</th>
                <th className="text-left py-2 text-gray-500 font-medium">Priority</th>
              </tr>
            </thead>
            <tbody>
              {scheduledMaintenance.map((m) => (
                <tr key={m.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-2.5 pr-3">
                    <div className="font-medium text-gray-900">{m.plate}</div>
                    <div className="text-gray-400 text-[10px]">{m.vehicle}</div>
                  </td>
                  <td className="py-2.5 pr-3 text-gray-700">{m.type}</td>
                  <td className="py-2.5 pr-3 text-gray-700">{m.date}</td>
                  <td className="py-2.5 pr-3 text-gray-700 max-w-[160px] truncate" title={m.supplier}>{m.supplier}</td>
                  <td className="py-2.5 pr-3 text-right text-gray-700 font-mono">{formatCurrency(m.estimatedCost)}</td>
                  <td className="py-2.5 pr-3">
                    <span className={cn('px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider', statusColors[m.status])}>
                      {m.status}
                    </span>
                  </td>
                  <td className="py-2.5">
                    <span className={cn('px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider', priorityColors[m.priority])}>
                      {m.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
          <span>{scheduledMaintenance.length} scheduled maintenance</span>
          <span>Total estimated cost: <span className="font-medium text-gray-900">{formatCurrency(totalEstimatedCost)}</span></span>
        </div>
      </motion.div>

      {/* Maintenance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.45 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
      >
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="font-display font-bold text-gray-900">Maintenance Insights</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4">AI-powered maintenance recommendations</p>
        <div className="space-y-4">
          {maintenanceInsights.map((insight) => (
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
