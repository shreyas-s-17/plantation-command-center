import { cn } from '@/utils/cn'

export default function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-earth-200 bg-white shadow-sm',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div
      className={cn('border-b border-earth-100 px-4 py-3 sm:px-6 sm:py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardBody({ className, children, ...props }) {
  return (
    <div className={cn('px-4 py-4 sm:px-6 sm:py-5', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'border-t border-earth-100 px-4 py-3 sm:px-6 sm:py-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
