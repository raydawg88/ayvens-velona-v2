import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, AreaChart, Area, CartesianGrid,
} from 'recharts'
import {
  Leaf, TrendingDown, TrendingUp, Minus, Zap,
  AlertTriangle, CheckCircle, Clock, Sparkles,
  ChevronRight,
} from 'lucide-react'
import { cn, formatCurrency, formatNumber, formatPercent } from '@/lib/utils'
import { sustainabilityData } from '@/data/sustainability'
import { regions } from '@/data/regions'

const CHART_COLORS = { ev: '#10b981', hybrid: '#f59e0b', ice: '#94a3b8' }

const emissionsTrend = [
  { month: 'Apr', actual: 5120, target: 5000 },
  { month: 'May', actual: 4980, target: 4900 },
  { month: 'Jun', actual: 4870, target: 4800 },
  { month: 'Jul', actual: 4790, target: 4700 },
  { month: 'Aug', actual: 4720, target: 4600 },
  { month: 'Sep', actual: 4640, target: 4500 },
  { month: 'Oct', actual: 4510, target: 4400 },
  { month: 'Nov', actual: 4490, target: 4350 },
  { month: 'Dec', actual: 4420, target: 4300 },
  { month: 'Jan', actual: 4380, target: 4200 },
  { month: 'Feb', actual: 4320, target: 4100 },
  { month: 'Mar', actual: 4280, target: 4000 },
]

function TrendIcon({ trend }: { trend: 'improving' | 'stable' | 'declining' }) {
  if (trend === 'improving') return <TrendingUp className="w-4 h-4 text-emerald-500" />
  if (trend === 'declining') return <TrendingDown className="w-4 h-4 text-red-500" />
  return <Minus className="w-4 h-4 text-gray-400" />
}

