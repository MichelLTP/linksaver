import { z } from 'zod'

export const productSchema = z.object({
  categoryId: z.string().min(1, 'Select a category'),
  link: z.url('Enter a valid URL'),
  name: z.string().trim().min(1, 'Product name is required'),
  price: z.number().positive('Price must be greater than zero'),
  storeName: z.string().trim().min(1, 'Store name is required'),
})

export type ProductFormValues = z.infer<typeof productSchema>
