import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, Search } from 'lucide-react'
import {
  PieChart, Pie, Cell, ResponsiveContainer,
} from 'recharts'
import { cn, formatCurrency } from '@/lib/utils'
import { vehicles, fleetKpis } from '@/data/dashboard-fleet'

const typeFilters = ['All', 'Vans', 'Trucks', 'Cars'] as const
type TypeFilter = typeof typeFilters[number]

const typeToSingular: Record<string, string> = { Vans: 'Van', Trucks: 'Truck', Cars: 'Car' }

const fleetComposition = [
  { type: 'Vans', count: 510, pct: 60, color: '#0ea5e9' },
  { type: 'Trucks', count: 213, pct: 25, color: '#10b981' },
  { type: 'Cars', count: 127, pct: 15, color: '#0369a1' },
]

const vehicleStatusData = [
  { status: 'Active', count: fleetKpis.active, color: '#10b981' },
  { status: 'Maintenance', count: fleetKpis.inMaintenance, color: '#f59e0b' },
  { status: 'Inactive', count: fleetKpis.inactive, color: '#94a3b8' },
]

const statusBadge: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-700',
  Maintenance: 'bg-amber-100 text-amber-700',
  Inactive: 'bg-gray-100 text-gray-600',
}

const kpis = [
  { label: 'Fleet Size', value: fleetKpis.fleetSize.toLocaleString(), change: fleetKpis.deltaFleetSize, isPositive: true },
  { label: 'Active', value: fleetKpis.active.toLocaleString(), change: fleetKpis.deltaActive, isPositive: true },
  { label: 'In Maintenance', value: fleetKpis.inMaintenance.toLocaleString(), change: fleetKpis.deltaMaintenance, isPositive: true },
  { label: 'Inactive', value: fleetKpis.inactive.toLocaleString(), change: fleetKpis.deltaInactive, isPositive: true },
]

const typeInitialColor: Record<string, string> = {
  Van: 'bg-sky-500',
  Truck: 'bg-emerald-500',
  Car: 'bg-blue-800',
}

export function FleetPage() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesType = typeFilter === 'All' || v.type === typeToSingular[typeFilter]
      const term = searchTerm.toLowerCase()
      const matchesSearch =
        !term ||
        v.plate.toLowerCase().includes(term) ||
        v.make.toLowerCase().includes(term) ||
        v.model.toLowerCase().includes(term) ||
        v.driver.toLowerCase().includes(term)
      return matchesType && matchesSearch
    })
  }, [typeFilter, searchTerm])

  return (
    <div className="max-w-[960px] mx-auto px-6 py-6 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-display font-bold text-gray-900">Fleet Management</h1>
        <p className="text-sm text-gray-500">Vehicle status and details</p>
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
            <div className="text-2xl font-display font-bold text-gray-900">{kpi.value}</div>
            <div className="flex items-center gap-1 mt-1">
              {kpi.change === 0 ? (
                <span className="text-xs text-gray-400">No change</span>
              ) : (
                <>
                  {kpi.isPositive ? (
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
                  )}
                  <span className={cn('text-xs font-medium', kpi.isPositive ? 'text-emerald-600' : 'text-red-500')}>
                    {Math.abs(kpi.change)}%
                  </span>
                  <span className="text-xs text-gray-400">vs last month</span>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Fleet Composition */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
        >
          <h3 className="font-display font-bold text-gray-900 mb-0.5">Fleet Composition</h3>
          <p className="text-xs text-gray-500 mb-4">Vehicles by type</p>
          <div className="space-y-3">
            {fleetComposition.map((ft) => (
              <div key={ft.type} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-14">{ft.type}</span>
                <div className="flex-1 h-6 rounded-lg bg-gray-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${ft.pct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-lg flex items-center pl-2"
                    style={{ backgroundColor: ft.color }}
                  >
                    <span className="text-[10px] font-bold text-white">{ft.pct}%</span>
                  </motion.div>
                </div>
                <span className="text-xs text-gray-600 font-mono w-10 text-right">{ft.count}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-5 pt-4 border-t border-gray-100 text-center">
            <div>
              <div className="text-lg font-display font-bold text-gray-900">850</div>
              <div className="text-[10px] text-gray-400">Total</div>
            </div>
            <div>
              <div className="text-lg font-display font-bold text-gray-900">3</div>
              <div className="text-[10px] text-gray-400">Types</div>
            </div>
            <div>
              <div className="text-lg font-display font-bold text-gray-900">60%</div>
              <div className="text-[10px] text-gray-400">Vans</div>
            </div>
          </div>
        </motion.div>

        {/* Vehicle Status Donut */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
        >
          <h3 className="font-display font-bold text-gray-900 mb-0.5">Vehicle Status</h3>
          <p className="text-xs text-gray-500 mb-3">Current operational status</p>
          <div className="flex justify-center">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={vehicleStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  dataKey="count"
                  strokeWidth={2}
                  stroke="#fff"
                >
                  {vehicleStatusData.map((e) => (
                    <Cell key={e.status} fill={e.color} />
                  ))}
                </Pie>
                <text x="50%" y="46%" textAnchor="middle" className="fill-gray-400 text-[10px]">
                  Active
                </text>
                <text x="50%" y="56%" textAnchor="middle" className="fill-gray-900 text-sm font-bold">
                  {fleetKpis.active}
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2 text-[10px]">
            {vehicleStatusData.map((v) => (
              <div key={v.status} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: v.color }} />
                <span className="text-gray-600">{v.status}: {v.count}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.35 }}
        className="flex items-center gap-3"
      >
        <div className="flex gap-2">
          {typeFilters.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                typeFilter === t
                  ? 'bg-serene-800 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search plate, make, model, driver..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-serene-200 focus:border-serene-400"
          />
        </div>
        <span className="text-xs text-gray-500 ml-auto">
          Showing {filteredVehicles.length} of {vehicles.length} vehicles
        </span>
      </motion.div>

      {/* Vehicle Cards Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filteredVehicles.map((v, i) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.4 + i * 0.03 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={cn('w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0', typeInitialColor[v.type])}>
                {v.type[0]}
              </div>
              <div className="min-w-0">
                <div className="font-display font-bold text-gray-900 text-sm truncate">
                  {v.make} {v.model}
                </div>
                <div className="text-xs text-gray-400">{v.year}</div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs mb-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Plate</span>
                <span className="font-mono text-gray-700">{v.plate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Driver</span>
                <span className="text-gray-700 truncate ml-2">{v.driver}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Location</span>
                <span className="text-gray-700">{v.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Mileage</span>
                <span className="font-mono text-gray-700">{v.mileage.toLocaleString('de-DE')} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Maint. Cost</span>
                <span className="font-mono text-gray-700">{formatCurrency(v.monthlyMaintCost)}/mo</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={cn('px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider', statusBadge[v.status])}>
                {v.status}
              </span>
              {v.alerts.map((alert) => (
                <span key={alert} className="px-2 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-700">
                  {alert}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
