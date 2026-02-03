import { type ContactStatus } from '@/lib/types'

interface StatusBadgeProps {
  status: ContactStatus
  variant: 'dot' | 'badge'
}

const statusConfig = {
  'waiting-for-them': {
    color: '#22c55e',
    label: 'Waiting for them',
    bgClass: 'bg-green-500',
    textClass: 'text-green-500',
  },
  'waiting-for-you': {
    color: '#f59e0b',
    label: 'Waiting for you',
    bgClass: 'bg-amber-500',
    textClass: 'text-amber-500',
  },
  'needs-attention': {
    color: '#ef4444',
    label: 'Needs attention',
    bgClass: 'bg-red-500',
    textClass: 'text-red-500',
  },
} as const

export const StatusBadge = ({ status, variant }: StatusBadgeProps) => {
  const config = statusConfig[status]

  if (variant === 'dot') {
    return (
      <div
        className={`h-2 w-2 rounded-full ${config.bgClass}`}
        title={config.label}
      />
    )
  }

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium ${config.textClass}`}>
      <div className={`h-1.5 w-1.5 rounded-full ${config.bgClass}`} />
      {config.label}
    </div>
  )
}
