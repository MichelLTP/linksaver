import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils'

export const Dialog = DialogPrimitive.Root

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn('fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-sm', className)}
    ref={ref}
    {...props}
  />
))

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={cn(
        'fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 gap-4 rounded-3xl border border-white/70 bg-white p-6 shadow-2xl sm:w-full',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900">
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))

DialogContent.displayName = DialogPrimitive.Content.displayName

export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-2 text-left', className)} {...props} />
}

export function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col-reverse gap-3 sm:flex-row sm:justify-end', className)} {...props} />
}

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    className={cn('font-heading text-xl font-semibold text-slate-950', className)}
    ref={ref}
    {...props}
  />
))

DialogTitle.displayName = DialogPrimitive.Title.displayName

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description className={cn('text-sm text-slate-500', className)} ref={ref} {...props} />
))

DialogDescription.displayName = DialogPrimitive.Description.displayName
