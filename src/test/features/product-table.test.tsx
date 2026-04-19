import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProductTable } from '@/features/products/components/product-table'

describe('ProductTable', () => {
  it('renders the desktop columns in the requested order and removes copy link', () => {
    render(
      <ProductTable
        categories={[{ createdAt: '2026-04-19T00:00:00.000Z', id: 'cat-1', name: 'Tech' }]}
        comparedIds={[]}
        onDelete={() => {}}
        onEdit={() => {}}
        onToggleCompare={() => {}}
        products={[
          {
            categoryId: 'cat-1',
            createdAt: '2026-04-19T00:00:00.000Z',
            id: 'product-1',
            link: 'https://example.com/product',
            name: 'Example product',
            price: 12.34,
            storeName: 'Example store',
            updatedAt: '2026-04-19T00:00:00.000Z',
          },
        ]}
      />,
    )

    const headers = screen.getAllByRole('columnheader')
    expect(headers).toHaveLength(7)
    expect(headers.map((header) => header.textContent)).toEqual(['', 'Product', 'Store', 'Category', 'Price', 'Actions', 'Compare'])

    const openLink = screen.getByRole('link', { name: 'Open link' })
    expect(openLink).toHaveAttribute('href', 'https://example.com/product')
    expect(openLink).not.toHaveTextContent(/\S/)

    const editProductButton = screen.getByRole('button', { name: 'Edit product' })
    expect(editProductButton).toHaveAttribute('aria-label', 'Edit product')
    expect(editProductButton).not.toHaveTextContent(/\S/)

    const deleteProductButton = screen.getByRole('button', { name: 'Delete product' })
    expect(deleteProductButton).toHaveAttribute('aria-label', 'Delete product')
    expect(deleteProductButton).not.toHaveTextContent(/\S/)

    expect(screen.queryByRole('button', { name: 'Copy link' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Compare' })).toHaveTextContent('Compare')
  })
})
