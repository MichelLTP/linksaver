export interface Category {
  id: string
  name: string
  createdAt: string
}

export interface Product {
  id: string
  name: string
  storeName: string
  price: number
  link: string
  categoryId: string
  createdAt: string
  updatedAt: string
}

export type ProductInput = Pick<Product, 'categoryId' | 'link' | 'name' | 'price' | 'storeName'>

export type ProductUpdate = Partial<ProductInput>

export type SortBy = 'price-asc' | 'price-desc' | 'name-asc'
