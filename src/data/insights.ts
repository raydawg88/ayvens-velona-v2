export interface PortfolioInsight {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  customerId: string
  customerName: string
  title: string
  summary: string
  potentialSavings?: number
  category: string
}

export const portfolioInsights: PortfolioInsight[] = [
  { id: "pi-1", severity: "critical", customerId: "espana-trucking", customerName: "Espana Trucking", title: "12 vehicles overdue for maintenance", summary: "Critical maintenance backlog detected. Risk of breakdown and safety incidents.", potentialSavings: 45000, category: "maintenance" },
  { id: "pi-2", severity: "critical", customerId: "madrid-logistics", customerName: "Madrid Logistics", title: "Driver safety score dropped 15%", summary: "8 drivers showing increased risky behavior patterns. Immediate intervention recommended.", category: "safety" },
  { id: "pi-3", severity: "high", customerId: "barcelona-fleet", customerName: "Barcelona Fleet Co", title: "Fuel fraud pattern detected", summary: "Anomalous fuel transactions at 3 locations. Estimated loss €12,400/month.", potentialSavings: 148800, category: "cost" },
  { id: "pi-4", severity: "high", customerId: "valencia-transport", customerName: "Valencia Transport", title: "8 underutilized vehicles identified", summary: "Vehicles averaging <40% utilization. Consider rightsizing or reallocation.", potentialSavings: 96000, category: "utilization" },
  { id: "pi-5", severity: "high", customerId: "paris-fleet", customerName: "Paris Fleet Solutions", title: "Compliance certificates expiring", summary: "14 vehicles have certificates expiring within 30 days. Schedule renewals.", category: "compliance" },
  { id: "pi-6", severity: "medium", customerId: "deutsche-logistics", customerName: "Deutsche Logistics GmbH", title: "Tire replacement optimization", summary: "Switching to longer-life tires could reduce annual tire costs by 18%.", potentialSavings: 67000, category: "cost" },
  { id: "pi-7", severity: "medium", customerId: "london-fleet", customerName: "London Fleet Management", title: "Route optimization potential", summary: "AI analysis shows 12% fuel savings possible with optimized routing.", potentialSavings: 97000, category: "cost" },
  { id: "pi-8", severity: "low", customerId: "munich-fleet", customerName: "Munich Fleet Services", title: "EV transition opportunity", summary: "45 vehicles in urban routes suitable for EV replacement.", potentialSavings: 156000, category: "sustainability" },
]
