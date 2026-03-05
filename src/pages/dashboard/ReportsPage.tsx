import { motion } from 'framer-motion'
import {
  Plus, Calendar, Clock, Users, Download,
  Truck, DollarSign, Shield, Wrench, Zap, Palette,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  scheduledReports,
  reportTemplates,
  recentReports,
} from '@/data/dashboard-reports'
import type { ReportTemplate } from '@/data/dashboard-reports'

const templateIcons: Record<string, React.ElementType> = {
  truck: Truck,
  dollar: DollarSign,
  shield: Shield,
  wrench: Wrench,
  zap: Zap,
  palette: Palette,
}

function getTemplateIcon(template: ReportTemplate) {
  return templateIcons[template.icon] ?? Truck
}

const frequencyColors: Record<string, string> = {
  Weekly: 'bg-sky-100 text-sky-700',
  Monthly: 'bg-violet-100 text-violet-700',
  Quarterly: 'bg-amber-100 text-amber-700',
}

export function ReportsPage() {
  return (
    <div className="max-w-[960px] mx-auto px-6 py-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500">Report generation and scheduling</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-serene-600 text-white text-sm font-semibold hover:bg-serene-700 transition-colors">
          <Plus className="w-4 h-4" />
          New Report
        </button>
      </motion.div>

      {/* Scheduled Reports */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <h2 className="text-lg font-display font-bold text-gray-900 mb-3">Scheduled Reports</h2>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-100">
          {scheduledReports.map((report) => (
            <div key={report.id} className="px-5 py-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-1">
                  <span className="font-bold text-sm text-gray-900">{report.name}</span>
                  <span className={cn(
                    'px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide',
                    frequencyColors[report.frequency] ?? 'bg-gray-100 text-gray-600',
                  )}>
                    {report.frequency}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {report.schedule}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Next: {report.nextRun}
                  </span>
                  <span>Last: {report.lastRun}</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {report.recipients.length} recipients
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-emerald-700">Active</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Report Templates */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-lg font-display font-bold text-gray-900 mb-3">Report Templates</h2>
        <div className="grid grid-cols-3 gap-4">
          {reportTemplates.map((template) => {
            const Icon = getTemplateIcon(template)
            return (
              <div
                key={template.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 group"
                style={{ borderLeftColor: template.color, borderLeftWidth: 3 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${template.color}18` }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color: template.color }} />
                  </div>
                  <span className="font-bold text-sm text-gray-900">{template.name}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{template.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {template.sections.map((section) => (
                    <span
                      key={section}
                      className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-medium text-gray-600"
                    >
                      {section}
                    </span>
                  ))}
                </div>
                <button className="mt-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  Generate Report
                </button>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Recent Reports */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <h2 className="text-lg font-display font-bold text-gray-900 mb-3">Recent Reports</h2>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-500">
                <th className="text-left font-medium px-5 py-3">Name</th>
                <th className="text-left font-medium px-3 py-3">Type</th>
                <th className="text-left font-medium px-3 py-3">Date</th>
                <th className="text-left font-medium px-3 py-3">Generated By</th>
                <th className="text-left font-medium px-3 py-3">Size</th>
                <th className="text-left font-medium px-3 py-3">Format</th>
                <th className="text-right font-medium px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-900">{report.name}</td>
                  <td className="px-3 py-3 text-gray-500">{report.type}</td>
                  <td className="px-3 py-3 text-gray-500">{report.date}</td>
                  <td className="px-3 py-3 text-gray-500">{report.generatedBy}</td>
                  <td className="px-3 py-3 text-gray-500">{report.size}</td>
                  <td className="px-3 py-3">
                    <span className={cn(
                      'px-2 py-0.5 rounded text-[10px] font-semibold',
                      report.format === 'PDF'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-emerald-100 text-emerald-700',
                    )}>
                      {report.format}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="inline-flex items-center gap-1 text-xs font-semibold text-serene-600 hover:text-serene-700 transition-colors">
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
            Showing 5 recent reports. Reports are retained for 90 days.
          </div>
        </div>
      </motion.div>
    </div>
  )
}
