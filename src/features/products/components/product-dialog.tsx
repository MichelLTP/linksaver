import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Category, Product } from '@/lib/types'
import { productSchema, type ProductFormValues } from '@/features/products/product-schema'

export function ProductDialog({
  categories,
  initialProduct,
  onOpenChange,
  onSubmit,
  open,
}: {
  categories: Category[]
  initialProduct?: Product | null
  onOpenChange: (open: boolean) => void
  onSubmit: (values: ProductFormValues) => void
  open: boolean
}) {
  const form = useForm<ProductFormValues>({
    defaultValues: {
      categoryId: initialProduct?.categoryId ?? categories[0]?.id ?? '',
      link: initialProduct?.link ?? '',
      name: initialProduct?.name ?? '',
      price: initialProduct?.price ?? 0,
      storeName: initialProduct?.storeName ?? '',
    },
    resolver: zodResolver(productSchema),
  })

  useEffect(() => {
    form.reset({
      categoryId: initialProduct?.categoryId ?? categories[0]?.id ?? '',
      link: initialProduct?.link ?? '',
      name: initialProduct?.name ?? '',
      price: initialProduct?.price ?? 0,
      storeName: initialProduct?.storeName ?? '',
    })
  }, [categories, form, initialProduct, open])

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialProduct ? 'Edit product' : 'Add product'}</DialogTitle>
          <DialogDescription>
            Save product details so you can compare stores and pricing later.
          </DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-4"
          onSubmit={form.handleSubmit((values) => {
            onSubmit(values)
            onOpenChange(false)
          })}
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Product name</Label>
            <Input id="name" {...form.register('name')} />
            <FormMessage message={form.formState.errors.name?.message} />
          </div>

          <div className="grid gap-2 md:grid-cols-2 md:gap-4">
            <div className="grid gap-2">
              <Label htmlFor="storeName">Store name</Label>
              <Input id="storeName" {...form.register('storeName')} />
              <FormMessage message={form.formState.errors.storeName?.message} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                min="0"
                step="0.01"
                type="number"
                {...form.register('price', { valueAsNumber: true })}
              />
              <FormMessage message={form.formState.errors.price?.message} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="link">Product link</Label>
            <Input id="link" placeholder="https://example.com/product" {...form.register('link')} />
            <FormMessage message={form.formState.errors.link?.message} />
          </div>

          <div className="grid gap-2">
            <Label>Category</Label>
            <Select
              onValueChange={(value) => form.setValue('categoryId', value, { shouldValidate: true })}
              value={form.watch('categoryId')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage message={form.formState.errors.categoryId?.message} />
          </div>

          <DialogFooter>
            <Button onClick={() => onOpenChange(false)} type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">{initialProduct ? 'Save changes' : 'Add product'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
