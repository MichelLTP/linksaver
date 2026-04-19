# linkSaver UI Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make product-link actions explicit, keep the desktop product table visually stable with one-line cells, and keep compare cards aligned by clamping long links and reserving a fixed 2-line title slot without changing row clickability.

**Architecture:** Keep the existing route and feature structure intact. Add coverage first in route-level tests, then make minimal UI changes in the desktop table, mobile cards, and compare cards so interaction affordances stay consistent while the desktop table gets fixed-width, truncating columns.

**Tech Stack:** React 19, React Router, TypeScript, Tailwind CSS, Vitest, Testing Library

---

## File Structure

- Modify: `src/test/routes/app-routes.test.tsx`
  - Extend route coverage so saved-product and compare views assert the new explicit `Open link` actions render.
- Modify: `src/features/products/components/product-table.tsx`
  - Stabilize the desktop table layout, remove row hover background, enforce single-line cells, and add the explicit open-link action.
- Modify: `src/features/products/components/product-card-list.tsx`
  - Add the explicit open-link action to the mobile action grid while preserving the current card layout.
- Modify: `src/features/compare/compare-page.tsx`
  - Add the explicit open-link action, clamp long displayed links to one line, and reserve a fixed 2-line title slot so compare-card detail rows align across products.

### Task 1: Add Failing Route Coverage For Explicit Open-Link Actions

**Files:**
- Modify: `src/test/routes/app-routes.test.tsx`

- [ ] **Step 1: Write the failing tests**

```tsx
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { appRoutes } from '@/app/router'
import { createLinkSaverStore, defaultCategories, linkSaverStore } from '@/store/use-link-saver-store'

function renderRoute(path: string) {
  const router = createMemoryRouter(appRoutes, {
    initialEntries: [path],
  })

  return render(<RouterProvider router={router} />)
}

describe('app routes', () => {
  beforeEach(() => {
    localStorage.clear()
    linkSaverStore.getState().replaceState({
      categories: defaultCategories,
      compareProductIds: [],
      filterCategoryId: null,
      products: [],
      sortBy: 'price-asc',
    })
  })

  it('renders explicit open-link actions for saved products', async () => {
    const category = linkSaverStore.getState().categories[0]

    linkSaverStore.getState().replaceState({
      categories: defaultCategories,
      compareProductIds: [],
      filterCategoryId: null,
      products: [
        {
          categoryId: category.id,
          createdAt: '2026-04-19T10:00:00.000Z',
          id: 'product-1',
          link: 'https://example.com/products/very-long-entry',
          name: 'Mechanical Keyboard',
          price: 129.99,
          storeName: 'Desk Setup',
          updatedAt: '2026-04-19T10:00:00.000Z',
        },
      ],
      sortBy: 'price-asc',
    })

    renderRoute('/')

    expect(await screen.findAllByRole('link', { name: /open link/i })).not.toHaveLength(0)
  })

  it('renders explicit open-link actions for compared products', async () => {
    const category = linkSaverStore.getState().categories[0]

    linkSaverStore.getState().replaceState({
      categories: defaultCategories,
      compareProductIds: ['product-1'],
      filterCategoryId: null,
      products: [
        {
          categoryId: category.id,
          createdAt: '2026-04-19T10:00:00.000Z',
          id: 'product-1',
          link: 'https://example.com/products/very-long-entry',
          name: 'Mechanical Keyboard',
          price: 129.99,
          storeName: 'Desk Setup',
          updatedAt: '2026-04-19T10:00:00.000Z',
        },
      ],
      sortBy: 'price-asc',
    })

    renderRoute('/compare')

    expect(await screen.findByRole('link', { name: /open link/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/test/routes/app-routes.test.tsx`
Expected: FAIL because no `Open link` actions exist in the current UI.

- [ ] **Step 3: Write minimal test cleanup if needed**

```tsx
beforeEach(() => {
  localStorage.clear()
  linkSaverStore.getState().replaceState({
    categories: defaultCategories,
    compareProductIds: [],
    filterCategoryId: null,
    products: [],
    sortBy: 'price-asc',
  })
})
```

- [ ] **Step 4: Run test to confirm the failure is the intended one**

Run: `npm run test -- src/test/routes/app-routes.test.tsx`
Expected: FAIL only on missing `Open link` assertions, not router or state setup errors.

- [ ] **Step 5: Commit**

```bash
git add src/test/routes/app-routes.test.tsx
git commit -m "test: cover explicit product open-link actions"
```

### Task 2: Implement Explicit Open-Link Actions Across Saved Products And Compare

**Files:**
- Modify: `src/features/products/components/product-table.tsx`
- Modify: `src/features/products/components/product-card-list.tsx`
- Modify: `src/features/compare/compare-page.tsx`

- [ ] **Step 1: Add explicit open-link anchors to the desktop table**

```tsx
import { Copy, ExternalLink, Pencil, Scale, Trash2 } from 'lucide-react'

<a href={product.link} rel="noreferrer" target="_blank">
  <Button asChild size="sm" variant="outline">
    <span>
      <ExternalLink className="size-4" />
      Open link
    </span>
  </Button>
</a>
```

- [ ] **Step 2: Add explicit open-link anchors to the mobile card actions**

```tsx
<Button asChild size="sm" variant="outline">
  <a href={product.link} rel="noreferrer" target="_blank">
    <ExternalLink className="size-4" />
    Open link
  </a>
</Button>
```

- [ ] **Step 3: Add explicit open-link anchors to each compare card**

```tsx
<Button asChild size="sm" variant="outline">
  <a href={product.link} rel="noreferrer" target="_blank">
    <ExternalLink className="size-4" />
    Open link
  </a>
</Button>
```

- [ ] **Step 4: Run the route test to verify it passes**

