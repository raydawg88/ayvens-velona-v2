import { useState } from 'react'
import { motion } from 'framer-motion'
import { ListTodo, AlertTriangle, Clock, TrendingUp, Check, Circle } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { actionTasks, actionSummary, type ActionTask } from '@/data/dashboard-actions'

const priorityColors: Record<ActionTask['priority'], string> = {
  critical: 'bg-red-100 text-red-700',
  high: 'bg-amber-100 text-amber-700',
  medium: 'bg-blue-100 text-blue-700',
  low: 'bg-gray-100 text-gray-700',
}

const statusColors: Record<ActionTask['status'], string> = {
  open: 'bg-gray-100 text-gray-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  completed: 'bg-emerald-100 text-emerald-700',
  blocked: 'bg-red-100 text-red-700',
}

const statusLabels: Record<ActionTask['status'], string> = {
  open: 'Open',
  'in-progress': 'In Progress',
  completed: 'Completed',
  blocked: 'Blocked',
}

const priorityOptions = ['All', 'Critical', 'High', 'Medium', 'Low'] as const
const statusOptions = ['All', 'Open', 'In Progress', 'Completed'] as const

const statusFilterMap: Record<string, ActionTask['status'] | undefined> = {
  'All': undefined,
  'Open': 'open',
  'In Progress': 'in-progress',
  'Completed': 'completed',
}

export function ActionCenterPage() {
  const [priorityFilter, setPriorityFilter] = useState<string>('All')
  const [statusFilter, setStatusFilter] = useState<string>('All')

  const filtered = actionTasks.filter((task) => {
    if (priorityFilter !== 'All' && task.priority !== priorityFilter.toLowerCase()) return false
    const mappedStatus = statusFilterMap[statusFilter]
    if (mappedStatus && task.status !== mappedStatus) return false
    return true
  })

  return (
    <div className="max-w-[960px] mx-auto px-6 py-6 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-display font-bold text-gray-900">Action Center</h1>
        <p className="text-sm text-gray-500">Manage tasks and workflows</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Tasks', value: actionSummary.total, icon: ListTodo, color: 'bg-serene-50 text-serene-600' },
          { label: 'Critical', value: actionSummary.critical, icon: AlertTriangle, color: 'bg-red-50 text-red-600' },
          { label: 'Due Today', value: actionSummary.dueToday, icon: Clock, color: 'bg-amber-50 text-amber-600' },
          { label: 'Total Impact', value: formatCurrency(actionSummary.totalImpact), icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
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
        {/* Priority Toggles */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium mr-1">Priority</span>
          {priorityOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setPriorityFilter(opt)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                priorityFilter === opt
                  ? 'bg-serene-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Status Toggles */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium mr-1">Status</span>
          {statusOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setStatusFilter(opt)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                statusFilter === opt
                  ? 'bg-serene-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Results count */}
      <p className="text-xs text-gray-400">{filtered.length} task{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Task Cards */}
      <div className="space-y-4">
        {filtered.map((task, i) => {
          const completedSteps = task.steps.filter((s) => s.completed).length
          const totalSteps = task.steps.length
          const progressPct = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0

          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.05 + i * 0.03 }}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
            >
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                <span className={cn('px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider', priorityColors[task.priority])}>
                  {task.priority}
                </span>
                <span className={cn('px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider', statusColors[task.status])}>
                  {statusLabels[task.status]}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-display font-bold text-gray-900 text-sm mb-1">{task.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">{task.description}</p>

              {/* Meta Row */}
              <div className="flex items-center gap-4 mb-3 text-[11px] text-gray-500">
                <span>Assignee: <span className="text-gray-700 font-medium">{task.assignee}</span></span>
                <span>Due: <span className="text-gray-700 font-medium">{task.dueDate}</span></span>
                {task.expectedSavings > 0 && (
                  <span>Expected savings: <span className="text-emerald-700 font-semibold">{formatCurrency(task.expectedSavings)}</span></span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-gray-400">Progress</span>
                  <span className="text-[10px] text-gray-500 font-medium">{completedSteps}/{totalSteps} steps</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={cn(
                      'h-full rounded-full',
                      progressPct === 100 ? 'bg-emerald-500' : 'bg-serene-500'
                    )}
                  />
                </div>
              </div>

              {/* Step List */}
              <div className="space-y-1.5">
                {task.steps.map((step, si) => (
                  <div key={si} className="flex items-start gap-2">
                    {step.completed ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-gray-300 mt-0.5 shrink-0" />
                    )}
                    <span className={cn(
                      'text-[11px] leading-relaxed',
                      step.completed ? 'text-gray-400 line-through' : 'text-gray-600'
                    )}>
                      {step.description}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
