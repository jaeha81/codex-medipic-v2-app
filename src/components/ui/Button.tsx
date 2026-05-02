import { forwardRef, type ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'line' | 'outline' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary text-white font-semibold hover:bg-primary-hover active:scale-[0.98] shadow-sm',
  line:    'bg-line-green text-white font-semibold hover:bg-line-green-hover active:scale-[0.98] shadow-sm',
  outline: 'border-2 border-primary text-primary font-semibold hover:bg-bg-warm active:scale-[0.98]',
  ghost:   'text-gray-600 font-medium hover:bg-gray-100 active:scale-[0.98]',
  danger:  'bg-red-500 text-white font-semibold hover:bg-red-600 active:scale-[0.98]',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth, className = '', children, ...props }, ref) => (
    <button
      ref={ref}
      className={[
        'inline-flex items-center justify-center gap-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </button>
  )
)
Button.displayName = 'Button'
