import { Copy, ExternalLink, Pencil, Scale, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Category, Product } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'

export function ProductCardList({
  categories,
  comparedIds,
  onCopyLink,
  onDelete,
  onEdit,
  onToggleCompare,
  products,
}: {
  categories: Category[]
  comparedIds: string[]
  onCopyLink: (url: string) => void
  onDelete: (product: Product) => void
  onEdit: (product: Product) => void
  onToggleCompare: (productId: string) => void
  products: Product[]
}) {
  const categoryLookup = new Map(categories.map((category) => [category.id, category.name]))

  return (
    <div className="grid gap-4 lg:hidden">
      {products.map((product) => {
        const isCompared = comparedIds.includes(product.id)

        return (
          <Card key={product.id}>
            <CardHeader className="gap-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardTitle>{product.name}</CardTitle>
                  <p className="mt-1 text-sm text-slate-500">{product.storeName}</p>
                </div>
                <div className="rounded-2xl bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-900">
                  {formatCurrency(product.price)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  {categoryLookup.get(product.categoryId) ?? 'Unknown'}
                </span>
                <a className="rounded-full bg-slate-100 px-3 py-1 text-cyan-800 underline-offset-4 hover:underline" href={product.link} rel="noreferrer" target="_blank">
                  View product page
                </a>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => onToggleCompare(product.id)} size="sm" variant={isCompared ? 'secondary' : 'outline'}>
                  <Scale className="size-4" />
                  {isCompared ? 'Selected' : 'Compare'}
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={product.link} rel="noreferrer" target="_blank">
                    <ExternalLink className="size-4" />
                    Open link
                  </a>
                </Button>
                <Button onClick={() => onCopyLink(product.link)} size="sm" variant="outline">
                  <Copy className="size-4" />
                  Copy link
                </Button>
                <Button onClick={() => onEdit(product)} size="sm" variant="ghost">
                  <Pencil className="size-4" />
                  Edit
                </Button>
                <Button onClick={() => onDelete(product)} size="sm" variant="ghost">
                  <Trash2 className="size-4 text-red-600" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
