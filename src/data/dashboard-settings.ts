export interface AiPriority {
  id: number
  name: string
  description: string
}

export const aiPriorities: AiPriority[] = [
  { id: 1, name: 'Safety & Driver Risk', description: 'Incidents, driver behavior, accident prevention' },
  { id: 2, name: 'Utilization', description: 'Vehicle usage optimization, rightsizing' },
  { id: 3, name: 'Fuel Cost & Fraud', description: 'Fuel spend, efficiency, fraud detection' },
  { id: 4, name: 'Maintenance', description: 'Repair costs, preventive maintenance' },
  { id: 5, name: 'TCO', description: 'Total cost of ownership' },
  { id: 6, name: 'Compliance', description: 'Regulatory adherence' },
  { id: 7, name: 'Decarbonization', description: 'Emissions reduction' },
]

export interface Assumption {
  label: string
  value: string
  default: string
  unit: string
  source: string
}

export interface AssumptionGroup {
  name: string
  items: Assumption[]
}

export const assumptions: AssumptionGroup[] = [
  {
    name: 'Fuel',
    items: [
      { label: 'Avg. Gasoline Price', value: '1.65', default: '1.65', unit: '€/liter', source: 'EU Energy Agency Q4 2024' },
      { label: 'Avg. Diesel Price', value: '1.55', default: '1.55', unit: '€/liter', source: 'EU Energy Agency Q4 2024' },
      { label: 'Avg. Consumption Gasoline', value: '8.2', default: '8.2', unit: 'L/100km', source: 'Fleet historical' },
      { label: 'Avg. Consumption Diesel', value: '7.1', default: '7.1', unit: 'L/100km', source: 'Fleet historical' },
      { label: 'Avg. Electricity Price', value: '0.22', default: '0.22', unit: '€/kWh', source: 'EU Energy Agency Q4 2024' },
    ],
  },
  {
    name: 'Vehicle Costs',
    items: [
      { label: 'Avg. Monthly Lease', value: '485', default: '485', unit: '€/vehicle', source: 'Current contracts' },
      { label: 'Avg. Annual Insurance', value: '1,200', default: '1,200', unit: '€/vehicle', source: 'Current contracts' },
      { label: 'Annual Depreciation Rate', value: '15', default: '15', unit: '%', source: 'Industry standard' },
      { label: 'Target Residual Value', value: '35', default: '35', unit: '%', source: 'Industry standard' },
    ],
  },
  {
    name: 'Maintenance',
    items: [
      { label: 'Avg. Maintenance Cost', value: '0.045', default: '0.045', unit: '€/km', source: 'Fleet historical' },
      { label: 'Cost of Downtime', value: '320', default: '320', unit: '€/day', source: 'Operational data' },
      { label: 'Target Preventive Ratio', value: '80', default: '80', unit: '%', source: 'Best practice' },
      { label: 'Expected Tire Life', value: '45,000', default: '45,000', unit: 'km', source: 'Manufacturer specs' },
    ],
  },
  {
    name: 'Safety',
    items: [
      { label: 'Avg. Cost per Incident', value: '18,500', default: '18,500', unit: '€', source: 'Claims data' },
      { label: 'Driver Training Cost', value: '350', default: '350', unit: '€/driver', source: 'CNAE Foundation' },
      { label: 'Target Safety Score', value: '90', default: '90', unit: '/100', source: 'Company target' },
      { label: 'Harsh Braking Threshold', value: '8.5', default: '8.5', unit: 'm/s²', source: 'Industry standard' },
    ],
  },
  {
    name: 'Utilization',
    items: [
      { label: 'Target Utilization', value: '75', default: '75', unit: '%', source: 'Company target' },
      { label: 'Min. Daily Distance', value: '80', default: '80', unit: 'km', source: 'Operational analysis' },
      { label: 'Idle Time Threshold', value: '15', default: '15', unit: 'min', source: 'Best practice' },
      { label: 'Optimal Vehicle Age', value: '4', default: '4', unit: 'years', source: 'TCO analysis' },
    ],
  },
  {
    name: 'Industry Benchmarks',
    items: [
      { label: 'Industry Avg. Maintenance', value: '0.052', default: '0.052', unit: '€/km', source: 'AEAF 2024' },
      { label: 'Industry Avg. Fuel Cost', value: '0.12', default: '0.12', unit: '€/km', source: 'AEAF 2024' },
      { label: 'Industry Avg. Incident Rate', value: '0.50', default: '0.50', unit: '/100k km', source: 'Insurance industry' },
      { label: 'CO2 per Liter Diesel', value: '2.64', default: '2.64', unit: 'kg', source: 'EU standards' },
    ],
  },
]

export interface Integration {
  name: string
  description: string
  status: 'Connected' | 'Not connected'
  lastSync: string
}

export const integrations: Integration[] = [
  { name: 'Ayvens Fleet Portal', description: 'Automatic fleet data synchronization', status: 'Connected', lastSync: '2 hours ago' },
  { name: 'Velona AI Engine', description: 'Analysis and insights engine', status: 'Connected', lastSync: 'Real-time' },
  { name: 'ERP (SAP)', description: 'Integration with management system', status: 'Not connected', lastSync: '' },
  { name: 'Digital Tachograph', description: 'Driving and rest data', status: 'Connected', lastSync: '6 hours ago' },
]
