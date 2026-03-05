import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ClipboardList, LayoutGrid, ChevronRight } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1923] via-[#132a35] to-[#1a2a20] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle amber glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

      {/* Ayvens Logo */}
      <motion.img
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        src="https://www.ayvens.com/-/media/ayvens/public/cp/logos/website/ayvens-logo-white-with-tagline.png?rev=4c83b763fcd0483c82df7c15885fedf9"
        alt="Ayvens"
        className="h-36 mx-auto mb-10"
      />

      {/* Velona AI Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex items-center gap-3 mb-4"
      >
        <Sparkles className="w-5 h-5 text-amber-400" />
        <span className="px-4 py-1.5 rounded-full bg-amber-400 text-gray-900 text-sm font-bold tracking-wider">
          VELONA AI
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-4xl md:text-5xl font-display font-bold text-white text-center mb-3"
      >
        Fleet Intelligence Platform
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-white/50 text-center max-w-lg mb-10 leading-relaxed"
      >
        AI-powered insights to optimize your fleet operations, reduce costs,
        and improve safety
      </motion.p>

      {/* Role Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex flex-col md:flex-row gap-5 mb-12 w-full max-w-2xl"
      >
        {/* Fleet Manager Card */}
        <div className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors">
          <div className="w-12 h-12 rounded-xl bg-serene-600/20 flex items-center justify-center mb-5">
            <ClipboardList className="w-6 h-6 text-serene-400" />
          </div>
          <h3 className="text-white font-display font-bold text-xl mb-2">Fleet Manager</h3>
          <p className="text-white/40 text-sm leading-relaxed mb-4">
            Manage your company's fleet with AI-powered insights, maintenance tracking, and cost optimization.
          </p>
          <ul className="space-y-2 mb-5">
            {['Single fleet dashboard', 'Vehicle & driver management', 'AI-powered cost insights'].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/50">
                <div className="w-1.5 h-1.5 rounded-full bg-serene-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 text-serene-400 text-sm font-semibold hover:text-serene-300 transition-colors"
          >
            Enter as Fleet Manager <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Ayvens Employee Card */}
        <div className="flex-1 bg-white/[0.04] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-5">
            <LayoutGrid className="w-6 h-6 text-amber-400" />
          </div>
          <h3 className="text-white font-display font-bold text-xl mb-2">Ayvens Employee</h3>
          <p className="text-white/40 text-sm leading-relaxed mb-4">
            Manage your portfolio of customers across regions with cross-account AI analysis and insights.
          </p>
          <ul className="space-y-2 mb-5">
            {['Multi-customer portfolio view', 'Cross-account AI discoveries', 'Region & customer switching'].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/50">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1 text-amber-400 text-sm font-semibold hover:text-amber-300 transition-colors"
          >
            Enter as Ayvens Employee <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="flex items-center gap-10 md:gap-16 mb-16"
      >
        {[
          { value: '3,847', label: 'Vehicles Managed', amber: false },
          { value: '12', label: 'Customers', amber: false },
          { value: '4', label: 'Regions', amber: false },
          { value: '€2.4M', label: 'Savings Identified', amber: true },
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <div className={`text-2xl md:text-3xl font-display font-bold ${stat.amber ? 'text-amber-400' : 'text-white'}`}>
              {stat.value}
            </div>
            <div className="text-white/30 text-xs mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-white/20 text-xs absolute bottom-6"
      >
        Powered by Velona AI · Fleet intelligence that drives results
      </motion.p>
    </div>
  )
}
