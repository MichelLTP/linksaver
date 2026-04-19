import type { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function EmptyState({
  action,
  description,
  title,
}: {
  action?: ReactNode
  description: string
  title: string
}) {
  return (
    <Card className="border-dashed border-cyan-200 bg-white/75">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {action ? <CardContent>{action}</CardContent> : null}
    </Card>
  )
}
