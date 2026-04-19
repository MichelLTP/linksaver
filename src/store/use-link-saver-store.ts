import { useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'
import type { Category, Product, ProductInput, ProductUpdate, SortBy } from '@/lib/types'
import { LINK_SAVER_STORAGE_KEY } from '@/lib/storage'

export interface LinkSaverState {
  products: Product[]
  categories: Category[]
  filterCategoryId: string | null
  sortBy: SortBy
  compareProductIds: string[]
  hasHydrated: boolean
  hydrationError: string | null
  addProduct: (input: ProductInput) => void
  updateProduct: (id: string, updates: ProductUpdate) => void
  removeProduct: (id: string) => void
  addCategory: (name: string) => void
  removeCategory: (id: string) => void
  setFilterCategoryId: (categoryId: string | null) => void
  setSortBy: (sortBy: SortBy) => void
  toggleCompareProduct: (productId: string) => void
  clearComparedProducts: () => void
  replaceState: (state: Pick<LinkSaverState, 'categories' | 'compareProductIds' | 'filterCategoryId' | 'products' | 'sortBy'>) => void
}

const now = () => new Date().toISOString()

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

export const defaultCategories: Category[] = ['Tech', 'Home'].map((name) => ({
  id: createId(),
  name,
  createdAt: now(),
}))

const createInitialState = () => ({
  categories: defaultCategories,
  compareProductIds: [] as string[],
  filterCategoryId: null as string | null,
  hasHydrated: true,
  hydrationError: null as string | null,
  products: [] as Product[],
  sortBy: 'price-asc' as SortBy,
})

type CoreState = Pick<
  LinkSaverState,
  'categories' | 'compareProductIds' | 'filterCategoryId' | 'products' | 'sortBy'
>

const buildStore = (initialState: CoreState = createInitialState()) =>
  createStore<LinkSaverState>()(
    persist(
      (set) => ({
        ...createInitialState(),
        ...initialState,
        addProduct: (input) =>
          set((state) => ({
            products: [
              ...state.products,
              {
                ...input,
                createdAt: now(),
                id: createId(),
                updatedAt: now(),
              },
            ],
          })),
        updateProduct: (id, updates) =>
          set((state) => ({
            products: state.products.map((product) =>
              product.id === id ? { ...product, ...updates, updatedAt: now() } : product,
            ),
          })),
        removeProduct: (id) =>
          set((state) => ({
            compareProductIds: state.compareProductIds.filter((productId) => productId !== id),
            products: state.products.filter((product) => product.id !== id),
          })),
        addCategory: (name) =>
          set((state) => ({
            categories: [
              ...state.categories,
              {
                createdAt: now(),
                id: createId(),
                name,
              },
            ],
          })),
        removeCategory: (id) =>
          set((state) => {
            const remainingProducts = state.products.filter((product) => product.categoryId !== id)

            return {
              categories: state.categories.filter((category) => category.id !== id),
              compareProductIds: state.compareProductIds.filter((productId) =>
                remainingProducts.some((product) => product.id === productId),
              ),
              filterCategoryId: state.filterCategoryId === id ? null : state.filterCategoryId,
              products: remainingProducts,
            }
          }),
        setFilterCategoryId: (categoryId) => set({ filterCategoryId: categoryId }),
        setSortBy: (sortBy) => set({ sortBy }),
        toggleCompareProduct: (productId) =>
          set((state) => ({
            compareProductIds: state.compareProductIds.includes(productId)
              ? state.compareProductIds.filter((id) => id !== productId)
              : [...state.compareProductIds, productId],
          })),
        clearComparedProducts: () => set({ compareProductIds: [] }),
        replaceState: (state) =>
          set(() => ({
            ...state,
            hasHydrated: true,
            hydrationError: null,
          })),
      }),
      {
        name: LINK_SAVER_STORAGE_KEY,
        partialize: (state) => ({
          categories: state.categories,
          compareProductIds: state.compareProductIds,
          filterCategoryId: state.filterCategoryId,
          products: state.products,
          sortBy: state.sortBy,
        }),
      },
    ),
  )

export const createLinkSaverStore = (initialState?: CoreState) => buildStore(initialState)

export const linkSaverStore = buildStore()

export const useLinkSaverStore = <T,>(selector: (state: LinkSaverState) => T) =>
  useStore(linkSaverStore, selector)

export const selectVisibleProducts = (state: Pick<LinkSaverState, 'filterCategoryId' | 'products' | 'sortBy'>) => {
  const filtered = state.filterCategoryId
    ? state.products.filter((product) => product.categoryId === state.filterCategoryId)
    : state.products

  return [...filtered].sort((left, right) => {
    switch (state.sortBy) {
      case 'name-asc':
        return left.name.localeCompare(right.name)
      case 'price-desc':
        return right.price - left.price
      case 'price-asc':
      default:
        return left.price - right.price
    }
  })
}

export const selectComparedProducts = (
  state: Pick<LinkSaverState, 'compareProductIds' | 'products'>,
) => state.products.filter((product) => state.compareProductIds.includes(product.id))
