import { beforeEach, describe, expect, it } from 'vitest'
import {
  createLinkSaverStore,
  selectComparedProducts,
  selectVisibleProducts,
} from '@/store/use-link-saver-store'

describe('linkSaver store', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('adds and updates a product', () => {
    const store = createLinkSaverStore()
    const category = store.getState().categories[0]

    store.getState().addProduct({
      categoryId: category.id,
      link: 'https://example.com/product',
      name: 'Desk Lamp',
      price: 49.99,
      storeName: 'Home Store',
    })

    const [product] = store.getState().products

    expect(product.name).toBe('Desk Lamp')

    store.getState().updateProduct(product.id, {
      price: 39.99,
      storeName: 'Deals Store',
    })

    expect(store.getState().products[0]).toMatchObject({
      price: 39.99,
      storeName: 'Deals Store',
    })
  })

  it('filters and sorts visible products', () => {
    const store = createLinkSaverStore()
    const [tech, home] = store.getState().categories

    store.getState().addProduct({
      categoryId: tech.id,
      link: 'https://example.com/a',
      name: 'Keyboard',
      price: 120,
      storeName: 'Store A',
    })
    store.getState().addProduct({
      categoryId: home.id,
      link: 'https://example.com/b',
      name: 'Chair',
      price: 80,
      storeName: 'Store B',
    })

    store.getState().setFilterCategoryId(home.id)
    store.getState().setSortBy('price-desc')

    const visibleProducts = selectVisibleProducts(store.getState())

    expect(visibleProducts).toHaveLength(1)
    expect(visibleProducts[0].name).toBe('Chair')
  })

  it('deletes products linked to a removed category', () => {
    const store = createLinkSaverStore()
    const category = store.getState().categories[0]

    store.getState().addProduct({
      categoryId: category.id,
      link: 'https://example.com/a',
      name: 'Monitor',
      price: 199,
      storeName: 'Store A',
    })

    store.getState().removeCategory(category.id)

    expect(store.getState().categories.map((item) => item.id)).not.toContain(category.id)
    expect(store.getState().products).toHaveLength(0)
  })

  it('tracks compared products separately from the main list', () => {
    const store = createLinkSaverStore()
    const category = store.getState().categories[0]

    store.getState().addProduct({
      categoryId: category.id,
      link: 'https://example.com/a',
      name: 'Headphones',
      price: 149,
      storeName: 'Store A',
    })
    store.getState().addProduct({
      categoryId: category.id,
      link: 'https://example.com/b',
      name: 'Speakers',
      price: 179,
      storeName: 'Store B',
    })

    const [first, second] = store.getState().products

    store.getState().toggleCompareProduct(first.id)
    store.getState().toggleCompareProduct(second.id)

    expect(selectComparedProducts(store.getState()).map((item) => item.name)).toEqual([
      'Headphones',
      'Speakers',
    ])
  })
})
