import { cn } from '@/utils/cn'

export default function Spinner({ size = 'md', className }) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-[3px]',
  }

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'animate-spin rounded-full border-earth-200 border-t-forest-600',
        sizes[size],
        className,
      )}
    />
  )
}
