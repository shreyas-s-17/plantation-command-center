import { cn } from '@/utils/cn'

export default function PageHeader({
  title,
  description,
  actions,
  className,
}) {
  return (
    <header
      className={cn(
        'mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between',
        className,
      )}
    >
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight text-earth-950 sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-earth-600 sm:text-base">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      )}
    </header>
  )
}
