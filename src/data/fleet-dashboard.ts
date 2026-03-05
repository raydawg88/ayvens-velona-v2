export interface FleetStat {
  label: string
  value: string
  change: number
  isPositive: boolean
}

export interface ExpenseItem {
  category: string
  amount: number
  color: string
}

export interface CostTrendMonth {
  month: string
  maintenance: number
  fuel: number
  leasing: number
}

export interface VehicleStatusItem {
  status: string
  count: number
  pct: number
  color: string
}

export interface FleetTypeItem {
  type: string
  count: number
  pct: number
  color: string
}

export interface DashboardInsight {
  severity: 'critical' | 'high' | 'medium'
  isNew: boolean
  title: string
  description: string
  confidence: string
  category: string
}

export const fleetStats: FleetStat[] = [
  { label: 'Total Spend', value: '€4.250.000', change: 3.2, isPositive: false },
  { label: 'Fleet Size', value: '850', change: 2.4, isPositive: true },
  { label: 'Avg Cost per Vehicle', value: '€5.000', change: 5.1, isPositive: false },
  { label: 'Safety Score', value: '94/100', change: 2.8, isPositive: true },
  { label: 'Maintenance Compliance', value: '97.0%', change: 1.2, isPositive: true },
  { label: 'Fuel Efficiency', value: '8', change: 4.5, isPositive: false },
]

export const expenseBreakdown: ExpenseItem[] = [
  { category: 'Leasing', amount: 1487500, color: '#0369a1' },
  { category: 'Fuel', amount: 1275000, color: '#10b981' },
  { category: 'Maintenance', amount: 850000, color: '#0ea5e9' },
  { category: 'Insurance', amount: 425000, color: '#f59e0b' },
  { category: 'Other', amount: 212500, color: '#94a3b8' },
]

export const costTrends: CostTrendMonth[] = [
  { month: 'Jan', maintenance: 820000, fuel: 1100000, leasing: 1400000 },
  { month: 'Feb', maintenance: 840000, fuel: 1080000, leasing: 1410000 },
  { month: 'Mar', maintenance: 810000, fuel: 1120000, leasing: 1420000 },
  { month: 'Apr', maintenance: 860000, fuel: 1150000, leasing: 1430000 },
  { month: 'May', maintenance: 880000, fuel: 1200000, leasing: 1440000 },
  { month: 'Jun', maintenance: 850000, fuel: 1250000, leasing: 1450000 },
  { month: 'Jul', maintenance: 870000, fuel: 1300000, leasing: 1460000 },
  { month: 'Aug', maintenance: 830000, fuel: 1280000, leasing: 1470000 },
  { month: 'Sep', maintenance: 850000, fuel: 1260000, leasing: 1475000 },
  { month: 'Oct', maintenance: 840000, fuel: 1240000, leasing: 1480000 },
  { month: 'Nov', maintenance: 860000, fuel: 1270000, leasing: 1485000 },
  { month: 'Dec', maintenance: 850000, fuel: 1275000, leasing: 1487500 },
]

export const vehicleStatus: VehicleStatusItem[] = [
  { status: 'Active', count: 782, pct: 92, color: '#10b981' },
  { status: 'Maintenance', count: 45, pct: 5, color: '#f59e0b' },
  { status: 'Inactive', count: 23, pct: 3, color: '#94a3b8' },
]

export const fleetByType: FleetTypeItem[] = [
  { type: 'Vans', count: 510, pct: 60, color: '#0ea5e9' },
  { type: 'Trucks', count: 213, pct: 25, color: '#10b981' },
  { type: 'Cars', count: 127, pct: 15, color: '#0369a1' },
]

export const recentInsights: DashboardInsight[] = [
  {
    severity: 'critical',
    isNew: true,
    title: 'Vehicle 0014075 requires immediate replacement',
    description: 'This 2018 Mercedes Sprinter has 29.2x the average maintenance frequency for its segment. In the last 6 months it has been out of service for 47 days with 12 different breakdowns.',
    confidence: 'Very high',
    category: 'Maintenance',
  },
  {
    severity: 'critical',
    isNew: true,
    title: 'Risky driving pattern detected - Carlos Martinez',
    description: 'Driver Carlos Martinez (ID: 00245) shows harsh braking 340% above average on Madrid-Barcelona route. 28% increase in fuel consumption.',
    confidence: 'High',
    category: 'Safety',
  },
  {
    severity: 'critical',
    isNew: false,
    title: 'Unplanned maintenance cost overruns on Iveco Daily',
    description: 'The fleet of 85 Iveco Daily (2019-2021 models) presents 67% unplanned maintenance vs 23% industry average. Additional cost: €127,000 in 2024.',
    confidence: 'Very high',
    category: 'Maintenance',
  },
]

export const velonaBanner = {
  discoveries: 8,
  potentialSavings: 303100,
}

export const quickQuestions = [
  'Show me vehicles with high maintenance costs',
  'Which drivers have the best safety scores?',
  'What are the top cost-saving opportunities?',
]
