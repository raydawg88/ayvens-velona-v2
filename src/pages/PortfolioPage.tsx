import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Truck, Euro, AlertTriangle, Leaf, ChevronDown, Users } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { StatCard } from '@/components/StatCard'
import { useStore } from '@/store/useStore'
import { regions } from '@/data/regions'
import { customers } from '@/data/customers'
import { sustainabilityData } from '@/data/sustainability'
import { formatCurrency, formatNumber, cn } from '@/lib/utils'

const regionColors: Record<string, string> = {
  spain: '#f59e0b',
  germany: '#3b82f6',
  france: '#8b5cf6',
  uk: '#ef4444',
}

function getSafetyBadge(score: number) {
  if (score >= 85) return { bg: 'bg-emerald-100', text: 'text-emerald-700' }
  if (score >= 70) return { bg: 'bg-amber-100', text: 'text-amber-700' }
  return { bg: 'bg-red-100', text: 'text-red-700' }
}

export function PortfolioPage() {
  const { selectedRegion, setSelectedRegion, getPortfolioStats } = useStore()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const stats = getPortfolioStats(selectedRegion)

  const filteredCustomers = useMemo(() => {
    return selectedRegion
      ? customers.filter(c => c.regionId === selectedRegion)
      : customers
  }, [selectedRegion])

  const chartData = useMemo(() => {
    return regions.map(r => ({
      name: r.name,
      vehicles: r.totalVehicles,
      regionId: r.id,
    }))
  }, [])

  const selectedRegionName = selectedRegion
    ? regions.find(r => r.id === selectedRegion)?.name ?? 'All Regions'
    : 'All Regions'

  const evPercent = sustainabilityData.evPercentage
  const evTarget = sustainabilityData.targetEvPercentage
  const progressRatio = (evPercent / evTarget) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-serene-800">
            Portfolio Overview
          </h1>
          <p className="text-gray-500 mt-1">
            {selectedRegion ? selectedRegionName : 'All regions'} — {stats.totalCustomers} customers, {formatNumber(stats.totalVehicles)} vehicles
          </p>
        </div>

        {/* Region Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow text-sm font-medium text-serene-700"
          >
            {selectedRegionName}
            <ChevronDown className={cn("w-4 h-4 transition-transform", dropdownOpen && "rotate-180")} />
          </button>
          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden">
                <button
                  onClick={() => { setSelectedRegion(null); setDropdownOpen(false) }}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm hover:bg-serene-50 transition-colors",
                    !selectedRegion && "bg-serene-50 text-serene-700 font-medium"
                  )}
                >
                  All Regions
                </button>
                {regions.map(r => (
                  <button
                    key={r.id}
                    onClick={() => { setSelectedRegion(r.id); setDropdownOpen(false) }}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-sm hover:bg-serene-50 transition-colors",
                      selectedRegion === r.id && "bg-serene-50 text-serene-700 font-medium"
                    )}
                  >
                    {r.flag} {r.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* KPI Stats Row */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <StatCard
          icon={Building2}
          value={stats.totalCustomers}
          label="Customers"
          sublabel={selectedRegion ? selectedRegionName : 'All regions'}
          color="teal"
        />
        <StatCard
          icon={Truck}
          value={formatNumber(stats.totalVehicles)}
          label="Vehicles"
          sublabel={`${formatNumber(stats.totalDrivers)} drivers`}
          color="blue"
        />
        <StatCard
          icon={Euro}
          value={formatCurrency(stats.totalMonthlySpend)}
          label="Monthly Spend"
          sublabel="Across fleet"
          color="amber"
        />
        <StatCard
          icon={AlertTriangle}
          value={stats.totalAlerts}
          label="AI Alerts"
          sublabel={`${stats.criticalAlerts} critical`}
          color="red"
        />
        {/* Sustainability / Decarbonization Card */}
        <Link to="/sustainability" className="block">
          <div className="bg-white rounded-xl border border-gray-100 border-l-4 border-l-emerald-400 p-5 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-emerald-50">
                <Leaf className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-2xl font-display font-bold text-serene-800">{evPercent}% EV</p>
                <p className="text-sm text-gray-500">Decarbonization Goals</p>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>{evPercent}%</span>
                    <span>Target: {evTarget}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${progressRatio}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Regions + Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Region Cards */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-display font-semibold text-serene-800 mb-4">Regions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {regions.map((region, i) => {
              const isActive = selectedRegion === region.id
              return (
                <motion.button
                  key={region.id}
                  onClick={() => setSelectedRegion(isActive ? null : region.id)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={cn(
                    "text-left p-4 rounded-xl border transition-all",
                    isActive
                      ? "border-serene-300 bg-serene-50 shadow-md"
                      : "border-gray-100 bg-white hover:shadow-md hover:border-gray-200"
                  )}
                >
                  <span className="text-2xl">{region.flag}</span>
                  <p className="font-semibold text-serene-800 mt-2">{region.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {region.customerCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      {formatNumber(region.totalVehicles)}
                    </span>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Vehicles by Region Chart */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-serene-800 mb-4">Vehicles by Region</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '0.75rem',
                  border: '1px solid #e5e7eb',
                  fontSize: '0.8rem',
                }}
                formatter={(value) => [formatNumber(value as number), 'Vehicles']}
              />
              <Bar dataKey="vehicles" radius={[6, 6, 0, 0]}>
                {chartData.map((entry) => (
                  <Cell
                    key={entry.regionId}
                    fill={
                      selectedRegion && selectedRegion !== entry.regionId
                        ? '#e5e7eb'
                        : regionColors[entry.regionId]
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Customers Table */}
      <div>
        <h2 className="text-lg font-display font-semibold text-serene-800 mb-4">
          Customers {selectedRegion && <span className="text-gray-400 font-normal text-sm ml-2">Filtered by {selectedRegionName}</span>}
        </h2>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Region</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Vehicles</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Drivers</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Monthly Spend</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Safety Score</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Compliance</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Savings</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, i) => {
                  const region = regions.find(r => r.id === customer.regionId)
                  const badge = getSafetyBadge(customer.safetyScore)
                  return (
                    <motion.tr
                      key={customer.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-5 py-3.5 font-medium text-serene-800">{customer.name}</td>
                      <td className="px-5 py-3.5 text-gray-500">
                        {region?.flag} {region?.name}
                      </td>
                      <td className="px-5 py-3.5 text-right text-gray-700">{formatNumber(customer.vehicleCount)}</td>
                      <td className="px-5 py-3.5 text-right text-gray-700">{formatNumber(customer.driverCount)}</td>
                      <td className="px-5 py-3.5 text-right text-gray-700">{formatCurrency(customer.monthlySpend)}</td>
                      <td className="px-5 py-3.5 text-center">
                        <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold", badge.bg, badge.text)}>
                          {customer.safetyScore}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right text-gray-700">{customer.complianceRate}%</td>
                      <td className="px-5 py-3.5 text-right font-medium text-emerald-600">{formatCurrency(customer.aiSavings)}</td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
