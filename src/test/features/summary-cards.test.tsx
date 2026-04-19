import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SummaryCards } from '@/features/shared/summary-cards'

describe('SummaryCards', () => {
  it('keeps the lowest price value contained inside the card', () => {
    render(
      <SummaryCards
        categories={[
          { createdAt: '2026-04-19T00:00:00.000Z', id: 'cat-1', name: 'Tech' },
          { createdAt: '2026-04-19T00:00:00.000Z', id: 'cat-2', name: 'Home' },
        ]}
        compareCount={0}
        products={[
          {
            categoryId: 'cat-1',
            createdAt: '2026-04-19T00:00:00.000Z',
            id: 'product-1',
            link: 'https://example.com/a',
            name: 'Expensive item',
            price: 1234567.89,
            storeName: 'Store A',
            updatedAt: '2026-04-19T00:00:00.000Z',
          },
        ]}
      />,
    )

    const value = screen.getByText('$1,234,567.89')

    expect(value).toHaveClass('break-words')
    expect(value).toHaveClass('text-wrap')
    expect(value).toHaveClass('leading-tight')
  })

  it('never expands past two columns', () => {
    const { container } = render(
      <SummaryCards
        categories={[
          { createdAt: '2026-04-19T00:00:00.000Z', id: 'cat-1', name: 'Tech' },
          { createdAt: '2026-04-19T00:00:00.000Z', id: 'cat-2', name: 'Home' },
        ]}
        compareCount={2}
        products={[
          {
            categoryId: 'cat-1',
            createdAt: '2026-04-19T00:00:00.000Z',
            id: 'product-1',
            link: 'https://example.com/a',
            name: 'Item A',
            price: 144,
            storeName: 'Store A',
            updatedAt: '2026-04-19T00:00:00.000Z',
          },
        ]}
      />,
    )

    const grid = container.firstElementChild

    expect(grid).toHaveClass('grid')
    expect(grid).toHaveClass('md:grid-cols-2')
    expect(grid).not.toHaveClass('xl:grid-cols-4')
  })
})
