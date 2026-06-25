import { cn } from '@/utils/cn'

export default function Input({
  label,
  id,
  error,
  className,
  wrapperClassName,
  ...props
}) {
  const inputId = id ?? props.name

  return (
    <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-earth-800"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-lg border border-earth-300 bg-white px-3 py-2 text-sm',
          'text-earth-950 placeholder:text-earth-400',
          'focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20',
          'disabled:cursor-not-allowed disabled:bg-earth-50 disabled:opacity-60',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
          className,
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
