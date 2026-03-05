export interface SustainabilityData {
  // Fleet-level metrics
  totalVehicles: number
  evCount: number
  hybridCount: number
  iceCount: number
  evPercentage: number
  targetEvPercentage: number
  targetYear: string

  // Emissions
  totalCo2MonthlyTons: number
  co2ReductionYoY: number
  avgCo2PerKm: number // grams
  carbonIntensityScore: number

  // Financial
  monthlyFuelCostIce: number
  monthlyEnergyCostEv: number
  monthlySavingsFromEv: number
  annualCarbonCredits: number
  projectedAnnualSavings: number

  // Goals
  goals: SustainabilityGoal[]

  // Per-customer breakdown
  customerSustainability: CustomerSustainability[]
}

export interface SustainabilityGoal {
  id: string
  title: string
  target: number
  current: number
  unit: string
  deadline: string
  status: 'on-track' | 'at-risk' | 'behind'
}

export interface CustomerSustainability {
  customerId: string
  customerName: string
  regionId: string
  totalVehicles: number
  evCount: number
  evPercentage: number
  monthlyEmissions: number // tons CO2
  emissionsPerVehicle: number // kg CO2
  carbonFees: number // monthly EUR
  efficiencyScore: number
  trend: 'improving' | 'stable' | 'declining'
}

export const sustainabilityData: SustainabilityData = {
  totalVehicles: 3847,
  evCount: 512,
  hybridCount: 298,
  iceCount: 3037,
  evPercentage: 13.3,
  targetEvPercentage: 35,
  targetYear: "Q4 2027",

  totalCo2MonthlyTons: 4280,
  co2ReductionYoY: -8.2,
  avgCo2PerKm: 142,
  carbonIntensityScore: 72,

  monthlyFuelCostIce: 2840000,
  monthlyEnergyCostEv: 385000,
  monthlySavingsFromEv: 892000,
  annualCarbonCredits: 156000,
  projectedAnnualSavings: 12400000,

  goals: [
    { id: "ev-transition", title: "EV Fleet Transition", target: 35, current: 13.3, unit: "%", deadline: "Q4 2027", status: "on-track" },
    { id: "co2-reduction", title: "CO2 Reduction", target: 50, current: 28.4, unit: "%", deadline: "2030", status: "on-track" },
    { id: "zero-emission-zones", title: "Zero-Emission Zone Ready", target: 100, current: 67, unit: "%", deadline: "Q2 2026", status: "at-risk" },
    { id: "renewable-charging", title: "Renewable Energy Charging", target: 100, current: 82, unit: "%", deadline: "2028", status: "on-track" },
    { id: "carbon-neutral", title: "Carbon Neutral Operations", target: 100, current: 18, unit: "%", deadline: "2035", status: "on-track" },
  ],

  customerSustainability: [
    { customerId: "espana-trucking", customerName: "Espana Trucking", regionId: "spain", totalVehicles: 450, evCount: 45, evPercentage: 10.0, monthlyEmissions: 498, emissionsPerVehicle: 1107, carbonFees: 24900, efficiencyScore: 62, trend: "improving" },
    { customerId: "madrid-logistics", customerName: "Madrid Logistics", regionId: "spain", totalVehicles: 380, evCount: 57, evPercentage: 15.0, monthlyEmissions: 380, emissionsPerVehicle: 1000, carbonFees: 19000, efficiencyScore: 71, trend: "improving" },
    { customerId: "barcelona-fleet", customerName: "Barcelona Fleet Co", regionId: "spain", totalVehicles: 290, evCount: 52, evPercentage: 17.9, monthlyEmissions: 261, emissionsPerVehicle: 900, carbonFees: 13050, efficiencyScore: 78, trend: "stable" },
    { customerId: "valencia-transport", customerName: "Valencia Transport", regionId: "spain", totalVehicles: 300, evCount: 33, evPercentage: 11.0, monthlyEmissions: 342, emissionsPerVehicle: 1140, carbonFees: 17100, efficiencyScore: 58, trend: "declining" },
    { customerId: "deutsche-logistics", customerName: "Deutsche Logistics GmbH", regionId: "germany", totalVehicles: 420, evCount: 84, evPercentage: 20.0, monthlyEmissions: 378, emissionsPerVehicle: 900, carbonFees: 37800, efficiencyScore: 82, trend: "improving" },
    { customerId: "munich-fleet", customerName: "Munich Fleet Services", regionId: "germany", totalVehicles: 320, evCount: 54, evPercentage: 16.9, monthlyEmissions: 300, emissionsPerVehicle: 938, carbonFees: 30000, efficiencyScore: 76, trend: "improving" },
    { customerId: "berlin-transport", customerName: "Berlin Transport AG", regionId: "germany", totalVehicles: 240, evCount: 48, evPercentage: 20.0, monthlyEmissions: 192, emissionsPerVehicle: 800, carbonFees: 19200, efficiencyScore: 85, trend: "improving" },
    { customerId: "paris-fleet", customerName: "Paris Fleet Solutions", regionId: "france", totalVehicles: 310, evCount: 40, evPercentage: 12.9, monthlyEmissions: 350, emissionsPerVehicle: 1129, carbonFees: 35000, efficiencyScore: 64, trend: "stable" },
    { customerId: "lyon-logistics", customerName: "Lyon Logistics", regionId: "france", totalVehicles: 250, evCount: 30, evPercentage: 12.0, monthlyEmissions: 275, emissionsPerVehicle: 1100, carbonFees: 27500, efficiencyScore: 61, trend: "declining" },
    { customerId: "marseille-transport", customerName: "Marseille Transport", regionId: "france", totalVehicles: 200, evCount: 20, evPercentage: 10.0, monthlyEmissions: 230, emissionsPerVehicle: 1150, carbonFees: 23000, efficiencyScore: 55, trend: "declining" },
    { customerId: "london-fleet", customerName: "London Fleet Management", regionId: "uk", totalVehicles: 387, evCount: 62, evPercentage: 16.0, monthlyEmissions: 368, emissionsPerVehicle: 951, carbonFees: 44160, efficiencyScore: 79, trend: "improving" },
    { customerId: "manchester-logistics", customerName: "Manchester Logistics Ltd", regionId: "uk", totalVehicles: 300, evCount: 39, evPercentage: 13.0, monthlyEmissions: 306, emissionsPerVehicle: 1020, carbonFees: 30600, efficiencyScore: 69, trend: "stable" },
  ],
}
