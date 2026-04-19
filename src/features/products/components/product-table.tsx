import { Copy, Pencil, Scale, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Category, Product } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'

export function ProductTable({
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
    <Card className="hidden lg:block">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-sm text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Store</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const isCompared = comparedIds.includes(product.id)

                return (
                  <tr className="border-b border-slate-100 transition-colors hover:bg-cyan-50/60" key={product.id}>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-950">{product.name}</div>
                      <a className="text-sm text-cyan-700 underline-offset-4 hover:underline" href={product.link} rel="noreferrer" target="_blank">
                        Visit product page
                      </a>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{product.storeName}</td>
                    <td className="px-6 py-4 text-slate-600">{categoryLookup.get(product.categoryId) ?? 'Unknown'}</td>
                    <td className="px-6 py-4 font-semibold text-slate-950">{formatCurrency(product.price)}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Button onClick={() => onToggleCompare(product.id)} size="sm" variant={isCompared ? 'secondary' : 'outline'}>
                          <Scale className="size-4" />
                          {isCompared ? 'Selected' : 'Compare'}
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
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
