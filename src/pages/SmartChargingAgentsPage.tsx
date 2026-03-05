import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, BatteryCharging, Car, CalendarCheck, Sparkles, Check, Bell, Home, MapPin, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { agents, scheduledVehicles } from '@/data/smart-charging-agents'
import type { AgentConfig, AgentFeedItem } from '@/data/smart-charging-agents'

const iconMap = {
  Zap,
  BatteryCharging,
  Car,
  CalendarCheck,
}

const colorMap = {
  amber: {
    bg: 'bg-amber-50',
    ring: 'bg-amber-100',
    icon: 'text-amber-600',
    dot: 'bg-amber-400',
    border: 'border-amber-200',
    label: 'text-amber-700',
    node: '#f59e0b',
  },
  serene: {
    bg: 'bg-serene-25',
    ring: 'bg-serene-100',
    icon: 'text-serene-600',
    dot: 'bg-serene-400',
    border: 'border-serene-200',
    label: 'text-serene-700',
    node: '#0369a1',
  },
  emerald: {
    bg: 'bg-emerald-50',
    ring: 'bg-emerald-100',
    icon: 'text-emerald-600',
    dot: 'bg-emerald-400',
    border: 'border-emerald-200',
    label: 'text-emerald-700',
    node: '#10b981',
  },
  violet: {
    bg: 'bg-violet-50',
    ring: 'bg-violet-100',
    icon: 'text-violet-600',
    dot: 'bg-violet-400',
    border: 'border-violet-200',
    label: 'text-violet-700',
    node: '#7c3aed',
  },
}

// ── Agent Card with Live Feed ────────────────────────────────────────
function AgentCard({ agent, index }: { agent: AgentConfig; index: number }) {
  const [visibleItems, setVisibleItems] = useState<AgentFeedItem[]>(
    agent.feedItems.slice(0, 4)
  )
  const [nextIndex, setNextIndex] = useState(4)
  const [elapsed, setElapsed] = useState(0)

  const colors = colorMap[agent.color]
  const Icon = iconMap[agent.icon]

  const cycleItem = useCallback(() => {
    setVisibleItems(prev => {
      const next = agent.feedItems[nextIndex % agent.feedItems.length]
      return [next, ...prev.slice(0, 3)]
    })
    setNextIndex(prev => prev + 1)
    setElapsed(0)
  }, [agent.feedItems, nextIndex])

  useEffect(() => {
    const interval = setInterval(cycleItem, 2500 + index * 400)
    return () => clearInterval(interval)
  }, [cycleItem, index])

  useEffect(() => {
    const tick = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(tick)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 + index * 0.08 }}
      className={cn(
        'bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col',
        colors.border
      )}
    >
      {/* Header */}
      <div className="p-4 pb-3 flex items-start gap-3">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', colors.ring)}>
          <Icon className={cn('w-5 h-5', colors.icon)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-gray-900 text-sm">{agent.name}</h3>
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className={cn('w-2 h-2 rounded-full shrink-0', colors.dot)}
            />
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{agent.role}</p>
        </div>
      </div>

      {/* Live Feed */}
      <div className="px-4 pb-3 flex-1">
        <div className="bg-gray-50 rounded-lg p-3 min-h-[140px]">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Live Feed</span>
          </div>
          <div className="space-y-1.5 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleItems.map((item) => (
                <motion.div
                  key={item.id + '-' + visibleItems.indexOf(item)}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-xs text-gray-600 font-mono leading-relaxed truncate"
                >
                  {item.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-3">
        <span className="text-[10px] text-gray-400">Updated {elapsed}s ago</span>
      </div>
    </motion.div>
  )
}

// ── Orchestration Flow SVG ───────────────────────────────────────────
function OrchestrationFlow() {
  const nodes = [
    { label: 'Energy Cost', color: colorMap.amber.node, sub: 'Tariff data' },
    { label: 'Stations', color: colorMap.serene.node, sub: 'Availability' },
    { label: 'Fleet Vehicles', color: colorMap.emerald.node, sub: 'Vehicle needs' },
    { label: 'Schedule', color: colorMap.violet.node, sub: 'Output' },
  ]

  const nodeSpacing = 220
  const startX = 80
  const cy = 60

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <h3 className="font-display font-bold text-gray-900">Agent Orchestration Flow</h3>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 780 130" className="w-full min-w-[600px] h-auto" fill="none">
          {/* Connection lines */}
          {nodes.slice(0, -1).map((_, i) => {
            const x1 = startX + i * nodeSpacing + 24
            const x2 = startX + (i + 1) * nodeSpacing - 24
            return (
              <g key={`line-${i}`}>
                <motion.line
                  x1={x1} y1={cy} x2={x2} y2={cy}
                  stroke="#d1d5db"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8 + i * 0.4 }}
                />
                {/* Animated dot */}
                <motion.circle
                  r={4}
                  fill={nodes[i].color}
                  initial={{ cx: x1, cy, opacity: 0 }}
                  animate={{
                    cx: [x1, x2],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 2 + i * 0.6,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: 'linear',
                  }}
                />
              </g>
            )
          })}

          {/* Nodes */}
          {nodes.map((node, i) => {
            const cx_pos = startX + i * nodeSpacing
            return (
              <g key={node.label}>
                <motion.circle
                  cx={cx_pos} cy={cy} r={22}
                  fill="white"
                  stroke={node.color}
                  strokeWidth={3}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.15, type: 'spring' }}
                />
                <motion.circle
                  cx={cx_pos} cy={cy} r={6}
                  fill={node.color}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.15 }}
                />
                <text
                  x={cx_pos} y={cy + 38}
                  textAnchor="middle"
                  className="fill-gray-700 text-[11px] font-semibold"
                >
                  {node.label}
                </text>
                <text
                  x={cx_pos} y={cy + 52}
                  textAnchor="middle"
                  className="fill-gray-400 text-[10px]"
                >
                  {node.sub}
                </text>
              </g>
            )
          })}

          {/* Arrow at end */}
          <motion.polygon
            points={`${startX + 3 * nodeSpacing + 28},${cy} ${startX + 3 * nodeSpacing + 40},${cy} ${startX + 3 * nodeSpacing + 36},${cy - 4} ${startX + 3 * nodeSpacing + 40},${cy} ${startX + 3 * nodeSpacing + 36},${cy + 4}`}
            fill={colorMap.violet.node}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          />
        </svg>
      </div>
    </motion.div>
  )
}

