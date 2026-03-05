export interface Customer {
  id: string
  regionId: string
  name: string
  vehicleCount: number
  driverCount: number
  monthlySpend: number
  alertCount: number
  criticalAlerts: number
  highAlerts: number
  safetyScore: number
  complianceRate: number
  aiSavings: number
}

export const customers: Customer[] = [
  { id: "espana-trucking", regionId: "spain", name: "Espana Trucking", vehicleCount: 450, driverCount: 380, monthlySpend: 892000, alertCount: 8, criticalAlerts: 3, highAlerts: 5, safetyScore: 72, complianceRate: 89, aiSavings: 187500 },
  { id: "madrid-logistics", regionId: "spain", name: "Madrid Logistics", vehicleCount: 380, driverCount: 320, monthlySpend: 756000, alertCount: 6, criticalAlerts: 2, highAlerts: 4, safetyScore: 78, complianceRate: 94, aiSavings: 142300 },
  { id: "barcelona-fleet", regionId: "spain", name: "Barcelona Fleet Co", vehicleCount: 290, driverCount: 245, monthlySpend: 534000, alertCount: 4, criticalAlerts: 0, highAlerts: 4, safetyScore: 85, complianceRate: 96, aiSavings: 198700 },
  { id: "valencia-transport", regionId: "spain", name: "Valencia Transport", vehicleCount: 300, driverCount: 260, monthlySpend: 578000, alertCount: 5, criticalAlerts: 1, highAlerts: 4, safetyScore: 81, complianceRate: 91, aiSavings: 96400 },
  { id: "deutsche-logistics", regionId: "germany", name: "Deutsche Logistics GmbH", vehicleCount: 420, driverCount: 360, monthlySpend: 945000, alertCount: 3, criticalAlerts: 1, highAlerts: 2, safetyScore: 88, complianceRate: 98, aiSavings: 234800 },
  { id: "munich-fleet", regionId: "germany", name: "Munich Fleet Services", vehicleCount: 320, driverCount: 275, monthlySpend: 678000, alertCount: 4, criticalAlerts: 1, highAlerts: 3, safetyScore: 84, complianceRate: 95, aiSavings: 156200 },
  { id: "berlin-transport", regionId: "germany", name: "Berlin Transport AG", vehicleCount: 240, driverCount: 200, monthlySpend: 512000, alertCount: 2, criticalAlerts: 0, highAlerts: 2, safetyScore: 91, complianceRate: 97, aiSavings: 89500 },
  { id: "paris-fleet", regionId: "france", name: "Paris Fleet Solutions", vehicleCount: 310, driverCount: 265, monthlySpend: 623000, alertCount: 5, criticalAlerts: 2, highAlerts: 3, safetyScore: 79, complianceRate: 92, aiSavings: 167400 },
  { id: "lyon-logistics", regionId: "france", name: "Lyon Logistics", vehicleCount: 250, driverCount: 210, monthlySpend: 487000, alertCount: 3, criticalAlerts: 0, highAlerts: 3, safetyScore: 86, complianceRate: 94, aiSavings: 78300 },
  { id: "marseille-transport", regionId: "france", name: "Marseille Transport", vehicleCount: 200, driverCount: 170, monthlySpend: 398000, alertCount: 4, criticalAlerts: 1, highAlerts: 3, safetyScore: 82, complianceRate: 90, aiSavings: 112600 },
  { id: "london-fleet", regionId: "uk", name: "London Fleet Management", vehicleCount: 387, driverCount: 330, monthlySpend: 812000, alertCount: 4, criticalAlerts: 1, highAlerts: 3, safetyScore: 87, complianceRate: 96, aiSavings: 245700 },
  { id: "manchester-logistics", regionId: "uk", name: "Manchester Logistics Ltd", vehicleCount: 300, driverCount: 255, monthlySpend: 598000, alertCount: 3, criticalAlerts: 0, highAlerts: 3, safetyScore: 89, complianceRate: 97, aiSavings: 134500 },
]
