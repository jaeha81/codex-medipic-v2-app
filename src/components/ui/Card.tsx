import { forwardRef, type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  selected?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'none'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hoverable, selected, padding = 'md', className = '', children, ...props }, ref) => {
    const pads = { sm: 'p-4', md: 'p-5', lg: 'p-6', none: '' }
    return (
      <div
        ref={ref}
        className={[
          'bg-white rounded-2xl border transition-all duration-150',
          selected ? 'border-primary shadow-md' : 'border-gray-100 shadow-sm',
          hoverable ? 'cursor-pointer hover:border-primary hover:shadow-md hover:-translate-y-0.5' : '',
          pads[padding],
          className,
        ].filter(Boolean).join(' ')}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'
