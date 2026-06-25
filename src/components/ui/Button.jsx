import { cn } from '@/utils/cn'

const variants = {
  primary:
    'bg-forest-700 text-white hover:bg-forest-800 focus-visible:ring-forest-600',
  secondary:
    'bg-earth-100 text-earth-900 hover:bg-earth-200 focus-visible:ring-earth-400',
  outline:
    'border border-earth-300 bg-white text-earth-900 hover:bg-earth-50 focus-visible:ring-earth-400',
  ghost:
    'text-earth-700 hover:bg-earth-100 focus-visible:ring-earth-400',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
