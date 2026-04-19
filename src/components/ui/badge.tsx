import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Badge({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800',
        className,
      )}
    >
      {children}
    </span>
  )
}
