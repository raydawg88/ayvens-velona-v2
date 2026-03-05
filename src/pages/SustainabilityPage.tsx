import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts'
import {
  Leaf, TrendingDown, TrendingUp, Minus, Zap, Factory,
  DollarSign, Target, ArrowRight, Fuel, Battery, Car,
  ChevronUp, ChevronDown, AlertTriangle, CheckCircle, Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils'
import { sustainabilityData } from '@/data/sustainability'
import { regions } from '@/data/regions'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

const today = new Date().toLocaleDateString('en-GB', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

type SortKey =
  | 'customerName'
  | 'regionId'
  | 'totalVehicles'
  | 'evCount'
  | 'evPercentage'
  | 'monthlyEmissions'
  | 'emissionsPerVehicle'
  | 'carbonFees'
  | 'efficiencyScore'
  | 'trend'

type SortDir = 'asc' | 'desc'

const CHART_COLORS = { ev: '#10b981', hybrid: '#f59e0b', ice: '#6b7280' }

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-display font-bold text-serene-800">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      <div className="h-px bg-gradient-to-r from-serene-200 to-transparent mt-3" />
    </div>
  )
}

function KpiCard({
  icon: Icon,
  label,
  value,
  badge,
  badgeColor = 'green',
  sublabel,
  index,
}: {
  icon: typeof Leaf
  label: string
  value: string
  badge?: string
  badgeColor?: 'green' | 'amber' | 'blue'
  sublabel?: string
  index: number
}) {
  const badgeStyles = {
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    blue: 'bg-serene-50 text-serene-700 border-serene-200',
  }

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-serene-50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-serene-600" />
        </div>
        {badge && (
          <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full border', badgeStyles[badgeColor])}>
            {badge}
          </span>
        )}
      </div>
      <p className="text-2xl font-display font-bold text-serene-800">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      {sublabel && <p className="text-xs text-gray-400 mt-1">{sublabel}</p>}
    </motion.div>
  )
}

