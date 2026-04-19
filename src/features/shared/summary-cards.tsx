import { Boxes, DollarSign, Scale, Tags } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Category, Product } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'

export function SummaryCards({
  categories,
  compareCount,
  products,
}: {
  categories: Category[]
  compareCount: number
  products: Product[]
}) {
  const lowestPrice = products.length ? Math.min(...products.map((product) => product.price)) : null

  const items = [
    { icon: Boxes, label: 'Saved products', value: String(products.length) },
    { icon: Tags, label: 'Categories', value: String(categories.length) },
    { icon: DollarSign, label: 'Lowest price', value: lowestPrice === null ? 'N/A' : formatCurrency(lowestPrice) },
    { icon: Scale, label: 'Compared now', value: String(compareCount) },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map(({ icon: Icon, label, value }) => (
        <Card key={label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-slate-600">{label}</CardTitle>
            <div className="rounded-2xl bg-blue-50 p-2 text-blue-700">
              <Icon className="size-4" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="break-words text-wrap font-heading text-3xl font-semibold leading-tight text-slate-950">
              {value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
