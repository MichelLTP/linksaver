# linkSaver Design Spec

## Goal
Build a simple, well-structured web app called `linkSaver` for saving, filtering, and visually comparing online products. The app is a fresh frontend scaffold built with React, React Router, Tailwind CSS, shadcn/ui, Zustand, TypeScript, and Vite, with all user data persisted in `localStorage`.

## Product Scope
- Users can create, edit, and delete products.
- Each product has a name, store name, price, product URL, and required category.
- Users can create and delete categories.
- Deleting a category with assigned products requires a destructive confirmation and, if confirmed, also deletes all products in that category.
- Users can view all products, filter by category, sort by price, and compare products visually.

## User Experience
- The primary experience is a single responsive dashboard at `/`.
- Product and category CRUD flows use dialogs instead of separate form pages.
- Filtering also supports `/category/:id` for direct category views.
- `/compare` provides a dedicated comparison view for selected products.
- Empty states are shown when there are no products, no categories beyond defaults, or no compared items.
- Basic loading and error states are shown around persisted state hydration and route-level rendering.
- Toast notifications confirm important actions such as create, update, delete, and copy-link.

## Visual Direction
- Clean, modern, light-first interface inspired by a data-dense shopping dashboard.
- Cyan-forward palette with green CTA accents:
  - Primary: `#0891B2`
  - Secondary: `#22D3EE`
  - CTA: `#22C55E`
  - Background: `#ECFEFF`
  - Text: `#164E63`
- Typography uses `Rubik` for headings and `Nunito Sans` for body copy.
- Desktop uses a compact comparison-friendly table layout; mobile collapses to stacked cards.

## Architecture
### App Shell
- `RootLayout` provides the page frame, header, routing outlet, and global UI such as toasts.
- The dashboard is the main workspace and contains summary cards, filters, sort controls, and the product collection.

### Routing
- `/` renders the full dashboard with optional active filters from store state.
- `/category/:id` renders the same dashboard UI but initializes/reflects a category filter from the route.
- `/compare` renders a comparison-focused layout using selected product IDs from global state.
- A simple error boundary handles route rendering failures.

### State Management
- Zustand store persists to `localStorage`.
- Store shape:
  - `products: Product[]`
  - `categories: Category[]`
  - `filterCategoryId: string | null`
  - `sortBy: 'price-asc' | 'price-desc' | 'name-asc'`
  - `compareProductIds: string[]`
  - CRUD and UI actions for products, categories, filtering, sorting, and compare selection
- Derived selectors provide filtered products, sorted products, and compare-ready items.

### Data Model
- `Category`
  - `id: string`
  - `name: string`
  - `createdAt: string`
- `Product`
  - `id: string`
  - `name: string`
  - `storeName: string`
  - `price: number`
  - `link: string`
  - `categoryId: string`
  - `createdAt: string`
  - `updatedAt: string`

## Component Boundaries
- `DashboardPage`: route container that binds route params to store filter state.
- `ComparePage`: route container for selected product comparison.
- `ProductTable` and `ProductCardList`: desktop/mobile renderers for the same product dataset.
- `ProductDialog`: shared create/edit form with Zod validation.
- `CategoryManagerDialog`: create/delete categories and surface destructive warnings.
- `FilterBar`: category filter chips/select and sort control.
- `SummaryCards`: small metrics for total products, categories, and lowest saved price.
- `EmptyState`: reusable empty-state block for dashboard and compare route.

## Validation And Error Handling
- Product form validates required text fields, positive numeric price, valid URL, and category selection.
- Category form validates non-empty unique names.
- Category deletion checks assigned product count and requires explicit user confirmation before cascade delete.
- Local storage hydration failures fall back to a safe empty state and surface a non-blocking error message.

## Testing Strategy
- Test store actions, especially cascade deletion behavior for categories.
- Test route rendering for `/`, `/category/:id`, and `/compare`.
- Test form validation and destructive confirmation flows.
- Test compare selection behavior and filtered/sorted rendering.

## Project Structure
- `src/app/` for app bootstrapping, router, providers, and layout
- `src/features/products/` for product types, store selectors, form logic, and UI
- `src/features/categories/` for category UI and logic
- `src/features/compare/` for compare UI
- `src/components/ui/` for shadcn/ui primitives
- `src/lib/` for utilities such as formatting, storage helpers, and constants
- `src/test/` for shared test utilities

## Non-Goals
- Backend or authentication
- Multi-user sync
- Price history tracking
- External scraping or live price refresh
