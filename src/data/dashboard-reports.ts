export interface ScheduledReport {
  id: number
  name: string
  frequency: string
  schedule: string
  nextRun: string
  lastRun: string
  recipients: string[]
  active: boolean
}

export const scheduledReports: ScheduledReport[] = [
  { id: 1, name: 'Weekly Fleet Summary', frequency: 'Weekly', schedule: 'Every Monday', nextRun: 'Dec 16', lastRun: 'Dec 9', recipients: ['roberto.sanchez@translogistica.es', 'carmen.vega@translogistica.es'], active: true },
  { id: 2, name: 'Monthly Cost Analysis', frequency: 'Monthly', schedule: 'Day 1', nextRun: 'Jan 1, 2025', lastRun: 'Dec 1', recipients: ['carmen.vega@translogistica.es'], active: true },
  { id: 3, name: 'Quarterly Safety Report', frequency: 'Quarterly', schedule: 'Quarter start', nextRun: 'Mar 1, 2025', lastRun: 'Dec 1', recipients: ['roberto.sanchez@translogistica.es', 'isabel.ramos@translogistica.es'], active: true },
  { id: 4, name: 'Preventive Maintenance - Monthly Planning', frequency: 'Monthly', schedule: 'Day 25', nextRun: 'Dec 25', lastRun: 'Nov 25', recipients: ['roberto.sanchez@translogistica.es'], active: true },
]

export interface ReportTemplate {
  id: string
  name: string
  icon: string
  color: string
  description: string
  sections: string[]
}

export const reportTemplates: ReportTemplate[] = [
  { id: 'fleet-summary', name: 'Fleet Summary', icon: 'truck', color: '#0ea5e9', description: 'Complete overview of fleet status, main KPIs and alerts', sections: ['KPIs', 'Vehicle Status', 'Drivers', 'Alerts'] },
  { id: 'cost-analysis', name: 'Cost Analysis', icon: 'dollar', color: '#10b981', description: 'Detailed breakdown of expenses by category, vehicle and trends', sections: ['Total Costs', 'By Category', 'By Vehicle', 'Trends'] },
  { id: 'safety-report', name: 'Safety Report', icon: 'shield', color: '#ef4444', description: 'Incident analysis, driver scores and safety metrics', sections: ['Incidents', 'Safety Score', 'Drivers', 'Trends'] },
  { id: 'maintenance-report', name: 'Maintenance Report', icon: 'wrench', color: '#8b5cf6', description: 'Maintenance history, preventive compliance and costs', sections: ['Completed', 'Scheduled', 'Costs', 'Suppliers'] },
  { id: 'efficiency', name: 'Efficiency Analysis', icon: 'zap', color: '#f59e0b', description: 'Fuel consumption, vehicle utilization and route optimization', sections: ['Consumption', 'Utilization', 'Routes', 'Sustainability'] },
  { id: 'custom', name: 'Custom Report', icon: 'palette', color: '#0369a1', description: 'Create a custom report by selecting metrics and filters', sections: ['Customizable'] },
]

export interface RecentReport {
  id: number
  name: string
  type: string
  date: string
  generatedBy: string
  size: string
  format: 'PDF' | 'Excel'
}

export const recentReports: RecentReport[] = [
  { id: 1, name: 'Weekly Fleet Summary - W49 2024', type: 'Fleet Summary', date: 'Dec 9, 2024', generatedBy: 'System (Automated)', size: '2.4 MB', format: 'PDF' },
  { id: 2, name: 'Cost Analysis - November 2024', type: 'Cost Analysis', date: 'Dec 1, 2024', generatedBy: 'Carmen Vega', size: '1.8 MB', format: 'Excel' },
  { id: 3, name: 'Safety Report - Q4 2024', type: 'Safety Report', date: 'Dec 1, 2024', generatedBy: 'System (Automated)', size: '3.1 MB', format: 'PDF' },
  { id: 4, name: 'Preventive Maintenance - Dec 2024', type: 'Maintenance Report', date: 'Nov 25, 2024', generatedBy: 'Roberto Sanchez', size: '1.2 MB', format: 'PDF' },
  { id: 5, name: 'Weekly Fleet Summary - W48 2024', type: 'Fleet Summary', date: 'Dec 2, 2024', generatedBy: 'System (Automated)', size: '2.3 MB', format: 'PDF' },
]
