import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { appRoutes } from '@/app/router'
import { createLinkSaverStore, defaultCategories } from '@/store/use-link-saver-store'

function renderRoute(path: string) {
  const router = createMemoryRouter(appRoutes, {
    initialEntries: [path],
  })

  return render(<RouterProvider router={router} />)
}

describe('app routes', () => {
  beforeEach(() => {
    localStorage.clear()
    const store = createLinkSaverStore()
    store.getState().replaceState({
      categories: defaultCategories,
      compareProductIds: [],
      filterCategoryId: null,
      products: [],
      sortBy: 'price-asc',
    })
  })

  it('renders the dashboard empty state', async () => {
    renderRoute('/')

    expect(await screen.findByText(/start by saving your first product/i)).toBeInTheDocument()
  })

  it('renders the compare empty state', async () => {
    renderRoute('/compare')

    expect(await screen.findByRole('heading', { name: /pick products to compare/i })).toBeInTheDocument()
  })

  it('shows a category-focused heading for the category route', async () => {
    const store = createLinkSaverStore()
    const tech = store.getState().categories[0]

    renderRoute(`/category/${tech.id}`)

    expect(await screen.findByRole('heading', { name: new RegExp(`category: ${tech.name}`, 'i') })).toBeInTheDocument()
  })
})
