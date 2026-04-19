import { ExternalLink, Pencil, Scale, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { Category, Product } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'

export function ProductTable({
  categories,
  comparedIds,
  onDelete,
  onEdit,
  onToggleCompare,
  products,
}: {
  categories: Category[]
  comparedIds: string[]
  onDelete: (product: Product) => void
  onEdit: (product: Product) => void
  onToggleCompare: (productId: string) => void
  products: Product[]
}) {
  const categoryLookup = new Map(categories.map((category) => [category.id, category.name]))

  return (
    <Card className="hidden overflow-hidden lg:block">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-left">
            <colgroup>
              <col className="w-[8%]" />
              <col className="w-[24%]" />
              <col className="w-[14%]" />
              <col className="w-[14%]" />
              <col className="w-[12%]" />
              <col className="w-[14%]" />
              <col className="w-[14%]" />
            </colgroup>
            <thead className="border-b border-blue-100 bg-blue-50/70 text-sm text-blue-900">
              <tr>
                <th className="px-4 py-4 font-medium" />
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-4 py-4 font-medium">Store</th>
                <th className="px-4 py-4 font-medium">Category</th>
                <th className="px-4 py-4 font-medium">Price</th>
                <th className="px-4 py-4 font-medium">Compare</th>
                <th className="px-4 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const isCompared = comparedIds.includes(product.id)

                return (
                  <tr className="border-b border-blue-50 transition-colors hover:bg-blue-50/40" key={product.id}>
                    <td className="px-4 py-4 align-top">
                      <Button aria-label="Open link" asChild size="icon" title="Open link" variant="outline">
                        <a href={product.link} rel="noreferrer" target="_blank">
                          <ExternalLink className="size-4" />
                        </a>
                      </Button>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="truncate font-medium text-slate-950" title={product.name}>
                        {product.name}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="truncate text-slate-600" title={product.storeName}>
                        {product.storeName}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="truncate text-slate-600" title={categoryLookup.get(product.categoryId) ?? 'Unknown'}>
                        {categoryLookup.get(product.categoryId) ?? 'Unknown'}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top whitespace-nowrap font-semibold text-slate-950">{formatCurrency(product.price)}</td>
                    <td className="px-4 py-4 align-top">
                      <Button className="w-full justify-center whitespace-nowrap" onClick={() => onToggleCompare(product.id)} size="sm" variant={isCompared ? 'secondary' : 'outline'}>
                        <Scale className="size-4" />
                        {isCompared ? 'Selected' : 'Compare'}
                      </Button>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="flex gap-1.5">
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
