export interface MaintenanceKpi {
  label: string
  value: string
  delta: number
  isPositive: boolean
}

export const maintenanceKpis: MaintenanceKpi[] = [
  { label: 'Total Maintenance Spend', value: '€850,000', delta: -3.1, isPositive: true },
  { label: 'Preventive Compliance', value: '97%', delta: 1.2, isPositive: true },
  { label: 'Vehicles in Workshop', value: '29', delta: -8.5, isPositive: true },
  { label: 'Avg Cost per Vehicle', value: '€1,000', delta: -5.2, isPositive: true },
  { label: 'Upcoming MOT (30 days)', value: '12', delta: 0, isPositive: true },
]

export interface MonthlyMaintenance {
  month: string
  amount: number
}

export const monthlyMaintenanceTrend: MonthlyMaintenance[] = [
  { month: 'Jan', amount: 72000 },
  { month: 'Feb', amount: 68000 },
  { month: 'Mar', amount: 75000 },
  { month: 'Apr', amount: 71000 },
  { month: 'May', amount: 73000 },
  { month: 'Jun', amount: 78000 },
  { month: 'Jul', amount: 74000 },
  { month: 'Aug', amount: 65000 },
  { month: 'Sep', amount: 72000 },
  { month: 'Oct', amount: 70000 },
  { month: 'Nov', amount: 69000 },
  { month: 'Dec', amount: 71000 },
]

export interface Supplier {
  name: string
  spend: number
  color: string
}

export const topSuppliers: Supplier[] = [
  { name: 'Martinez Workshops', spend: 185000, color: '#0ea5e9' },
  { name: 'Mercedes Service', spend: 142000, color: '#0369a1' },
  { name: 'Renault Service', spend: 128000, color: '#10b981' },
  { name: 'Iveco Spain', spend: 115000, color: '#8b5cf6' },
  { name: 'MAN Service Center', spend: 98000, color: '#f59e0b' },
  { name: 'VW Service', spend: 82000, color: '#6366f1' },
  { name: 'Peugeot Service', spend: 72000, color: '#ec4899' },
  { name: 'Others', spend: 28000, color: '#94a3b8' },
]

export interface ScheduledMaintenance {
  id: number
  plate: string
  vehicle: string
  type: string
  date: string
  supplier: string
  estimatedCost: number
  status: 'Scheduled' | 'Pending Confirmation' | 'Overdue'
  priority: 'High' | 'Medium' | 'Low'
}

export const scheduledMaintenance: ScheduledMaintenance[] = [
  { id: 1, plate: '1234 ABC', vehicle: 'Mercedes Sprinter', type: 'Preventive Maintenance', date: 'Dec 15', supplier: 'Martinez Workshops, Madrid', estimatedCost: 450, status: 'Scheduled', priority: 'High' },
  { id: 2, plate: '5678 DEF', vehicle: 'Iveco Daily', type: 'Vehicle Inspection (ITV)', date: 'Dec 18', supplier: 'ITV Coslada, Madrid', estimatedCost: 65, status: 'Scheduled', priority: 'Medium' },
  { id: 3, plate: '9012 GHI', vehicle: 'Renault Master', type: '300,000 km Service', date: 'Dec 20', supplier: 'Renault Service, Valencia', estimatedCost: 890, status: 'Scheduled', priority: 'High' },
  { id: 4, plate: '3456 JKL', vehicle: 'Mercedes Actros', type: 'Preventive Maintenance', date: 'Dec 22', supplier: 'Mercedes Service, Sevilla', estimatedCost: 1250, status: 'Scheduled', priority: 'Medium' },
  { id: 5, plate: '7890 MNO', vehicle: 'MAN TGX', type: 'Oil Change', date: 'Dec 28', supplier: 'MAN Service Center, Madrid', estimatedCost: 320, status: 'Scheduled', priority: 'Low' },
  { id: 6, plate: '2345 PQR', vehicle: 'VW Caddy', type: 'Preventive Maintenance', date: 'Jan 10', supplier: 'VW Service, Madrid', estimatedCost: 280, status: 'Pending Confirmation', priority: 'Low' },
  { id: 7, plate: '6789 STU', vehicle: 'Ford Transit', type: 'Vehicle Inspection (ITV)', date: 'Jan 12', supplier: 'ITV Sabadell, Barcelona', estimatedCost: 65, status: 'Pending Confirmation', priority: 'Medium' },
  { id: 8, plate: '0123 VWX', vehicle: 'Peugeot Boxer', type: 'Brake Inspection', date: 'Jan 15', supplier: 'Peugeot Valencia', estimatedCost: 420, status: 'Scheduled', priority: 'High' },
]
