import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProductTable } from '@/features/products/components/product-table'

describe('ProductTable', () => {
  it('keeps lower-priority desktop actions icon-only', () => {
    render(
      <ProductTable
        categories={[{ createdAt: '2026-04-19T00:00:00.000Z', id: 'cat-1', name: 'Tech' }]}
        comparedIds={[]}
        onCopyLink={() => {}}
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

    expect(screen.getByRole('button', { name: 'Compare' })).toHaveTextContent('Compare')
    expect(screen.getByRole('link', { name: 'Open link' })).toHaveTextContent('Open link')

    const copyLinkButton = screen.getByRole('button', { name: 'Copy link' })
    expect(copyLinkButton).toHaveAttribute('aria-label', 'Copy link')
    expect(copyLinkButton).not.toHaveTextContent(/\S/)

    const editProductButton = screen.getByRole('button', { name: 'Edit product' })
    expect(editProductButton).toHaveAttribute('aria-label', 'Edit product')
    expect(editProductButton).not.toHaveTextContent(/\S/)

    const deleteProductButton = screen.getByRole('button', { name: 'Delete product' })
    expect(deleteProductButton).toHaveAttribute('aria-label', 'Delete product')
    expect(deleteProductButton).not.toHaveTextContent(/\S/)
  })
})
