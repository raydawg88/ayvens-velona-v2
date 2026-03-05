import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { DashboardLayout } from './layouts/DashboardLayout'
import { LandingPage } from './pages/LandingPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { SustainabilityPage } from './pages/SustainabilityPage'
import { EVBatteryPage } from './pages/EVBatteryPage'
import { SmartChargingAgentsPage } from './pages/SmartChargingAgentsPage'
import { TheftIntelligencePage } from './pages/TheftIntelligencePage'
import { OverviewPage } from './pages/dashboard/OverviewPage'
import { InsightsPage } from './pages/dashboard/InsightsPage'
import { ActionCenterPage } from './pages/dashboard/ActionCenterPage'
import { CostsPage } from './pages/dashboard/CostsPage'
import { FleetPage } from './pages/dashboard/FleetPage'
import { MaintenancePage } from './pages/dashboard/MaintenancePage'
import { SafetyPage } from './pages/dashboard/SafetyPage'
import { ReportsPage } from './pages/dashboard/ReportsPage'
import { SettingsPage } from './pages/dashboard/SettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Standalone demo pages */}
        <Route path="/smart-charging-agents" element={<SmartChargingAgentsPage />} />
        <Route path="/theft-intelligence" element={<TheftIntelligencePage />} />
        {/* Dashboard with shared sidebar + AI panel */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="actions" element={<ActionCenterPage />} />
          <Route path="costs" element={<CostsPage />} />
          <Route path="fleet" element={<FleetPage />} />
          <Route path="maintenance" element={<MaintenancePage />} />
          <Route path="safety" element={<SafetyPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="sustainability" element={<SustainabilityPage />} />
          <Route path="ev-battery" element={<EVBatteryPage />} />
          <Route path="smart-charging" element={<SmartChargingAgentsPage />} />
          <Route path="theft-intelligence" element={<TheftIntelligencePage />} />
        </Route>
        {/* Portfolio layout */}
        <Route element={<AppLayout />}>
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
