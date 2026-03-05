import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { LandingPage } from './pages/LandingPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { SustainabilityPage } from './pages/SustainabilityPage'
import { EVBatteryPage } from './pages/EVBatteryPage'
import { SmartChargingAgentsPage } from './pages/SmartChargingAgentsPage'
import { TheftIntelligencePage } from './pages/TheftIntelligencePage'
import { DashboardPage } from './pages/DashboardPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/smart-charging-agents" element={<SmartChargingAgentsPage />} />
        <Route path="/theft-intelligence" element={<TheftIntelligencePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route element={<AppLayout />}>
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/ev-battery" element={<EVBatteryPage />} />
          {/* Placeholder routes */}
          <Route path="/fleet" element={<PlaceholderPage title="Fleet" />} />
          <Route path="/insights" element={<PlaceholderPage title="Insights" />} />
          <Route path="/costs" element={<PlaceholderPage title="Costs" />} />
          <Route path="/safety" element={<PlaceholderPage title="Safety" />} />
          <Route path="/maintenance" element={<PlaceholderPage title="Maintenance" />} />
          <Route path="/reports" element={<PlaceholderPage title="Reports" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-3xl font-display font-bold text-serene-800 mb-2">{title}</h1>
        <p className="text-gray-500">Coming soon</p>
      </div>
    </div>
  )
}