Run: `npm run test -- src/test/routes/app-routes.test.tsx`
Expected: PASS, with the new `Open link` actions present on saved-products and compare routes.

- [ ] **Step 5: Commit**

```bash
git add src/features/products/components/product-table.tsx src/features/products/components/product-card-list.tsx src/features/compare/compare-page.tsx src/test/routes/app-routes.test.tsx
git commit -m "feat: add explicit product open-link actions"
```

### Task 3: Stabilize The Desktop Table Layout To One-Line Rows

**Files:**
- Modify: `src/features/products/components/product-table.tsx`

- [ ] **Step 1: Write the layout change with fixed table behavior**

```tsx
<table className="min-w-full table-fixed text-left">
  <thead className="border-b border-slate-200 bg-slate-50/80 text-sm text-slate-500">
    <tr>
      <th className="w-[32%] px-6 py-4 font-medium">Product</th>
      <th className="w-[18%] px-6 py-4 font-medium">Store</th>
      <th className="w-[16%] px-6 py-4 font-medium">Category</th>
      <th className="w-[12%] px-6 py-4 font-medium">Price</th>
      <th className="w-[22%] px-6 py-4 font-medium">Actions</th>
    </tr>
  </thead>
```

- [ ] **Step 2: Remove row-level hover background and enforce single-line truncation**

```tsx
<tr className="border-b border-slate-100" key={product.id}>
  <td className="px-6 py-4">
    <div className="truncate font-medium text-slate-950">{product.name}</div>
    <a
      className="block truncate text-sm text-cyan-700 underline-offset-4 hover:underline"
      href={product.link}
      rel="noreferrer"
      target="_blank"
      title={product.link}
    >
      Visit product page
    </a>
  </td>
  <td className="truncate px-6 py-4 text-slate-600" title={product.storeName}>{product.storeName}</td>
  <td className="truncate px-6 py-4 text-slate-600" title={categoryLookup.get(product.categoryId) ?? 'Unknown'}>
    {categoryLookup.get(product.categoryId) ?? 'Unknown'}
  </td>
  <td className="truncate px-6 py-4 font-semibold text-slate-950">{formatCurrency(product.price)}</td>
```

- [ ] **Step 3: Keep the actions cell to one line**

```tsx
<td className="px-6 py-4">
  <div className="flex flex-nowrap gap-2 overflow-hidden">
    ...
  </div>
</td>
```

- [ ] **Step 4: Run the route test to verify the table still renders correctly**

Run: `npm run test -- src/test/routes/app-routes.test.tsx`
Expected: PASS, with saved products still visible after the table layout change.

- [ ] **Step 5: Commit**

```bash
git add src/features/products/components/product-table.tsx
git commit -m "fix: stabilize product table layout"
```

### Task 4: Align Compare Cards With A Fixed 2-Line Title Slot, Clamp Links, And Run Final Verification

**Files:**
- Modify: `src/features/compare/compare-page.tsx`
- Modify: `src/test/routes/app-routes.test.tsx`

- [ ] **Step 1: Reserve a fixed 2-line title slot in the compare-card header**

```tsx
const COMPARE_CARD_TITLE_MIN_HEIGHT = '3.5rem'
const COMPARE_TITLE_CLAMP_STYLE = {
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
} as const

<CardHeader data-compare-card-header>
  <CardTitle
    data-compare-title-clamp
    data-compare-title-clamp-lines="2"
    data-compare-title-min-height={COMPARE_CARD_TITLE_MIN_HEIGHT}
    style={{ ...COMPARE_TITLE_CLAMP_STYLE, minHeight: COMPARE_CARD_TITLE_MIN_HEIGHT }}
  >
    {product.name}
  </CardTitle>
  <CardDescription>{product.storeName}</CardDescription>
</CardHeader>
```

- [ ] **Step 2: Clamp the displayed compare-page URL to one line**

```tsx
<a
  className="block truncate font-medium text-cyan-800 underline-offset-4 hover:underline"
  href={product.link}
  rel="noreferrer"
  target="_blank"
  title={product.link}
>
  {product.link}
</a>
```

- [ ] **Step 3: Keep metadata rows in a stable stack below the fixed title slot**

```tsx
<CardContent className="space-y-4">
  <div className="rounded-2xl bg-cyan-50 p-4">
    ...
  </div>
  <dl className="space-y-3 text-sm">
    ...
  </dl>
  <div className="flex justify-end">
  <Button asChild size="sm" variant="outline">
    <a href={product.link} rel="noreferrer" target="_blank">
      <ExternalLink className="size-4" />
      Open link
    </a>
  </Button>
</div>
```

- [ ] **Step 4: Update route coverage for the fixed 2-line title slot**

```tsx
const compareTitles = screen.getAllByRole('heading', { level: 3 })
expect(compareTitles).toHaveLength(2)
compareTitles.forEach((title) => {
  expect(title).toHaveAttribute('data-compare-title-clamp')
  expect(title).toHaveAttribute('data-compare-title-clamp-lines', '2')
  expect(title).toHaveAttribute('data-compare-title-min-height')
})
```

- [ ] **Step 5: Run focused verification**

Run: `npm run test -- src/test/routes/app-routes.test.tsx`
Expected: PASS

Run: `npm run test`
Expected: PASS with no regressions in existing route or store tests.

- [ ] **Step 6: Run a React-specific check after the UI edits**

Run: `npx -y react-doctor@latest . --verbose --diff`
Expected: No new React warnings introduced by the component updates.

- [ ] **Step 7: Commit**

```bash
git add src/features/compare/compare-page.tsx src/features/products/components/product-card-list.tsx src/features/products/components/product-table.tsx src/test/routes/app-routes.test.tsx
git commit -m "fix: polish product comparison interactions"
```
