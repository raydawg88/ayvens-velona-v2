export interface EVBatteryData {
  totalEvs: number
  avgBatteryHealth: number
  avgRatedRange: number
  avgCurrentRange: number
  vehiclesFlagged: number
  replacementCostAvoided: number
  totalChargeCycles: number

  healthDistribution: HealthBucket[]
  degradationTrend: DegradationMonth[]
  vehicles: BatteryVehicle[]

  insights: BatteryInsight[]
}

export interface HealthBucket {
  range: string
  count: number
  color: string
}

export interface DegradationMonth {
  month: string
  avgHealth: number
  worstHealth: number
}

export interface BatteryVehicle {
  id: string
  vin: string
  model: string
  customerId: string
  customerName: string
  batteryHealth: number
  ratedRange: number
  currentRange: number
  chargeCycles: number
  ageMonths: number
  status: 'healthy' | 'watch' | 'critical'
  lastChecked: string
}

export interface BatteryInsight {
  type: 'risk' | 'opportunity'
  headline: string
  body: string
  vehicles: string[]
}

export const evBatteryData: EVBatteryData = {
  totalEvs: 512,
  avgBatteryHealth: 91.4,
  avgRatedRange: 380,
  avgCurrentRange: 341,
  vehiclesFlagged: 14,
  replacementCostAvoided: 2340000,
  totalChargeCycles: 189400,

  healthDistribution: [
    { range: '95–100%', count: 187, color: '#10b981' },
    { range: '90–95%', count: 214, color: '#34d399' },
    { range: '85–90%', count: 78, color: '#f59e0b' },
    { range: '80–85%', count: 19, color: '#f97316' },
    { range: '<80%', count: 14, color: '#ef4444' },
  ],

  degradationTrend: [
    { month: 'Apr', avgHealth: 93.8, worstHealth: 82.1 },
    { month: 'May', avgHealth: 93.6, worstHealth: 81.8 },
    { month: 'Jun', avgHealth: 93.3, worstHealth: 81.4 },
    { month: 'Jul', avgHealth: 93.0, worstHealth: 80.9 },
    { month: 'Aug', avgHealth: 92.7, worstHealth: 80.3 },
    { month: 'Sep', avgHealth: 92.4, worstHealth: 79.8 },
    { month: 'Oct', avgHealth: 92.1, worstHealth: 79.2 },
    { month: 'Nov', avgHealth: 91.9, worstHealth: 78.6 },
    { month: 'Dec', avgHealth: 91.7, worstHealth: 78.1 },
    { month: 'Jan', avgHealth: 91.6, worstHealth: 77.4 },
    { month: 'Feb', avgHealth: 91.5, worstHealth: 76.8 },
    { month: 'Mar', avgHealth: 91.4, worstHealth: 76.3 },
  ],

  vehicles: [
    { id: 'ev-001', vin: 'WBA83CF0...A12', model: 'BMW iX3', customerId: 'deutsche-logistics', customerName: 'Deutsche Logistics GmbH', batteryHealth: 97.2, ratedRange: 460, currentRange: 447, chargeCycles: 312, ageMonths: 14, status: 'healthy', lastChecked: '2026-03-02' },
    { id: 'ev-002', vin: 'WVWZZZ1J...B48', model: 'VW ID.4', customerId: 'berlin-transport', customerName: 'Berlin Transport AG', batteryHealth: 96.8, ratedRange: 520, currentRange: 503, chargeCycles: 287, ageMonths: 12, status: 'healthy', lastChecked: '2026-03-01' },
    { id: 'ev-003', vin: 'LRWYGCEK...C91', model: 'Volvo EX30', customerId: 'london-fleet', customerName: 'London Fleet Management', batteryHealth: 95.1, ratedRange: 344, currentRange: 327, chargeCycles: 402, ageMonths: 18, status: 'healthy', lastChecked: '2026-03-03' },
    { id: 'ev-004', vin: 'WF0XXXGC...D55', model: 'Ford E-Transit', customerId: 'manchester-logistics', customerName: 'Manchester Logistics Ltd', batteryHealth: 94.3, ratedRange: 317, currentRange: 299, chargeCycles: 524, ageMonths: 22, status: 'healthy', lastChecked: '2026-02-28' },
    { id: 'ev-005', vin: 'VNKKTUD3...E09', model: 'Toyota bZ4X', customerId: 'munich-fleet', customerName: 'Munich Fleet Services', batteryHealth: 93.7, ratedRange: 411, currentRange: 385, chargeCycles: 348, ageMonths: 16, status: 'healthy', lastChecked: '2026-03-02' },
    { id: 'ev-006', vin: 'SJNFAAE1...F33', model: 'Nissan Ariya', customerId: 'paris-fleet', customerName: 'Paris Fleet Solutions', batteryHealth: 92.4, ratedRange: 403, currentRange: 372, chargeCycles: 489, ageMonths: 24, status: 'healthy', lastChecked: '2026-03-01' },
    { id: 'ev-007', vin: 'W1V2536D...G67', model: 'Mercedes eVito', customerId: 'barcelona-fleet', customerName: 'Barcelona Fleet Co', batteryHealth: 91.1, ratedRange: 314, currentRange: 286, chargeCycles: 612, ageMonths: 28, status: 'healthy', lastChecked: '2026-02-27' },
    { id: 'ev-008', vin: 'VR3UHZKX...H21', model: 'Peugeot e-Expert', customerId: 'lyon-logistics', customerName: 'Lyon Logistics', batteryHealth: 89.6, ratedRange: 330, currentRange: 296, chargeCycles: 701, ageMonths: 30, status: 'watch', lastChecked: '2026-03-03' },
    { id: 'ev-009', vin: 'TMBJB9NE...I44', model: 'Skoda Enyaq', customerId: 'madrid-logistics', customerName: 'Madrid Logistics', batteryHealth: 88.3, ratedRange: 510, currentRange: 450, chargeCycles: 556, ageMonths: 26, status: 'watch', lastChecked: '2026-03-01' },
    { id: 'ev-010', vin: 'ZFA33200...J78', model: 'Fiat e-Ducato', customerId: 'espana-trucking', customerName: 'Espana Trucking', batteryHealth: 86.7, ratedRange: 370, currentRange: 321, chargeCycles: 823, ageMonths: 34, status: 'watch', lastChecked: '2026-02-26' },
    { id: 'ev-011', vin: 'WAUZZZ8V...K01', model: 'Audi Q4 e-tron', customerId: 'deutsche-logistics', customerName: 'Deutsche Logistics GmbH', batteryHealth: 85.2, ratedRange: 520, currentRange: 443, chargeCycles: 745, ageMonths: 32, status: 'watch', lastChecked: '2026-03-02' },
    { id: 'ev-012', vin: 'VR1ABCHY...L35', model: 'Citroën ë-Berlingo', customerId: 'marseille-transport', customerName: 'Marseille Transport', batteryHealth: 79.4, ratedRange: 280, currentRange: 222, chargeCycles: 912, ageMonths: 38, status: 'critical', lastChecked: '2026-03-03' },
    { id: 'ev-013', vin: 'KNAPH81B...M69', model: 'Kia EV6', customerId: 'valencia-transport', customerName: 'Valencia Transport', batteryHealth: 78.1, ratedRange: 528, currentRange: 412, chargeCycles: 867, ageMonths: 36, status: 'critical', lastChecked: '2026-03-01' },
    { id: 'ev-014', vin: 'WF0XXXGC...N02', model: 'Ford E-Transit', customerId: 'espana-trucking', customerName: 'Espana Trucking', batteryHealth: 76.3, ratedRange: 317, currentRange: 242, chargeCycles: 1034, ageMonths: 42, status: 'critical', lastChecked: '2026-02-28' },
    { id: 'ev-015', vin: 'W1V2536D...P36', model: 'Mercedes eVito', customerId: 'paris-fleet', customerName: 'Paris Fleet Solutions', batteryHealth: 74.8, ratedRange: 314, currentRange: 235, chargeCycles: 1108, ageMonths: 44, status: 'critical', lastChecked: '2026-03-02' },
  ],

  insights: [
    {
      type: 'risk',
      headline: '4 batteries below 80% — replacement needed within 6 months',
      body: 'These vehicles are losing range fast. Delaying replacement risks breakdowns and increased downtime costs.',
      vehicles: ['Citroën ë-Berlingo', 'Kia EV6', 'Ford E-Transit', 'Mercedes eVito'],
    },
    {
      type: 'opportunity',
      headline: 'Optimized charging schedules could extend battery life by 2+ years',
      body: 'Velona detected 38% of EVs regularly fast-charge above 80% SOC. Switching to smart scheduling saves battery degradation and €2.3M in replacement costs.',
      vehicles: ['Espana Trucking fleet', 'Valencia Transport fleet', 'Lyon Logistics fleet'],
    },
  ],
}
