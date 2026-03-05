export interface Region {
  id: string
  name: string
  flag: string
  customerCount: number
  totalVehicles: number
}

export const regions: Region[] = [
  { id: "spain", name: "Spain", flag: "🇪🇸", customerCount: 4, totalVehicles: 1420 },
  { id: "germany", name: "Germany", flag: "🇩🇪", customerCount: 3, totalVehicles: 980 },
  { id: "france", name: "France", flag: "🇫🇷", customerCount: 3, totalVehicles: 760 },
  { id: "uk", name: "United Kingdom", flag: "🇬🇧", customerCount: 2, totalVehicles: 687 },
]
