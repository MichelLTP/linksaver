import type { ReactNode } from 'react'
import { Toaster } from 'sonner'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster position="top-right" richColors />
    </>
  )
}
