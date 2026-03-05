import { create } from 'zustand'
import { regions, type Region } from '@/data/regions'
import { customers, type Customer } from '@/data/customers'

interface AppState {
  selectedRegion: string | null
  selectedCustomer: string | null
  language: 'en' | 'es'

  setSelectedRegion: (id: string | null) => void
  setSelectedCustomer: (id: string | null) => void
  setLanguage: (lang: 'en' | 'es') => void

  getRegion: (id: string) => Region | undefined
  getCustomer: (id: string) => Customer | undefined
  getCustomersForRegion: (regionId: string) => Customer[]
  getPortfolioStats: (regionId?: string | null) => {
    totalCustomers: number
    totalVehicles: number
    totalDrivers: number
    totalMonthlySpend: number
    totalAlerts: number
    criticalAlerts: number
  }
}

export const useStore = create<AppState>((set) => ({
  selectedRegion: null,
  selectedCustomer: null,
  language: 'en',

  setSelectedRegion: (id) => set({ selectedRegion: id, selectedCustomer: null }),
  setSelectedCustomer: (id) => set({ selectedCustomer: id }),
  setLanguage: (lang) => set({ language: lang }),

  getRegion: (id) => regions.find(r => r.id === id),
  getCustomer: (id) => customers.find(c => c.id === id),
  getCustomersForRegion: (regionId) => customers.filter(c => c.regionId === regionId),
  getPortfolioStats: (regionId) => {
    const filtered = regionId ? customers.filter(c => c.regionId === regionId) : customers
    return {
      totalCustomers: filtered.length,
      totalVehicles: filtered.reduce((sum, c) => sum + c.vehicleCount, 0),
      totalDrivers: filtered.reduce((sum, c) => sum + c.driverCount, 0),
      totalMonthlySpend: filtered.reduce((sum, c) => sum + c.monthlySpend, 0),
      totalAlerts: filtered.reduce((sum, c) => sum + c.alertCount, 0),
      criticalAlerts: filtered.reduce((sum, c) => sum + c.criticalAlerts, 0),
    }
  },
}))
