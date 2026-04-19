import { Copy, ExternalLink, Pencil, Scale, Trash2 } from 'lucide-react'
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
          <table className="w-full table-fixed text-left">
            <colgroup>
              <col className="w-[28%]" />
              <col className="w-[16%]" />
              <col className="w-[14%]" />
              <col className="w-[10%]" />
              <col className="w-[32%]" />
            </colgroup>
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
                  <tr className="border-b border-slate-100" key={product.id}>
                    <td className="px-6 py-4 align-top">
                      <div className="truncate font-medium text-slate-950" title={product.name}>
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="truncate text-slate-600" title={product.storeName}>
                        {product.storeName}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="truncate text-slate-600" title={categoryLookup.get(product.categoryId) ?? 'Unknown'}>
                        {categoryLookup.get(product.categoryId) ?? 'Unknown'}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top whitespace-nowrap font-semibold text-slate-950">{formatCurrency(product.price)}</td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-nowrap gap-1.5 overflow-hidden">
                        <Button className="shrink-0 whitespace-nowrap" onClick={() => onToggleCompare(product.id)} size="sm" variant={isCompared ? 'secondary' : 'outline'}>
                          <Scale className="size-4" />
                          {isCompared ? 'Selected' : 'Compare'}
                        </Button>
                        <Button className="shrink-0 whitespace-nowrap" asChild size="sm" variant="outline">
                          <a aria-label="Open link" href={product.link} rel="noreferrer" target="_blank" title="Open link">
                            <ExternalLink className="size-4" />
                            Open link
                          </a>
                        </Button>
                        <Button
                          aria-label="Copy link"
                          className="shrink-0"
                          onClick={() => onCopyLink(product.link)}
                          size="icon"
                          title="Copy link"
                          variant="outline"
                        >
                          <Copy className="size-4" />
                        </Button>
                        <Button
                          aria-label="Edit product"
                          className="shrink-0"
                          onClick={() => onEdit(product)}
                          size="icon"
                          title="Edit product"
                          variant="ghost"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          aria-label="Delete product"
                          className="shrink-0"
                          onClick={() => onDelete(product)}
                          size="icon"
                          title="Delete product"
                          variant="ghost"
                        >
                          <Trash2 className="size-4 text-red-600" />
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
