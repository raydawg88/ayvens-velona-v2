import { Outlet } from 'react-router-dom'
import { Navigation } from '@/components/Navigation'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="py-6">
        <div className="max-w-[1400px] mx-auto px-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