// ── Mobile App Mockup ────────────────────────────────────────────────
function MobileAppMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.8 }}
      className="flex justify-center py-8"
    >
      <div className="relative">
        {/* Phone frame */}
        <div className="w-[280px] h-[560px] bg-white rounded-[2.5rem] border-[3px] border-gray-800 shadow-2xl overflow-hidden relative">
          {/* Status bar */}
          <div className="bg-gray-900 text-white px-6 pt-3 pb-2 flex items-center justify-between text-[10px]">
            <span className="font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-white rounded-sm relative">
                <div className="absolute inset-0.5 bg-emerald-400 rounded-[1px]" style={{ width: '70%' }} />
              </div>
            </div>
          </div>

          {/* App header */}
          <div className="bg-gray-900 px-5 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-white text-xs font-bold">Ayvens Smart Charging</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3 bg-gray-50 flex-1">
            {/* Scheduled card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="text-[11px] font-bold text-gray-900">Your car is scheduled</span>
              </div>
              <div className="space-y-1 text-[10px] text-gray-600">
                <p className="font-medium text-gray-800">VIN-7823 · BMW iX3</p>
                <p>Charging tonight at 23:00</p>
                <p>Station: Amsterdam Zuidas (AMS-04)</p>
                <p>Ready by 06:20 with 91% SoC</p>
              </div>
              <div className="mt-3 flex gap-2">
                <div className="flex-1 bg-emerald-50 rounded-lg py-2 text-center">
                  <div className="text-[10px] text-gray-500">Cost</div>
                  <div className="text-xs font-bold text-emerald-700">€2.97</div>
                </div>
                <div className="flex-1 bg-serene-25 rounded-lg py-2 text-center">
                  <div className="text-[10px] text-gray-500">Savings</div>
                  <div className="text-xs font-bold text-serene-700">€14.20</div>
                </div>
              </div>
            </motion.div>

            {/* V2X card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[11px] font-bold text-gray-900">V2X Opportunity</span>
              </div>
              <p className="text-[10px] text-gray-600">Earn €8.40 by discharging 18:00-20:00 before your scheduled charge.</p>
              <div className="mt-2 flex gap-2">
                <button className="flex-1 bg-serene-600 text-white text-[10px] font-medium rounded-lg py-1.5">Accept</button>
                <button className="flex-1 bg-gray-100 text-gray-600 text-[10px] font-medium rounded-lg py-1.5">Skip</button>
              </div>
            </motion.div>

            {/* Tomorrow preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="bg-white rounded-xl p-3 shadow-sm border border-gray-100"
            >
              <span className="text-[10px] font-medium text-gray-500">Tomorrow</span>
              <p className="text-[10px] text-gray-700 mt-0.5">Route BER → HAM · 280km · Charge stop at BER-07 (DC 150kW)</p>
            </motion.div>
          </div>

          {/* Push notification overlay */}
          <AnimatePresence>
            <motion.div
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.4, type: 'spring', stiffness: 200 }}
              className="absolute top-12 left-3 right-3 bg-white rounded-2xl shadow-lg border border-gray-200 p-3 flex items-start gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-serene-100 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-serene-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-900">Smart Charging</p>
                <p className="text-[9px] text-gray-500 mt-0.5">Save €14.20 by charging after 23:00 instead of now</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom tab bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-around">
            {[
              { icon: Home, label: 'Home' },
              { icon: MapPin, label: 'Stations' },
              { icon: Zap, label: 'Charging', active: true },
              { icon: Settings, label: 'Settings' },
            ].map((tab) => (
              <div key={tab.label} className="flex flex-col items-center gap-0.5">
                <tab.icon className={cn('w-4 h-4', tab.active ? 'text-serene-600' : 'text-gray-400')} />
                <span className={cn('text-[8px]', tab.active ? 'text-serene-600 font-medium' : 'text-gray-400')}>{tab.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main Page ────────────────────────────────────────────────────────
export function SmartChargingAgentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mini Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center gap-4">
          <img
            src="https://www.ayvens.com/-/media/ayvens/public/cp/logos/website/ayvens-logo-serene-blue-with-tagline.png"
            alt="Ayvens"
            className="h-10"
          />
          <div className="w-px h-6 bg-gray-200" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="font-display font-bold text-serene-800">Velona AI Agent Network</span>
          </div>
          <div className="ml-auto">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
              Live Demo
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-8 space-y-8">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-display font-bold text-serene-800">Smart Charging Agents</h1>
          <p className="text-gray-500 mt-1 max-w-2xl">
            Four specialized AI agents working in concert to optimize EV charging across your fleet.
            Each agent monitors a different data source and feeds into a unified scheduling engine.
          </p>
        </motion.section>

        {/* Agent Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {agents.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} index={i} />
          ))}
        </section>

        {/* Flow Diagram */}
        <OrchestrationFlow />

        {/* Schedule Output */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="bg-white rounded-xl border border-gray-100 shadow-sm"
        >
          <div className="p-6 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="font-display font-bold text-gray-900">Tonight's Charging Schedule</h3>
                <p className="text-sm text-gray-500 mt-0.5">Generated by Schedule & Alert Agent</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-serene-25 text-serene-700 text-xs font-medium">6 vehicles</span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">€47.80 saved</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                  <th className="px-6 py-3 font-medium">Vehicle</th>
                  <th className="px-6 py-3 font-medium">Model</th>
                  <th className="px-6 py-3 font-medium">Station</th>
                  <th className="px-6 py-3 font-medium">Start</th>
                  <th className="px-6 py-3 font-medium">Duration</th>
                  <th className="px-6 py-3 font-medium">Cost</th>
                  <th className="px-6 py-3 font-medium">Target</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {scheduledVehicles.map((v, i) => (
                  <motion.tr
                    key={v.vin}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.06 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50"
                  >
                    <td className="px-6 py-3 font-mono text-xs text-gray-700">{v.vin}</td>
                    <td className="px-6 py-3 text-gray-700">{v.model}</td>
                    <td className="px-6 py-3 font-mono text-xs text-gray-600">{v.station}</td>
                    <td className="px-6 py-3 font-mono text-xs">{v.startTime}</td>
                    <td className="px-6 py-3 text-gray-600">{v.duration}</td>
                    <td className="px-6 py-3 font-mono text-xs">€{v.costEur.toFixed(2)}</td>
                    <td className="px-6 py-3 font-mono text-xs">{v.targetSoc}%</td>
                    <td className="px-6 py-3">
                      <span className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-medium',
                        v.status === 'scheduled' && 'bg-serene-25 text-serene-700',
                        v.status === 'alert-sent' && 'bg-amber-50 text-amber-700',
                        v.status === 'charging' && 'bg-emerald-50 text-emerald-700',
                      )}>
                        {v.status === 'alert-sent' ? 'Alert Sent' : v.status === 'charging' ? 'Charging' : 'Scheduled'}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary stats */}
          <div className="p-6 pt-4 flex flex-wrap gap-6 text-sm">
            <div>
              <span className="text-gray-500">Savings vs peak</span>
              <span className="ml-2 font-bold text-emerald-700">€47.80</span>
            </div>
            <div>
              <span className="text-gray-500">V2X windows</span>
              <span className="ml-2 font-bold text-serene-700">3 identified</span>
            </div>
            <div>
              <span className="text-gray-500">Fleet readiness</span>
              <span className="ml-2 font-bold text-emerald-700">97% by 07:00</span>
            </div>
          </div>
        </motion.section>

        {/* Mobile App Section */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <div className="text-center mb-4">
            <h3 className="font-display font-bold text-gray-900 text-xl">Driver Experience</h3>
            <p className="text-sm text-gray-500 mt-1">Agents push schedules and savings alerts directly to the driver's phone</p>
          </div>
          <MobileAppMockup />
        </motion.section>
      </main>
    </div>
  )
}
