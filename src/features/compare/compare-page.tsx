import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EmptyState } from '@/features/shared/empty-state'
import { formatCurrency } from '@/lib/utils'
import { selectComparedProducts, useLinkSaverStore } from '@/store/use-link-saver-store'

const COMPARE_CARD_HEADER_MIN_HEIGHT = '7.5rem'
const COMPARE_TITLE_SLOT_HEIGHT = '3.5rem'

export function ComparePage() {
  const categories = useLinkSaverStore((state) => state.categories)
  const compareProductIds = useLinkSaverStore((state) => state.compareProductIds)
  const products = useLinkSaverStore((state) => state.products)
  const clearComparedProducts = useLinkSaverStore((state) => state.clearComparedProducts)
  const comparedProducts = selectComparedProducts({ compareProductIds, products })
  const categoryLookup = new Map(categories.map((category) => [category.id, category.name]))

  if (comparedProducts.length === 0) {
    return (
      <EmptyState
        action={
          <Button asChild>
            <Link to="/">Back to dashboard</Link>
          </Button>
        }
        description="Pick products to compare from the dashboard, then come back here for a clean side-by-side view."
        title="Pick products to compare"
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-slate-950">Comparison view</h1>
          <p className="text-sm text-slate-600">Compare shortlisted products by store, category, and price.</p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link to="/">Back to dashboard</Link>
          </Button>
          <Button onClick={clearComparedProducts} variant="secondary">
            Clear compare list
          </Button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {comparedProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader data-compare-card-header="true" style={{ minHeight: COMPARE_CARD_HEADER_MIN_HEIGHT }}>
              <div data-compare-title-slot="true" style={{ height: COMPARE_TITLE_SLOT_HEIGHT }}>
                <CardTitle className="overflow-hidden line-clamp-2">
                  {product.name}
                </CardTitle>
              </div>
              <CardDescription>{product.storeName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl bg-blue-50 p-4">
                <p className="text-sm text-blue-800">Price</p>
                <p className="font-heading text-3xl font-semibold text-blue-950">{formatCurrency(product.price)}</p>
              </div>
              <Button asChild variant="outline" className="w-full">
                <a href={product.link} rel="noreferrer" target="_blank">
                  <ExternalLink className="size-4" />
                  Open link
                </a>
              </Button>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                  <dt className="text-slate-500">Category</dt>
                  <dd className="font-medium text-slate-900">{categoryLookup.get(product.categoryId) ?? 'Unknown'}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                  <dt className="text-slate-500">Store</dt>
                  <dd className="font-medium text-slate-900">{product.storeName}</dd>
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <dt className="mb-1 text-slate-500">Link</dt>
                  <dd>
                    <a className="block truncate font-medium text-blue-800 underline-offset-4 hover:underline" href={product.link} rel="noreferrer" target="_blank" title={product.link}>
                      {product.link}
                    </a>
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
