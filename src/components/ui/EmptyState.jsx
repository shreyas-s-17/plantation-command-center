import { cn } from '@/utils/cn'

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed',
        'border-earth-300 bg-earth-50/50 px-6 py-12 text-center',
        className,
      )}
    >
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-earth-100 text-earth-500">
          {icon}
        </div>
      )}
      <h3 className="text-base font-medium text-earth-900">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-earth-600">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
