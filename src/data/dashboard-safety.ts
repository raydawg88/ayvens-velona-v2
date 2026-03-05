export interface SafetyKpi {
  label: string
  value: string
  delta: number
  isPositive: boolean
}

export const safetyKpis: SafetyKpi[] = [
  { label: 'Safety Score', value: '94/100', delta: 2.8, isPositive: true },
  { label: 'Incidents (this month)', value: '12', delta: -18.5, isPositive: true },
  { label: 'Incident Cost', value: '€24,500', delta: -22.3, isPositive: true },
  { label: 'Risk Drivers', value: '3', delta: -25, isPositive: true },
  { label: 'Annual Improvement', value: '2.8%', delta: 0, isPositive: true },
]

export interface SafetyScoreMonth {
  month: string
  score: number
}

export const safetyScoreTrend: SafetyScoreMonth[] = [
  { month: 'Jan', score: 88 },
  { month: 'Feb', score: 89 },
  { month: 'Mar', score: 90 },
  { month: 'Apr', score: 91 },
  { month: 'May', score: 90 },
  { month: 'Jun', score: 92 },
  { month: 'Jul', score: 91 },
  { month: 'Aug', score: 93 },
  { month: 'Sep', score: 92 },
  { month: 'Oct', score: 93 },
  { month: 'Nov', score: 94 },
  { month: 'Dec', score: 94 },
]

export interface IncidentType {
  type: string
  count: number
  color: string
}

export const incidentsByType: IncidentType[] = [
  { type: 'Hard Braking', count: 28, color: '#f59e0b' },
  { type: 'Speeding', count: 18, color: '#ef4444' },
  { type: 'Minor Collision', count: 12, color: '#dc2626' },
  { type: 'Tire Wear', count: 15, color: '#3b82f6' },
  { type: 'Fatigue/Night', count: 8, color: '#6366f1' },
  { type: 'Others', count: 19, color: '#9ca3af' },
]

export interface RiskDriver {
  name: string
  id: string
  score: number
  experience: number
  location: string
  incidents: number
  alerts: string[]
}

export const riskDrivers: RiskDriver[] = [
  { name: 'Carlos Martinez', id: '00245', score: 68, experience: 12, location: 'Madrid', incidents: 4, alerts: ['Risky driving pattern', 'Training required'] },
  { name: 'Alberto Fernandez', id: '00189', score: 87, experience: 13, location: 'Valencia', incidents: 2, alerts: [] },
  { name: 'Carmen Vega', id: '00145', score: 88, experience: 5, location: 'Madrid', incidents: 1, alerts: [] },
  { name: 'Javier Moreno', id: '00234', score: 89, experience: 14, location: 'Barcelona', incidents: 1, alerts: [] },
  { name: 'Isabel Ramos', id: '00267', score: 90, experience: 11, location: 'Zaragoza', incidents: 1, alerts: [] },
]

export interface SafetyIncident {
  id: number
  date: string
  driver: string
  driverId: string
  vehicle: string
  type: string
  severity: 'High' | 'Medium' | 'Low'
  location: string
  cost: number
  status: 'Under Review' | 'Closed' | 'Informative'
}

export const recentIncidents: SafetyIncident[] = [
  { id: 1, date: 'Dec 6', driver: 'Carlos Martinez', driverId: '00245', vehicle: '1234 ABC', type: 'Hard Braking', severity: 'Medium', location: 'Madrid - A6 km 23', cost: 0, status: 'Under Review' },
  { id: 2, date: 'Dec 4', driver: 'Alberto Fernandez', driverId: '00189', vehicle: '0123 KLM', type: 'Minor Collision', severity: 'High', location: 'Valencia - City Center', cost: 1850, status: 'Closed' },
  { id: 3, date: 'Dec 3', driver: 'Carmen Vega', driverId: '00145', vehicle: '4567 CDE', type: 'Speeding', severity: 'Medium', location: 'Madrid - M30', cost: 200, status: 'Closed' },
  { id: 4, date: 'Dec 2', driver: 'Javier Moreno', driverId: '00234', vehicle: '6789 STU', type: 'Tire Wear', severity: 'Low', location: 'Barcelona - Base', cost: 480, status: 'Closed' },
  { id: 5, date: 'Nov 30', driver: 'Isabel Ramos', driverId: '00267', vehicle: '2345 EFG', type: 'Night Driving', severity: 'Low', location: 'Zaragoza - A2', cost: 0, status: 'Informative' },
  { id: 6, date: 'Nov 28', driver: 'Alberto Fernandez', driverId: '00189', vehicle: '0123 KLM', type: 'Hard Braking', severity: 'Medium', location: 'Valencia - V31', cost: 0, status: 'Under Review' },
]
