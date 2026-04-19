import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

const variants = {
  default:
    'bg-[var(--color-primary)] text-white shadow-sm hover:bg-[var(--color-primary-strong)]',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  outline:
    'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-slate-900',
  ghost: 'text-slate-700 hover:bg-blue-50 hover:text-slate-900',
  secondary: 'bg-blue-100 text-blue-900 hover:bg-blue-200',
} as const

const sizes = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  icon: 'size-10',
} as const

export function buttonVariants({
  size = 'default',
  variant = 'default',
}: {
  size?: keyof typeof sizes
  variant?: keyof typeof variants
}) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60',
    variants[variant],
    sizes[size],
  )
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size = 'default', variant = 'default', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return <Comp className={cn(buttonVariants({ size, variant }), className)} ref={ref} {...props} />
  },
)

Button.displayName = 'Button'
