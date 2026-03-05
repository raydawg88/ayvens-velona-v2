export interface TheftCityData {
  city: string
  country: string
  incidents: number
  risk: 'high' | 'elevated' | 'low'
  note: string
  // SVG coordinates on a 600x500 viewBox of Western Europe
  x: number
  y: number
}

export interface TheftInsight {
  type: 'risk' | 'pattern'
  headline: string
  body: string
  metric: string
}

export interface FlaggedIncident {
  vin: string
  model: string
  type: string
  location: string
  riskScore: number
  finding: string
  status: 'investigating' | 'monitoring' | 'alert-sent' | 'review' | 'preventive' | 'advisory'
}

export interface EmbezzlementFlag {
  type: string
  count: number
  description: string
}

export interface DayIncidents {
  day: string
  incidents: number
}

export interface RiskFactor {
  label: string
  pct: number
}

export interface TheftAgent {
  name: string
  role: string
  icon: 'ShieldAlert' | 'FileSearch' | 'MapPin' | 'BrainCircuit'
  color: string
}

export const theftStats = {
  atRiskValue: 2100000,
  vehiclesFlagged: 23,
  hotspotsDetected: 7,
  recoveryRate: 41,
}

export const theftCities: TheftCityData[] = [
  { city: 'Rotterdam', country: 'NL', incidents: 14, risk: 'high', note: 'Port area, organized rings', x: 270, y: 175 },
  { city: 'Amsterdam', country: 'NL', incidents: 9, risk: 'high', note: 'Keyless relay attacks', x: 275, y: 160 },
  { city: 'Barcelona', country: 'ES', incidents: 11, risk: 'high', note: 'Commercial vehicle targeting', x: 215, y: 355 },
  { city: 'Manchester', country: 'UK', incidents: 8, risk: 'elevated', note: 'E-Transit thefts', x: 195, y: 145 },
  { city: 'Paris', country: 'FR', incidents: 5, risk: 'elevated', note: 'After-hours movement', x: 245, y: 235 },
  { city: 'Berlin', country: 'DE', incidents: 4, risk: 'low', note: 'Improving trend', x: 355, y: 155 },
  { city: 'Madrid', country: 'ES', incidents: 3, risk: 'low', note: 'Low density fleet', x: 170, y: 345 },
  { city: 'London', country: 'UK', incidents: 6, risk: 'elevated', note: 'Street parking risk', x: 210, y: 175 },
  { city: 'Lyon', country: 'FR', incidents: 2, risk: 'low', note: 'Minimal activity', x: 265, y: 290 },
  { city: 'Munich', country: 'DE', incidents: 1, risk: 'low', note: 'Secure depot coverage', x: 340, y: 225 },
]

export const theftInsights: TheftInsight[] = [
  {
    type: 'risk',
    headline: '12 vehicles parked overnight in Rotterdam port zone',
    body: 'Theft rate is 3.4x higher than fleet average in this area. Recommend depot relocation or immobilizer activation protocol for overnight stays.',
    metric: '3.4x risk vs fleet avg',
  },
  {
    type: 'pattern',
    headline: 'After-hours geofence alerts prevented 3 incidents this month',
    body: 'Friday-Sunday nights account for 78% of theft attempts. Proactive geofencing saved an estimated €180K in vehicle losses and downtime.',
    metric: '€180K saved',
  },
]

export const flaggedIncidents: FlaggedIncident[] = [
  { vin: 'VIN-4491', model: 'VW ID.4', type: 'Geofence breach', location: 'Amsterdam-Zuid', riskScore: 92, finding: 'Moved outside depot at 02:14, no scheduled trip', status: 'investigating' },
  { vin: 'VIN-8814', model: 'Kia EV6', type: 'Route deviation', location: 'Rotterdam', riskScore: 78, finding: '12km off-route, stopped 23 min near port area', status: 'monitoring' },
  { vin: 'VIN-3387', model: 'Volvo EX30', type: 'After-hours use', location: 'Barcelona', riskScore: 85, finding: 'Ignition at 01:30, unauthorized driver pattern', status: 'alert-sent' },
  { vin: 'VIN-2209', model: 'Mercedes eVito', type: 'Mileage discrepancy', location: 'Paris', riskScore: 71, finding: '340km unaccounted over 2 weeks, possible personal use', status: 'review' },
  { vin: 'VIN-5561', model: 'Ford E-Transit', type: 'High-theft zone', location: 'Manchester', riskScore: 88, finding: 'Parked overnight in area with 5 thefts this month', status: 'preventive' },
  { vin: 'VIN-1102', model: 'BMW iX3', type: 'Relay attack risk', location: 'Berlin', riskScore: 67, finding: 'Keyless model, parked street-level in flagged zone', status: 'advisory' },
]

export const embezzlementFlags: EmbezzlementFlag[] = [
  { type: 'Mileage Discrepancies', count: 8, description: 'Vehicles with 200+ km unaccounted mileage over 30 days' },
  { type: 'Fuel Card Anomalies', count: 3, description: 'Charges at locations inconsistent with assigned routes' },
  { type: 'Personal Use Patterns', count: 12, description: 'Weekend or after-hours usage exceeding company policy thresholds' },
]

export const dayOfWeekData: DayIncidents[] = [
  { day: 'Mon', incidents: 3 },
  { day: 'Tue', incidents: 2 },
  { day: 'Wed', incidents: 4 },
  { day: 'Thu', incidents: 3 },
  { day: 'Fri', incidents: 11 },
  { day: 'Sat', incidents: 18 },
  { day: 'Sun', incidents: 15 },
]

export const riskFactors: RiskFactor[] = [
  { label: 'Keyless entry system', pct: 67 },
  { label: 'Overnight street parking', pct: 54 },
  { label: 'Near motorway on-ramp', pct: 48 },
  { label: 'Commercial vehicle', pct: 41 },
  { label: 'No immobilizer', pct: 38 },
]

export const theftAgents: TheftAgent[] = [
  { name: 'Theft Intelligence', role: 'Trained on historical theft data & modus operandi', icon: 'ShieldAlert', color: 'red' },
  { name: 'Crime Reports', role: 'Monitors public crime feeds & insurance claims', icon: 'FileSearch', color: 'amber' },
  { name: 'Fleet Tracking', role: 'GPS geofencing & unauthorized movement detection', icon: 'MapPin', color: 'serene' },
  { name: 'Pattern Detection', role: 'Cross-references all sources to predict risk', icon: 'BrainCircuit', color: 'violet' },
]
