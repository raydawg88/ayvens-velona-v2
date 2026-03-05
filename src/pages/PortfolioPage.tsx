import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Building2, Truck, Euro, AlertTriangle, Zap,
  ChevronRight, Send,
} from 'lucide-react'
import { useStore } from '@/store/useStore'
import { customers } from '@/data/customers'
import { portfolioInsights } from '@/data/insights'
import { formatCurrency, formatNumber, cn } from '@/lib/utils'

function getSeverityStyle(severity: string) {
  switch (severity) {
    case 'critical': return { bg: 'bg-red-100', text: 'text-red-700', label: 'Critical' }
    case 'high': return { bg: 'bg-amber-100', text: 'text-amber-700', label: 'High' }
    case 'medium': return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Medium' }
    default: return { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Low' }
  }
}

export function PortfolioPage() {
  const { selectedRegion, getPortfolioStats } = useStore()
  const stats = getPortfolioStats(selectedRegion)

  const filteredCustomers = useMemo(() => {
    return selectedRegion
      ? customers.filter(c => c.regionId === selectedRegion)
      : customers
  }, [selectedRegion])

  const totalSavings = customers.reduce((sum, c) => sum + c.aiSavings, 0)

  return (
    <div className="space-y-6">
      {/* KPI Stats Row - 4 cards */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <StatCard
          icon={Building2}
          value={stats.totalCustomers}
          label="Customers"
          borderColor="border-l-teal-400"
          iconBg="bg-teal-50"
          iconColor="text-teal-600"
        />
        <StatCard
          icon={Truck}
          value={formatNumber(stats.totalVehicles)}
          label="Vehicles"
          borderColor="border-l-serene-400"
          iconBg="bg-serene-50"
          iconColor="text-serene-600"
        />
        <StatCard
          icon={Euro}
          value={formatCurrency(stats.totalMonthlySpend)}
          label="Monthly Spend"
          borderColor="border-l-amber-400"
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          icon={AlertTriangle}
          value={stats.totalAlerts}
          label={`AI Alerts (${stats.criticalAlerts} critical)`}
          borderColor="border-l-red-400"
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />
      </motion.div>

      {/* VELONA AI Dark Banner */}
      <motion.div
        className="bg-gray-800 rounded-2xl p-6 text-white"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-serene-500/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-400 text-gray-900 text-xs font-bold tracking-wider">
            VELONA AI
          </span>
        </div>

        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
              <Euro className="w-4 h-4" />
              EST SAVINGS
            </div>
            <p className="text-3xl font-display font-bold text-emerald-400">
              {formatCurrency(totalSavings)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Critical Alerts</p>
            <p className="text-2xl font-bold text-red-400">{stats.criticalAlerts}</p>
          </div>
        </div>

        <p className="text-sm text-gray-300 mb-4">
          Across your {selectedRegion ? 'region' : 'portfolio'}, Velona AI is actively monitoring{' '}
          {formatNumber(stats.totalVehicles)} vehicles and identifying cost-saving opportunities in real-time.
        </p>

        {/* Chat input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Ask Velona about your portfolio..."
            className="w-full bg-gray-700/50 border border-gray-600 rounded-full px-5 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-serene-400 transition-colors"
            readOnly
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-serene-500 flex items-center justify-center hover:bg-serene-600 transition-colors">
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </motion.div>

      {/* Two-column layout: Discoveries + Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Cross-Customer Discoveries */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="p-5 border-b border-gray-100">
              <h2 className="font-display font-semibold text-serene-800">Cross-Customer Discoveries</h2>
              <p className="text-sm text-gray-400 mt-0.5">AI-identified issues across accounts</p>
            </div>
            <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
              {portfolioInsights.slice(0, 8).map((insight) => {
                const sev = getSeverityStyle(insight.severity)
                return (
                  <div key={insight.id} className="p-4 hover:bg-gray-50/50 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5", sev.bg)}>
                        {insight.severity === 'critical' ? (
                          <AlertTriangle className={cn("w-4 h-4", sev.text)} />
                        ) : insight.severity === 'high' ? (
                          <AlertTriangle className={cn("w-4 h-4", sev.text)} />
                        ) : (
                          <Zap className={cn("w-4 h-4", sev.text)} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase", sev.bg, sev.text)}>
                            {sev.label}
                          </span>
                          <span className="text-xs text-gray-400 truncate">{insight.customerName}</span>
                          {insight.potentialSavings && (
                            <span className="ml-auto text-xs font-bold text-emerald-600 shrink-0">
                              {formatCurrency(insight.potentialSavings)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-serene-800 truncate">{insight.title}</p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{insight.summary}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Right: Customers Grid */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-serene-800">Customers</h2>
            <span className="text-sm text-gray-400">{filteredCustomers.length} accounts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCustomers.map((customer, i) => (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.03 }}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-serene-800">{customer.name}</h3>
                    <p className="text-sm text-gray-400">{formatNumber(customer.vehicleCount)} vehicles</p>
                  </div>
                  {customer.alertCount > 0 && (
                    <div className="flex items-center gap-1 text-amber-500">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-xs font-bold">{customer.alertCount}</span>
                    </div>
                  )}
                </div>

                {/* AI Savings badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
                    EST SAVINGS
                    <span className="text-emerald-600">{formatCurrency(customer.aiSavings)}</span>
                  </span>
                </div>

                {/* Safety + Compliance */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-serene-800">{customer.safetyScore}</p>
                    <p className="text-xs text-gray-400">Safety Score</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-serene-800">{customer.complianceRate}%</p>
                    <p className="text-xs text-gray-400">Compliance</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    {formatCurrency(customer.monthlySpend)}/mo
                  </span>
                  <Link
                    to={`/fleet?customer=${customer.id}`}
                    className="flex items-center gap-1 text-sm font-medium text-serene-600 hover:text-serene-700 transition-colors"
                  >
                    View details
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Inline StatCard matching the original 4-card design
function StatCard({
  icon: Icon,
  value,
  label,
  borderColor,
  iconBg,
  iconColor,
}: {
  icon: React.ComponentType<{ className?: string }>
  value: string | number
  label: string
  borderColor: string
  iconBg: string
  iconColor: string
}) {
  return (
    <div className={cn("bg-white rounded-xl border border-gray-100 border-l-4 p-5 shadow-sm", borderColor)}>
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", iconBg)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
        <div>
          <p className="text-2xl font-display font-bold text-serene-800">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  )
}
