import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CategoryManagerDialog } from '@/features/categories/components/category-manager-dialog'
import { ProductCardList } from '@/features/products/components/product-card-list'
import { ProductDialog } from '@/features/products/components/product-dialog'
import { ProductTable } from '@/features/products/components/product-table'
import { EmptyState } from '@/features/shared/empty-state'
import { FilterBar } from '@/features/shared/filter-bar'
import { SummaryCards } from '@/features/shared/summary-cards'
import type { Product } from '@/lib/types'
import { selectVisibleProducts, useLinkSaverStore } from '@/store/use-link-saver-store'

export function DashboardPage() {
  const { id: routeCategoryId } = useParams()
  const [isProductDialogOpen, setProductDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [pendingDeleteProduct, setPendingDeleteProduct] = useState<Product | null>(null)

  const categories = useLinkSaverStore((state) => state.categories)
  const compareProductIds = useLinkSaverStore((state) => state.compareProductIds)
  const filterCategoryId = useLinkSaverStore((state) => state.filterCategoryId)
  const products = useLinkSaverStore((state) => state.products)
  const sortBy = useLinkSaverStore((state) => state.sortBy)
  const addProduct = useLinkSaverStore((state) => state.addProduct)
  const updateProduct = useLinkSaverStore((state) => state.updateProduct)
  const removeProduct = useLinkSaverStore((state) => state.removeProduct)
  const addCategory = useLinkSaverStore((state) => state.addCategory)
  const removeCategory = useLinkSaverStore((state) => state.removeCategory)
  const setSortBy = useLinkSaverStore((state) => state.setSortBy)
  const toggleCompareProduct = useLinkSaverStore((state) => state.toggleCompareProduct)

  const activeCategoryId = routeCategoryId ?? filterCategoryId

  const visibleProducts = useMemo(
    () => selectVisibleProducts({ filterCategoryId: activeCategoryId, products, sortBy }),
    [activeCategoryId, products, sortBy],
  )

  const activeCategory = categories.find((category) => category.id === routeCategoryId) ?? null

  async function handleCopyLink(url: string) {
    if (!navigator.clipboard) {
      toast.error('Clipboard access is not available in this browser.')
      return
    }

    try {
      await navigator.clipboard.writeText(url)
      toast.success('Product link copied')
    } catch {
      toast.error('Could not copy the link')
    }
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="overflow-hidden">
          <CardContent className="grid gap-6 p-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div className="space-y-4">
              <span className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-900">
                Smart product watchlist
              </span>
              <div className="space-y-2">
                <h1 className="font-heading text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Save prices before you forget them.
                </h1>
                <p className="max-w-2xl text-base text-slate-600">
                  Keep every product candidate in one place, compare store options side by side, and cut bad purchase decisions fast.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-start gap-3 md:justify-end">
              <Button
                onClick={() => {
                  setEditingProduct(null)
                  setProductDialogOpen(true)
                }}
              >
                Add product
              </Button>
              <Button onClick={() => setCategoryDialogOpen(true)} variant="outline">
                Manage categories
              </Button>
              <Button asChild variant="secondary">
                <Link to="/compare">Open compare</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <SummaryCards categories={categories} compareCount={compareProductIds.length} products={products} />
      </section>

      <FilterBar activeCategoryId={activeCategoryId} categories={categories} onSortChange={setSortBy} sortBy={sortBy} />

      <section className="space-y-4">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-slate-950">
            {activeCategory ? `Category: ${activeCategory.name}` : 'All saved products'}
          </h2>
          <p className="text-sm text-slate-600">
            {visibleProducts.length} result{visibleProducts.length === 1 ? '' : 's'} ready to review.
          </p>
        </div>

        {visibleProducts.length === 0 ? (
          <EmptyState
            action={
              <Button
                onClick={() => {
                  setEditingProduct(null)
                  setProductDialogOpen(true)
                }}
              >
                Add your first product
              </Button>
            }
            description="Start by saving your first product so you can compare stores, links, and pricing in one place."
            title="No products saved yet"
          />
        ) : (
          <>
            <ProductTable
              categories={categories}
              comparedIds={compareProductIds}
              onCopyLink={handleCopyLink}
              onDelete={setPendingDeleteProduct}
              onEdit={(product) => {
                setEditingProduct(product)
                setProductDialogOpen(true)
              }}
              onToggleCompare={toggleCompareProduct}
              products={visibleProducts}
            />
            <ProductCardList
              categories={categories}
              comparedIds={compareProductIds}
              onCopyLink={handleCopyLink}
              onDelete={setPendingDeleteProduct}
              onEdit={(product) => {
                setEditingProduct(product)
                setProductDialogOpen(true)
              }}
              onToggleCompare={toggleCompareProduct}
              products={visibleProducts}
            />
          </>
        )}
      </section>

      <ProductDialog
        categories={categories}
        initialProduct={editingProduct}
        onOpenChange={(open) => {
          setProductDialogOpen(open)
          if (!open) {
            setEditingProduct(null)
          }
        }}
        onSubmit={(values) => {
          if (editingProduct) {
            updateProduct(editingProduct.id, values)
            toast.success('Product updated')
          } else {
            addProduct(values)
            toast.success('Product added')
          }
        }}
        open={isProductDialogOpen}
      />

      <CategoryManagerDialog
        categories={categories}
        onAddCategory={(name) => {
          addCategory(name)
          toast.success('Category added')
        }}
        onDeleteCategory={(id) => {
          removeCategory(id)
          toast.success('Category deleted')
        }}
        onOpenChange={setCategoryDialogOpen}
        open={isCategoryDialogOpen}
        products={products}
      />

      <AlertDialog onOpenChange={(open) => !open && setPendingDeleteProduct(null)} open={Boolean(pendingDeleteProduct)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
            <AlertDialogDescription>
              Remove {pendingDeleteProduct?.name} from your saved list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingDeleteProduct) {
                  removeProduct(pendingDeleteProduct.id)
                  toast.success('Product deleted')
                }
                setPendingDeleteProduct(null)
              }}
            >
              Delete product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
