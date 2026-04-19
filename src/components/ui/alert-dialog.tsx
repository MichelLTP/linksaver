import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import * as React from 'react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const AlertDialog = AlertDialogPrimitive.Root

export const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn('fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-sm', className)}
    ref={ref}
    {...props}
  />
))

AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Portal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      className={cn(
        'fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-3xl border border-white/70 bg-white p-6 shadow-2xl',
        className,
      )}
      ref={ref}
      {...props}
    />
  </AlertDialogPrimitive.Portal>
))

AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

export function AlertDialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-2 text-left', className)} {...props} />
}

export function AlertDialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col-reverse gap-3 sm:flex-row sm:justify-end', className)} {...props} />
}

export const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    className={cn('font-heading text-xl font-semibold text-slate-950', className)}
    ref={ref}
    {...props}
  />
))

AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

export const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description className={cn('text-sm text-slate-500', className)} ref={ref} {...props} />
))

AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName

export const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action className={cn(buttonVariants({ variant: 'destructive' }), className)} ref={ref} {...props} />
))

AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

export const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel className={cn(buttonVariants({ variant: 'outline' }), className)} ref={ref} {...props} />
))

AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName
