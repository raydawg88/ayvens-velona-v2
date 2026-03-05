import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, AlertTriangle, TrendingUp, Sparkles, Search } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import {
  insights,
  insightSummary,
  severityOptions,
  categoryOptions,
  type Insight,
} from '@/data/dashboard-insights'

const severityColors: Record<Insight['severity'], { badge: string }> = {
  critical: { badge: 'bg-red-100 text-red-700' },
  high: { badge: 'bg-amber-100 text-amber-700' },
  medium: { badge: 'bg-blue-100 text-blue-700' },
  low: { badge: 'bg-gray-100 text-gray-700' },
}

export function InsightsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [categoryFilter, setCategoryFilter] = useState<string>('All')
  const [search, setSearch] = useState('')

  const filtered = insights.filter((insight) => {
    if (activeFilter !== 'All' && insight.severity !== activeFilter.toLowerCase()) return false
    if (categoryFilter !== 'All' && insight.category !== categoryFilter) return false
    if (search && !insight.title.toLowerCase().includes(search.toLowerCase()) && !insight.summary.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="max-w-[960px] mx-auto px-6 py-6 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-display font-bold text-gray-900">Insights</h1>
        <p className="text-sm text-gray-500">AI Discoveries</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total', value: insightSummary.total, icon: Lightbulb, color: 'bg-serene-50 text-serene-600' },
          { label: 'Critical', value: insightSummary.critical, icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
          { label: 'Potential Savings', value: formatCurrency(insightSummary.potentialSavings), icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'New', value: insightSummary.new, icon: Sparkles, color: 'bg-amber-50 text-amber-600' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05 + i * 0.04 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
          >
            <div className="flex items-center gap-3">
              <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', stat.color.split(' ')[0])}>
                <stat.icon className={cn('w-4.5 h-4.5', stat.color.split(' ')[1])} />
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-xl font-display font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.2 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3"
      >
        {/* Severity Toggles */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium mr-1">Severity</span>
          {severityOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setActiveFilter(opt)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                activeFilter === opt
                  ? 'bg-serene-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Category + Search */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1 overflow-x-auto">
            <span className="text-xs text-gray-500 font-medium mr-1 shrink-0">Category</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 border-0 outline-none cursor-pointer"
            >
              {categoryOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search insights..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg text-xs bg-gray-100 text-gray-700 border-0 outline-none placeholder:text-gray-400 w-52"
            />
          </div>
        </div>
      </motion.div>

      {/* Results count */}
      <p className="text-xs text-gray-400">{filtered.length} insight{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Insight Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((insight, i) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05 + i * 0.03 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
          >
            {/* Badges */}
            <div className="flex items-center gap-2 mb-3">
              <span className={cn('px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider', severityColors[insight.severity].badge)}>
                {insight.severity}
              </span>
              {insight.isNew && (
                <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
                  NEW
                </span>
              )}
            </div>

            {/* Title & Summary */}
            <h3 className="font-display font-bold text-gray-900 text-sm mb-1.5">{insight.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">{insight.summary}</p>

            {/* Impact & Confidence */}
            <div className="flex items-center gap-3 mb-3">
              {insight.impact > 0 && (
                <span className="text-xs font-semibold text-emerald-700">
                  {formatCurrency(insight.impact)}
                </span>
              )}
              <span className="text-[10px] text-gray-400">
                Confidence: {insight.confidence}%
              </span>
            </div>

            {/* Category & Customer */}
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-serene-25 text-serene-700 text-[10px] font-medium">
                {insight.category}
              </span>
              <span className="text-[10px] text-gray-400">{insight.customer}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
