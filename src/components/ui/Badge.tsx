interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'teal'
  size?: 'sm' | 'md'
}

const variants = {
  primary: 'bg-bg-warm text-primary',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-warning text-amber-800',
  info:    'bg-accent-blue text-blue-700',
  teal:    'bg-accent-teal text-teal-700',
}

export function Badge({ children, variant = 'primary', size = 'sm' }: BadgeProps) {
  return (
    <span className={[
      'inline-flex items-center font-semibold rounded-full',
      size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
      variants[variant],
    ].join(' ')}>
      {children}
    </span>
  )
}
