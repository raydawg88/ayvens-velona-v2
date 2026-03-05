export interface AgentFeedItem {
  id: string
  text: string
}

export interface AgentConfig {
  id: string
  name: string
  role: string
  icon: 'Zap' | 'BatteryCharging' | 'Car' | 'CalendarCheck'
  color: 'amber' | 'serene' | 'emerald' | 'violet'
  feedItems: AgentFeedItem[]
}

export interface ScheduledVehicle {
  vin: string
  model: string
  station: string
  startTime: string
  duration: string
  costEur: number
  targetSoc: number
  status: 'scheduled' | 'alert-sent' | 'charging'
}

export const agents: AgentConfig[] = [
  {
    id: 'energy-cost',
    name: 'Energy Cost Agent',
    role: 'Monitors tariff signals & grid demand',
    icon: 'Zap',
    color: 'amber',
    feedItems: [
      { id: 'ec-1', text: 'Peak tariff: €0.31/kWh — 18:00–21:00' },
      { id: 'ec-2', text: 'Off-peak window opens in 47 min' },
      { id: 'ec-3', text: 'Grid signal: Demand Response event tomorrow 17:00' },
      { id: 'ec-4', text: 'Current spot price: €0.18/kWh' },
      { id: 'ec-5', text: 'Night rate: €0.09/kWh from 23:00' },
      { id: 'ec-6', text: 'V2X export price: €0.28/kWh during peak' },
      { id: 'ec-7', text: 'Weekend flat rate: €0.12/kWh' },
      { id: 'ec-8', text: 'Carbon intensity: 142g CO₂/kWh (low)' },
    ],
  },
  {
    id: 'charging-station',
    name: 'Charging Station Agent',
    role: 'Tracks station availability & capacity',
    icon: 'BatteryCharging',
    color: 'serene',
    feedItems: [
      { id: 'cs-1', text: 'AMS-04: 2/4 chargers available, 22kW AC' },
      { id: 'cs-2', text: 'BER-07: Fast DC 150kW — queue: 0' },
      { id: 'cs-3', text: 'PAR-02: Full — ETA available: 34 min' },
      { id: 'cs-4', text: 'AMS-04 Charger #3: 68% utilization today' },
      { id: 'cs-5', text: 'New station online: RTD-11 (Amsterdam South)' },
      { id: 'cs-6', text: 'MAD-01: Maintenance scheduled 06:00–08:00' },
      { id: 'cs-7', text: 'BER-07: V2G capable — bi-directional ready' },
      { id: 'cs-8', text: 'LON-03: 3/6 available, 50kW DC' },
    ],
  },
  {
    id: 'fleet-vehicle',
    name: 'Fleet Vehicle Agent',
    role: 'Analyzes vehicle needs & schedules',
    icon: 'Car',
    color: 'emerald',
    feedItems: [
      { id: 'fv-1', text: 'VIN-7823: 23% SoC — needs charge before 08:00' },
      { id: 'fv-2', text: 'VIN-4491: Route BER→HAM tomorrow, needs 80%' },
      { id: 'fv-3', text: 'VIN-1102: 91% SoC — skip tonight' },
      { id: 'fv-4', text: 'VIN-3387: Priority — airport run 06:30' },
      { id: 'fv-5', text: '4 vehicles depart before 07:00 tomorrow' },
      { id: 'fv-6', text: 'VIN-8814: Battery health 94% — no concern' },
      { id: 'fv-7', text: 'VIN-2209: 45% SoC — short commute only' },
      { id: 'fv-8', text: 'VIN-5561: Returned to depot, 12% SoC' },
    ],
  },
  {
    id: 'schedule-alert',
    name: 'Schedule & Alert Agent',
    role: 'Orchestrates charging & notifies drivers',
    icon: 'CalendarCheck',
    color: 'violet',
    feedItems: [
      { id: 'sa-1', text: 'Scheduling VIN-7823 @ AMS-04 at 23:00' },
      { id: 'sa-2', text: 'Alert sent: VIN-3387 driver — charge by 22:00' },
      { id: 'sa-3', text: 'Cost savings vs peak: €14.20 tonight' },
      { id: 'sa-4', text: 'Optimization complete — 6 vehicles scheduled' },
      { id: 'sa-5', text: 'V2X discharge window: 18:00–20:00, earn €8.40' },
      { id: 'sa-6', text: 'Rescheduled VIN-5561 — urgent charge needed' },
      { id: 'sa-7', text: 'Fleet ready confidence: 97% by 07:00' },
      { id: 'sa-8', text: 'Push notification sent to 4 drivers' },
    ],
  },
]

export const scheduledVehicles: ScheduledVehicle[] = [
  { vin: 'VIN-7823', model: 'BMW iX3', station: 'AMS-04', startTime: '23:00', duration: '3h 20min', costEur: 2.97, targetSoc: 90, status: 'scheduled' },
  { vin: 'VIN-4491', model: 'VW ID.4', station: 'BER-07', startTime: '22:30', duration: '4h 10min', costEur: 3.74, targetSoc: 80, status: 'scheduled' },
  { vin: 'VIN-3387', model: 'Volvo EX30', station: 'AMS-04', startTime: '21:00', duration: '2h 45min', costEur: 2.48, targetSoc: 95, status: 'alert-sent' },
  { vin: 'VIN-5561', model: 'Ford E-Transit', station: 'PAR-02', startTime: '20:30', duration: '5h 00min', costEur: 4.50, targetSoc: 85, status: 'charging' },
  { vin: 'VIN-8814', model: 'Kia EV6', station: 'MAD-01', startTime: '00:30', duration: '2h 00min', costEur: 1.80, targetSoc: 80, status: 'scheduled' },
  { vin: 'VIN-2209', model: 'Mercedes eVito', station: 'LON-03', startTime: '23:30', duration: '3h 40min', costEur: 3.31, targetSoc: 85, status: 'scheduled' },
]