function GoalCard({ goal, index }: { goal: (typeof sustainabilityData.goals)[0]; index: number }) {
  const pct = Math.min((goal.current / goal.target) * 100, 100)
  const statusConfig = {
    'on-track': { label: 'On Track', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', bar: 'bg-emerald-500', icon: CheckCircle },
    'at-risk': { label: 'At Risk', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', bar: 'bg-amber-500', icon: AlertTriangle },
    'behind': { label: 'Behind', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', bar: 'bg-red-500', icon: Clock },
  }
  const s = statusConfig[goal.status]
  const StatusIcon = s.icon

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-semibold text-serene-800 text-sm">{goal.title}</h3>
        <span className={cn('inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border', s.bg, s.text, s.border)}>
          <StatusIcon className="w-3 h-3" />
          {s.label}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
          className={cn('absolute inset-y-0 left-0 rounded-full', s.bar)}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          {goal.current}{goal.unit} / {goal.target}{goal.unit}
        </span>
        <span>Deadline: {goal.deadline}</span>
      </div>
    </motion.div>
  )
}

function TrendIcon({ trend }: { trend: 'improving' | 'stable' | 'declining' }) {
  if (trend === 'improving') return <TrendingUp className="w-4 h-4 text-emerald-500" />
  if (trend === 'declining') return <TrendingDown className="w-4 h-4 text-red-500" />
  return <Minus className="w-4 h-4 text-gray-400" />
}

function SortableHeader({
  label,
  sortKey,
  currentSort,
  currentDir,
  onSort,
  align = 'left',
}: {
  label: string
  sortKey: SortKey
  currentSort: SortKey
  currentDir: SortDir
  onSort: (key: SortKey) => void
  align?: 'left' | 'right'
}) {
  const active = currentSort === sortKey
  return (
    <th
      className={cn(
        'px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:text-serene-600 transition-colors whitespace-nowrap',
        align === 'right' && 'text-right',
      )}
      onClick={() => onSort(sortKey)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {active && (currentDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}
      </span>
    </th>
  )
}

// Custom Recharts tooltip
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload) return null
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 px-4 py-3 text-sm">
      <p className="font-semibold text-serene-800 mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-gray-600">
          <span className="inline-block w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
          {entry.name}: {formatNumber(entry.value)} tons
        </p>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export function SustainabilityPage() {
  const data = sustainabilityData

  // Sort state for the customer table
  const [sortKey, setSortKey] = useState<SortKey>('efficiencyScore')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sortedCustomers = useMemo(() => {
    const list = [...data.customerSustainability]
    list.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      return sortDir === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number)
    })
    return list
  }, [data.customerSustainability, sortKey, sortDir])

  // Region lookup
  const regionMap = useMemo(() => Object.fromEntries(regions.map((r) => [r.id, r])), [])

  // Chart data: fleet composition
  const fleetComposition = [
    { name: 'Electric', value: data.evCount, color: CHART_COLORS.ev },
    { name: 'Hybrid', value: data.hybridCount, color: CHART_COLORS.hybrid },
    { name: 'ICE', value: data.iceCount, color: CHART_COLORS.ice },
  ]

  // Chart data: emissions by region
  const emissionsByRegion = useMemo(() => {
    const byRegion: Record<string, number> = {}
    data.customerSustainability.forEach((c) => {
      byRegion[c.regionId] = (byRegion[c.regionId] || 0) + c.monthlyEmissions
    })
    return regions.map((r) => ({
      name: `${r.flag} ${r.name}`,
      emissions: byRegion[r.id] || 0,
    }))
  }, [data.customerSustainability])

  // Financial comparison data
  const financialComparison = [
    { category: 'Fuel / Energy', ice: 2840000, ev: 385000, delta: -2455000 },
    { category: 'Maintenance', ice: 1240000, ev: 480000, delta: -760000 },
    { category: 'Carbon Credits', ice: 0, ev: 156000, delta: 156000 },
    { category: 'Total Monthly', ice: 4080000, ev: 865000, delta: -3215000 },
  ]

  // Action plan
  const actions = [
    { priority: 'P0', color: 'text-red-600 bg-red-50 border-red-200', action: 'Replace 23 worst-performing ICE vehicles with EVs', impact: '-18.2 tons CO2/yr', timeline: 'Q2 2026' },
    { priority: 'P1', color: 'text-amber-600 bg-amber-50 border-amber-200', action: 'Install Level 2 chargers at 3 depot locations', impact: 'Enable 50% EV fleet', timeline: 'Q3 2026' },
    { priority: 'P1', color: 'text-amber-600 bg-amber-50 border-amber-200', action: 'Implement route optimization for remaining ICE', impact: '-12% fuel usage', timeline: 'Q2 2026' },
    { priority: 'P2', color: 'text-serene-600 bg-serene-50 border-serene-200', action: 'Driver eco-training program (idle reduction)', impact: '-8% emissions', timeline: 'Q3 2026' },
    { priority: 'P2', color: 'text-serene-600 bg-serene-50 border-serene-200', action: 'Negotiate carbon credit partnerships', impact: '+33K/yr revenue', timeline: 'Q4 2026' },
  ]

  return (
    <div className="space-y-10 pb-12">
      {/* ---------------------------------------------------------------- */}
      {/* Header */}
      {/* ---------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-display font-bold text-serene-800 flex items-center gap-2">
              <Leaf className="w-8 h-8 text-emerald-500" />
              Sustainability & Decarbonization
            </h1>
            <p className="text-gray-500 mt-1">
              Fleet-wide environmental performance and carbon reduction progress
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-serene-700 bg-serene-50 border border-serene-200 rounded-full px-3 py-1.5 shrink-0">
            <Clock className="w-3.5 h-3.5" />
            {today}
          </span>
        </div>
      </motion.div>

      {/* ---------------------------------------------------------------- */}
      {/* KPI Cards */}
      {/* ---------------------------------------------------------------- */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <KpiCard
            icon={Factory}
            label="Total CO2 Emissions"
            value={`${formatNumber(data.totalCo2MonthlyTons)} tons/mo`}
            badge={`${data.co2ReductionYoY}% YoY`}
            badgeColor="green"
            index={0}
          />
          <KpiCard
            icon={Battery}
            label="EV Fleet Percentage"
            value={formatPercent(data.evPercentage)}
            badge={`Target ${data.targetEvPercentage}% by ${data.targetYear}`}
            badgeColor="blue"
            index={1}
          />
          <KpiCard
            icon={Fuel}
            label="Monthly Fuel Savings from EVs"
            value={formatCurrency(data.monthlySavingsFromEv)}
            sublabel="Compared to equivalent ICE operating costs"
            index={2}
          />
          <KpiCard
            icon={Target}
            label="Carbon Intensity Score"
            value={`${data.carbonIntensityScore}/100`}
            badge="Good"
            badgeColor="green"
            sublabel="Fleet-wide efficiency rating"
            index={3}
          />
          <KpiCard
            icon={Leaf}
            label="Annual Carbon Credits"
            value={formatCurrency(data.annualCarbonCredits)}
            sublabel="Revenue from EV-generated credits"
            index={4}
          />
          <KpiCard
            icon={DollarSign}
            label="Projected Annual Savings"
            value={formatCurrency(data.projectedAnnualSavings)}
            badge="At current trajectory"
            badgeColor="amber"
            index={5}
          />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Decarbonization Goals */}
      {/* ---------------------------------------------------------------- */}
      <section>
        <SectionHeader title="Decarbonization Goals" subtitle="Progress toward fleet sustainability targets" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.goals.map((goal, i) => (
            <GoalCard key={goal.id} goal={goal} index={i} />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Charts Row: Fleet Composition + Emissions by Region */}
      {/* ---------------------------------------------------------------- */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fleet Composition */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
        >
          <SectionHeader title="Fleet Composition" subtitle={`${formatNumber(data.totalVehicles)} total vehicles`} />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fleetComposition}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {fleetComposition.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${formatNumber(value as number)} vehicles`, name as string]}
                  contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                />
                <Legend
                  verticalAlign="bottom"
                  formatter={(value: string) => {
                    const item = fleetComposition.find((f) => f.name === value)
                    return `${value} (${item ? formatNumber(item.value) : ''})`
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Emissions by Region */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
        >
          <SectionHeader title="Emissions by Region" subtitle="Monthly CO2 emissions (tons)" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emissionsByRegion} layout="vertical" margin={{ left: 20, right: 20 }}>
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={130} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="emissions" name="Emissions" fill="#0ea5e9" radius={[0, 6, 6, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Customer Sustainability Table */}
      {/* ---------------------------------------------------------------- */}
      <section>
        <SectionHeader title="Customer Sustainability Performance" subtitle="Detailed breakdown by customer account" />
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50/80">
                <tr>
                  <SortableHeader label="Customer" sortKey="customerName" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} />
                  <SortableHeader label="Region" sortKey="regionId" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} />
                  <SortableHeader label="Vehicles" sortKey="totalVehicles" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} align="right" />
                  <SortableHeader label="EV Count" sortKey="evCount" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} align="right" />
                  <SortableHeader label="EV %" sortKey="evPercentage" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} align="right" />
                  <SortableHeader label="Emissions (t)" sortKey="monthlyEmissions" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} align="right" />
                  <SortableHeader label="kg/Vehicle" sortKey="emissionsPerVehicle" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} align="right" />
                  <SortableHeader label="Carbon Fees" sortKey="carbonFees" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} align="right" />
                  <SortableHeader label="Score" sortKey="efficiencyScore" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} align="right" />
                  <SortableHeader label="Trend" sortKey="trend" currentSort={sortKey} currentDir={sortDir} onSort={handleSort} />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sortedCustomers.map((c) => {
                  const region = regionMap[c.regionId]
                  const scoreColor =
                    c.efficiencyScore > 75
                      ? 'text-emerald-700 bg-emerald-50'
                      : c.efficiencyScore >= 55
                        ? 'text-amber-700 bg-amber-50'
                        : 'text-red-700 bg-red-50'

                  return (
                    <tr key={c.customerId} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-3 py-3 text-sm font-medium text-serene-800">{c.customerName}</td>
                      <td className="px-3 py-3 text-sm text-gray-600">
                        {region ? `${region.flag} ${region.name}` : c.regionId}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-600 text-right">{formatNumber(c.totalVehicles)}</td>
                      <td className="px-3 py-3 text-sm text-gray-600 text-right">{formatNumber(c.evCount)}</td>
                      <td className="px-3 py-3 text-sm text-gray-600 text-right">{formatPercent(c.evPercentage)}</td>
                      <td className="px-3 py-3 text-sm text-gray-600 text-right">{formatNumber(c.monthlyEmissions)}</td>
                      <td className="px-3 py-3 text-sm text-gray-600 text-right">{formatNumber(c.emissionsPerVehicle)}</td>
                      <td className="px-3 py-3 text-sm text-gray-600 text-right">{formatCurrency(c.carbonFees)}</td>
                      <td className="px-3 py-3 text-right">
                        <span className={cn('inline-block text-xs font-bold px-2 py-0.5 rounded-full', scoreColor)}>
                          {c.efficiencyScore}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1.5">
                          <TrendIcon trend={c.trend} />
                          <span className={cn(
                            'text-xs capitalize',
                            c.trend === 'improving' && 'text-emerald-600',
                            c.trend === 'declining' && 'text-red-600',
                            c.trend === 'stable' && 'text-gray-500',
                          )}>
                            {c.trend}
                          </span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Financial Impact */}
      {/* ---------------------------------------------------------------- */}
      <section>
        <SectionHeader title="Financial Impact Analysis" subtitle="ICE vs EV fleet operating cost comparison (monthly, fleet-wide)" />
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Cost Category</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">ICE Fleet</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">EV Fleet</th>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {financialComparison.map((row, i) => {
                  const isTotal = i === financialComparison.length - 1
                  return (
                    <tr key={row.category} className={cn(isTotal && 'bg-serene-25 font-semibold')}>
                      <td className={cn('px-5 py-3.5 text-sm', isTotal ? 'text-serene-800 font-bold' : 'text-gray-700')}>
                        {row.category}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 text-right">{formatCurrency(row.ice)}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 text-right">{formatCurrency(row.ev)}</td>
                      <td className={cn('px-5 py-3.5 text-sm text-right font-semibold', row.delta < 0 ? 'text-emerald-600' : row.delta > 0 ? 'text-emerald-600' : 'text-gray-500')}>
                        {row.delta < 0
                          ? `-${formatCurrency(Math.abs(row.delta))}`
                          : row.delta > 0
                            ? `+${formatCurrency(row.delta)}`
                            : '-'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Savings callout */}
          <div className="border-t border-gray-100 bg-emerald-50/50 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-800">
                Each ICE-to-EV conversion saves ~{formatCurrency(2200)}/month in operating costs.
              </p>
              <p className="text-xs text-emerald-600 mt-0.5">
                Replacing the 23 worst-performing ICE vehicles first yields {formatCurrency(476000)} in annual savings with a 2.6-year payback period.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Action Plan */}
      {/* ---------------------------------------------------------------- */}
      <section>
        <SectionHeader title="Decarbonization Action Plan" subtitle="Recommended actions ranked by impact and feasibility" />
        <div className="space-y-3">
          {actions.map((a, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3"
            >
              {/* Priority badge */}
              <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full border shrink-0 w-fit', a.color)}>
                {a.priority}
              </span>

              {/* Action description */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-serene-800">{a.action}</p>
              </div>

              {/* Impact + Timeline */}
              <div className="flex items-center gap-4 shrink-0 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-serene-400" />
                  {a.impact}
                </span>
                <span className="flex items-center gap-1">
                  <ArrowRight className="w-3.5 h-3.5 text-serene-400" />
                  {a.timeline}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Flagged vehicles callout */}
        <motion.div
          custom={actions.length}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-4 bg-red-50/50 border border-red-100 rounded-xl px-5 py-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
              <Car className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-red-800 mb-2">Vehicles Flagged for Immediate Replacement</p>
              <div className="space-y-1 text-xs font-mono text-red-700">
                <p>ZFBHRFBB...V34767 &mdash; 2019 Ram ProMaster &mdash; 8.2 mpg &mdash; {formatCurrency(2400)}/mo fuel</p>
                <p>3C6LRVAD...B4432 &mdash; 2018 Ram 2500 &mdash; 9.1 mpg &mdash; {formatCurrency(2100)}/mo fuel</p>
                <p>1FTEX1CP...C26866 &mdash; 2016 F-150 &mdash; 11.3 mpg &mdash; {formatCurrency(1800)}/mo fuel</p>
              </div>
              <p className="text-xs text-red-600 mt-2">
                These 3 vehicles burn {formatCurrency(6300)}/month in fuel &mdash; more than the entire 18-vehicle EV fleet's energy cost. Replacing them pays for itself in 14 months.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
