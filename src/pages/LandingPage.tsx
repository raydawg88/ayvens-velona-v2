import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Building2 } from 'lucide-react'
import { useState } from 'react'

export function LandingPage() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center px-4">
      {/* Ayvens Logo */}
      <motion.img
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        src="https://www.ayvens.com/-/media/ayvens/public/cp/logos/website/ayvens-logo-white-with-tagline.png?rev=4c83b763fcd0483c82df7c15885fedf9"
        alt="Ayvens"
        className="h-36 mx-auto mb-8"
      />

      {/* VELONA AI Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex items-center gap-3 mb-12"
      >
        <div className="w-10 h-10 rounded-lg bg-serene-100 flex items-center justify-center">
          <Zap className="w-5 h-5 text-serene-600" />
        </div>
        <span className="px-4 py-1.5 rounded-full bg-amber-400 text-gray-900 text-sm font-bold tracking-wider">
          VELONA AI
        </span>
      </motion.div>

      {/* Role Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex gap-4 mb-8"
      >
        <button
          onClick={() => setSelectedRole('employee')}
          className={`px-6 py-4 rounded-xl border-2 transition-all ${
            selectedRole === 'employee'
              ? 'border-serene-400 bg-serene-500/10 text-white'
              : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white/80'
          }`}
        >
          <Building2 className="w-6 h-6 mx-auto mb-2" />
          <span className="text-sm font-medium">Ayvens Employee</span>
        </button>
        <button
          onClick={() => setSelectedRole('fleet')}
          className={`px-6 py-4 rounded-xl border-2 transition-all ${
            selectedRole === 'fleet'
              ? 'border-serene-400 bg-serene-500/10 text-white'
              : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white/80'
          }`}
        >
          <Zap className="w-6 h-6 mx-auto mb-2" />
          <span className="text-sm font-medium">Ayvens Fleet Portal</span>
        </button>
      </motion.div>

      {/* Enter Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={() => navigate('/portfolio')}
        className="px-8 py-3 rounded-full bg-serene-500 hover:bg-serene-600 text-white font-semibold transition-colors shadow-lg shadow-serene-500/25"
      >
        Enter Dashboard
      </motion.button>

      {/* Region selector hint */}
      <p className="text-white/30 text-sm mt-6">All regions</p>
    </div>
  )
}
