import { cn } from '@/lib/utils'
import { type LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  value: string | number
  label: string
  sublabel?: string
  color: 'teal' | 'blue' | 'amber' | 'red' | 'green'
  href?: string
  onClick?: () => void
}

const colorMap = {
  teal: { border: 'border-l-teal-400', bg: 'bg-teal-50', text: 'text-teal-600' },
  blue: { border: 'border-l-serene-400', bg: 'bg-serene-50', text: 'text-serene-600' },
  amber: { border: 'border-l-amber-400', bg: 'bg-amber-50', text: 'text-amber-600' },
  red: { border: 'border-l-red-400', bg: 'bg-red-50', text: 'text-red-600' },
  green: { border: 'border-l-emerald-400', bg: 'bg-emerald-50', text: 'text-emerald-600' },
}

export function StatCard({ icon: Icon, value, label, sublabel, color, href, onClick }: StatCardProps) {
  const colors = colorMap[color]
  const Component = href ? 'a' : onClick ? 'button' : 'div'

  return (
    <Component
      {...(href ? { href } : {})}
      {...(onClick ? { onClick } : {})}
      className={cn(
        "bg-white rounded-xl border border-gray-100 border-l-4 p-5 shadow-sm",
        colors.border,
        (href || onClick) && "cursor-pointer hover:shadow-md transition-shadow"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", colors.bg)}>
          <Icon className={cn("w-5 h-5", colors.text)} />
        </div>
        <div>
          <p className="text-2xl font-display font-bold text-serene-800">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
          {sublabel && <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>}
        </div>
      </div>
    </Component>
  )
}
