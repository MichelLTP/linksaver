import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FormMessage } from '@/components/ui/form-message'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Category, Product } from '@/lib/types'

export function CategoryManagerDialog({
  categories,
  onAddCategory,
  onDeleteCategory,
  onOpenChange,
  open,
  products,
}: {
  categories: Category[]
  onAddCategory: (name: string) => void
  onDeleteCategory: (id: string) => void
  onOpenChange: (open: boolean) => void
  open: boolean
  products: Product[]
}) {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  const existingNames = useMemo(() => categories.map((category) => category.name.toLowerCase()), [categories])

  const schema = z.object({
    name: z
      .string()
      .trim()
      .min(1, 'Category name is required')
      .refine((value) => !existingNames.includes(value.toLowerCase()), 'Category already exists'),
  })

  const form = useForm<{ name: string }>({
    defaultValues: { name: '' },
    resolver: zodResolver(schema),
  })

  const pendingCategory = categories.find((category) => category.id === pendingDeleteId) ?? null
  const linkedProducts = products.filter((product) => product.categoryId === pendingDeleteId)

  return (
    <>
      <Dialog onOpenChange={onOpenChange} open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage categories</DialogTitle>
            <DialogDescription>Create new categories or remove existing ones.</DialogDescription>
          </DialogHeader>

          <form
            className="grid gap-4"
            onSubmit={form.handleSubmit((values) => {
              onAddCategory(values.name)
              form.reset()
            })}
          >
            <div className="grid gap-2">
              <Label htmlFor="categoryName">New category</Label>
              <Input id="categoryName" placeholder="Gaming, Travel, Kitchen..." {...form.register('name')} />
              <FormMessage message={form.formState.errors.name?.message} />
            </div>
            <DialogFooter>
              <Button type="submit">Add category</Button>
            </DialogFooter>
          </form>

          <div className="space-y-3">
            {categories.map((category) => {
              const productCount = products.filter((product) => product.categoryId === category.id).length

              return (
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3" key={category.id}>
                  <div className="flex items-center gap-3">
                    <p className="font-medium text-slate-900">{category.name}</p>
                    <Badge className="border-slate-200 bg-slate-100 text-slate-700">{productCount} products</Badge>
                  </div>
                  <Button onClick={() => setPendingDeleteId(category.id)} size="sm" variant="ghost">
                    Delete
                  </Button>
                </div>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog onOpenChange={(isOpen) => !isOpen && setPendingDeleteId(null)} open={Boolean(pendingDeleteId)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category?</AlertDialogTitle>
            <AlertDialogDescription>
              {linkedProducts.length > 0
                ? `This category has ${linkedProducts.length} product${linkedProducts.length > 1 ? 's' : ''} and deleting it will also erase all products from that category.`
                : 'This category has no linked products.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingCategory) {
                  onDeleteCategory(pendingCategory.id)
                }
                setPendingDeleteId(null)
              }}
            >
              Delete category
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