export function SustainabilityPage() {
  const data = sustainabilityData
  const regionMap = useMemo(() => Object.fromEntries(regions.map((r) => [r.id, r])), [])
  const totalCarbonFees = data.customerSustainability.reduce((sum, c) => sum + c.carbonFees, 0)

  const fleetComposition = [
    { name: 'Electric', value: data.evCount, color: CHART_COLORS.ev },
    { name: 'Hybrid', value: data.hybridCount, color: CHART_COLORS.hybrid },
    { name: 'ICE', value: data.iceCount, color: CHART_COLORS.ice },
  ]

  const emissionsByRegion = useMemo(() => {
    const byRegion: Record<string, number> = {}
    data.customerSustainability.forEach((c) => {
      byRegion[c.regionId] = (byRegion[c.regionId] || 0) + c.monthlyEmissions
    })
    return regions.map((r) => ({ name: `${r.flag} ${r.name}`, emissions: byRegion[r.id] || 0 }))
  }, [data.customerSustainability])

  const declining = data.customerSustainability.filter(c => c.trend === 'declining')
  const topPerformers = [...data.customerSustainability].sort((a, b) => b.efficiencyScore - a.efficiencyScore).slice(0, 3)

  const goalStatusConfig = {
    'on-track': { label: 'On Track', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', bar: 'bg-emerald-500', icon: CheckCircle },
    'at-risk': { label: 'At Risk', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', bar: 'bg-amber-500', icon: AlertTriangle },
    'behind': { label: 'Behind', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', bar: 'bg-red-500', icon: Clock },
  }

  return (
    <div className="pb-16">

      {/* ================================================================= */}
      {/* HEADER — light, clean */}
      {/* ================================================================= */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold tracking-wider">
            VELONA AI
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-serene-900 mb-2">
          Sustainability & Decarbonization
        </h1>
        <p className="text-gray-500">
          {formatNumber(data.totalVehicles)} vehicles across {regions.length} markets
        </p>
      </motion.div>

      {/* ================================================================= */}
      {/* 4 STAT CARDS */}
      {/* ================================================================= */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">CO₂ Emissions</p>
          <p className="text-3xl font-display font-bold text-serene-900 tabular-nums">{formatNumber(data.totalCo2MonthlyTons)}</p>
          <p className="text-sm text-gray-400 mt-1">tons / month</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">EV Adoption</p>
          <p className="text-3xl font-display font-bold text-emerald-600 tabular-nums">{formatPercent(data.evPercentage)}</p>
          <p className="text-sm text-gray-400 mt-1">target {data.targetEvPercentage}%</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">Carbon Fees</p>
          <p className="text-3xl font-display font-bold text-red-600 tabular-nums">{formatCurrency(totalCarbonFees)}</p>
          <p className="text-sm text-gray-400 mt-1">per month</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm text-gray-500 mb-1">Projected Savings</p>
          <p className="text-3xl font-display font-bold text-emerald-600 tabular-nums">{formatCurrency(data.projectedAnnualSavings)}</p>
          <p className="text-sm text-gray-400 mt-1">annually</p>
        </div>
      </motion.div>

      {/* ================================================================= */}
      {/* VELONA AI INSIGHTS — 2 cards, light bg */}
      {/* ================================================================= */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-14"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {/* Risk */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Action Required</span>
          </div>
          <h3 className="text-lg font-display font-bold text-red-900 mb-2">
            3 accounts declining — {formatCurrency(Math.round(totalCarbonFees * 0.38))}/mo at risk
          </h3>
          <p className="text-sm text-red-700/70 mb-4">
            Valencia, Lyon, and Marseille fleets worsening. 38% of carbon fee exposure.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {declining.map(c => (
              <span key={c.customerId} className="px-2.5 py-1 rounded-lg bg-red-100 text-red-700 text-xs font-medium">
                {c.customerName} · {c.efficiencyScore}
              </span>
            ))}
          </div>
          <button className="flex items-center gap-1 text-sm font-semibold text-red-700 hover:text-red-800 transition-colors">
            View intervention plan <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Opportunity */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Opportunity</span>
          </div>
          <h3 className="text-lg font-display font-bold text-emerald-900 mb-2">
            Replicate top performers to save {formatCurrency(480000)}/yr
          </h3>
          <p className="text-sm text-emerald-700/70 mb-4">
            German fleet leads at 20% EV. Apply their playbook to Spain & France.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {topPerformers.map(c => (
              <span key={c.customerId} className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-medium">
                {c.customerName} · {c.efficiencyScore}
              </span>
            ))}
          </div>
          <button className="flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors">
            View rollout plan <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* ================================================================= */}
      {/* GOALS */}
      {/* ================================================================= */}
      <motion.section
        className="mb-14"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-2xl font-display font-bold text-serene-900">Decarbonization Goals</h2>
          <span className="text-sm text-gray-400">
            {data.goals.filter(g => g.status === 'on-track').length}/{data.goals.length} on track
          </span>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-100">
          {data.goals.map((goal) => {
            const pct = Math.min((goal.current / goal.target) * 100, 100)
            const s = goalStatusConfig[goal.status]
            const StatusIcon = s.icon
            return (
              <div key={goal.id} className="px-6 py-4 flex items-center gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display font-semibold text-serene-800">{goal.title}</h3>
                    <span className={cn('inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border', s.bg, s.text, s.border)}>
                      <StatusIcon className="w-3 h-3" />
                      {s.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={cn('h-full rounded-full', s.bar)}
                      />
                    </div>
                    <span className="text-sm font-medium text-serene-800 tabular-nums shrink-0 w-28 text-right">
                      {goal.current}{goal.unit} / {goal.target}{goal.unit}
                    </span>
                    <span className="text-sm text-gray-400 shrink-0 w-20 text-right">{goal.deadline}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.section>

      {/* ================================================================= */}
      {/* EMISSIONS TRAJECTORY + FLEET MIX */}
      {/* ================================================================= */}
      <motion.section
        className="mb-14"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h2 className="text-2xl font-display font-bold text-serene-900 mb-5">Emissions & Fleet</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trajectory */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-display font-semibold text-serene-800">CO₂ Trajectory</h3>
                <p className="text-sm text-gray-400">Actual vs target — 12 months</p>
              </div>
              <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                {data.co2ReductionYoY}% YoY
              </span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={emissionsTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} domain={[3800, 5400]} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13 }}
                    formatter={(value) => [`${formatNumber(value as number)} tons`, undefined]}
                  />
                  <Area type="monotone" dataKey="actual" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#actualGrad)" name="Actual" />
                  <Area type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="6 4" fill="none" name="Target" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Fleet mix */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-display font-semibold text-serene-800 mb-1">Fleet Mix</h3>
            <p className="text-sm text-gray-400 mb-4">{formatNumber(data.totalVehicles)} vehicles</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={fleetComposition} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value" stroke="none">
                    {fleetComposition.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${formatNumber(value as number)}`, name as string]}
                    contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5 mt-2">
              {fleetComposition.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-serene-800 tabular-nums">{formatNumber(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ================================================================= */}
      {/* REGIONAL EMISSIONS */}
      {/* ================================================================= */}
      <motion.section
        className="mb-14"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-display font-semibold text-serene-800 mb-1">Emissions by Region</h3>
            <p className="text-sm text-gray-400 mb-5">Monthly CO₂ (tons)</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emissionsByRegion} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <XAxis type="number" tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} width={120} />
                  <Tooltip
                    formatter={(value) => [`${formatNumber(value as number)} tons`, 'Emissions']}
                    contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13 }}
                  />
                  <Bar dataKey="emissions" fill="#0ea5e9" radius={[0, 6, 6, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Savings card */}
          <div className="bg-emerald-600 rounded-xl p-8 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Zap className="w-5 h-5 text-emerald-200" />
                <span className="text-emerald-200 text-sm font-medium">Full EV Transition</span>
              </div>
              <p className="text-emerald-100 text-sm mb-2">Annual Savings</p>
              <p className="text-4xl font-display font-bold tabular-nums mb-6">{formatCurrency(data.projectedAnnualSavings)}</p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-emerald-200 text-sm mb-1">Carbon fees eliminated</p>
                  <p className="text-xl font-display font-bold tabular-nums">{formatCurrency(totalCarbonFees * 12)}/yr</p>
                </div>
                <div>
                  <p className="text-emerald-200 text-sm mb-1">Per vehicle saved</p>
                  <p className="text-xl font-display font-bold tabular-nums">{formatCurrency(2200)}/mo</p>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-500/40">
              <p className="text-sm text-emerald-200">Payback period: 2.6 years</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ================================================================= */}
      {/* CUSTOMER TABLE */}
      {/* ================================================================= */}
      <motion.section
        className="mb-14"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h2 className="text-2xl font-display font-bold text-serene-900 mb-5">By Customer</h2>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Customer</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Vehicles</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">EV %</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Emissions</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Carbon Fees</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Score</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-left">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[...data.customerSustainability].sort((a, b) => b.efficiencyScore - a.efficiencyScore).map((c) => {
                  const region = regionMap[c.regionId]
                  const scoreColor =
                    c.efficiencyScore > 75 ? 'text-emerald-700 bg-emerald-50'
                      : c.efficiencyScore >= 55 ? 'text-amber-700 bg-amber-50'
                      : 'text-red-700 bg-red-50'

                  return (
                    <tr key={c.customerId} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-medium text-serene-800">{c.customerName}</p>
                        <p className="text-xs text-gray-400">{region ? `${region.flag} ${region.name}` : c.regionId}</p>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 text-right tabular-nums">{formatNumber(c.totalVehicles)}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 text-right tabular-nums">{formatPercent(c.evPercentage)}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 text-right tabular-nums">{formatNumber(c.monthlyEmissions)}t</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 text-right tabular-nums">{formatCurrency(c.carbonFees)}</td>
                      <td className="px-5 py-3.5 text-right">
                        <span className={cn('inline-block text-xs font-bold px-2.5 py-1 rounded-full', scoreColor)}>{c.efficiencyScore}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <TrendIcon trend={c.trend} />
                          <span className={cn('text-sm capitalize', c.trend === 'improving' && 'text-emerald-600', c.trend === 'declining' && 'text-red-600', c.trend === 'stable' && 'text-gray-500')}>{c.trend}</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* ================================================================= */}
      {/* FOOTER */}
      {/* ================================================================= */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-400 pt-4">
        <Sparkles className="w-4 h-4 text-amber-400" />
        All insights powered by <span className="font-semibold text-gray-500">Velona AI</span>
      </div>
    </div>
  )
}
