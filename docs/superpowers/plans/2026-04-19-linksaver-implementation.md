# linkSaver Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fresh Vite + React + TypeScript app for saving, filtering, and comparing products with persisted Zustand state and shadcn-styled UI.

**Architecture:** The app will use a small route shell with three route entries (`/`, `/category/:id`, `/compare`) backed by a single persisted Zustand store. UI is split by feature area so product/category logic stays isolated while shared primitives live under `src/components` and `src/components/ui`.

**Tech Stack:** React, React Router, TypeScript, Vite, Tailwind CSS, shadcn/ui-style components, Zustand, Zod, React Hook Form, Vitest, Testing Library

---

## Planned File Structure

- `package.json` - project scripts and dependencies
- `vite.config.ts` / `vitest.config.ts` - build and test configuration
- `index.html` - Vite entry HTML
- `src/main.tsx` - React bootstrap
- `src/app/router.tsx` - route definitions and error boundary
- `src/app/layout/root-layout.tsx` - shared app shell
- `src/app/providers.tsx` - toast/theme app providers
- `src/index.css` - Tailwind setup and theme variables
- `src/lib/types.ts` - shared product/category types
- `src/lib/utils.ts` - className helpers and small utilities
- `src/lib/storage.ts` - persistence helpers/constants
- `src/store/use-link-saver-store.ts` - Zustand store and derived selectors
- `src/features/dashboard/dashboard-page.tsx` - dashboard route
- `src/features/compare/compare-page.tsx` - compare route
- `src/features/products/components/*` - product table/cards/dialog/actions
- `src/features/categories/components/*` - category manager dialog
- `src/features/shared/*` - summary cards, filter bar, empty state
- `src/test/*` - test setup and route/store tests

## Task 1: Scaffold the app and dependencies

**Files:**
- Create: Vite scaffold files and package manifest
- Modify: generated Tailwind/Vite config as needed
- Test: app boots with `npm run build`

- [ ] Create a fresh React + TypeScript Vite scaffold in the current directory.
- [ ] Install runtime dependencies for router, Zustand, forms, validation, icons, and toasts.
- [ ] Install dev dependencies for Tailwind, Vitest, Testing Library, jsdom, and TypeScript types.
- [ ] Configure Tailwind and base theme tokens for the chosen visual direction.
- [ ] Run `npm run build` to confirm the base scaffold is valid before feature work.

## Task 2: Add failing store tests first

**Files:**
- Create: `src/test/store/use-link-saver-store.test.ts`
- Create: `src/test/test-utils.ts`
- Test: `npm run test -- src/test/store/use-link-saver-store.test.ts`

- [ ] Write failing tests for product CRUD, category CRUD, filter/sort behavior, compare selection, and cascade deletion of category-linked products.
- [ ] Run the store test file and verify it fails for the expected missing implementation reasons.
- [ ] Implement the minimal Zustand store and selectors to satisfy the failing tests.
- [ ] Re-run the store tests until they pass cleanly.

## Task 3: Add failing route/UI tests first

**Files:**
- Create: `src/test/routes/app-routes.test.tsx`
- Create: `src/test/setup.ts`
- Test: `npm run test -- src/test/routes/app-routes.test.tsx`

- [ ] Write failing route-level tests covering dashboard rendering, category route filtering, compare empty state, and destructive delete confirmation copy.
- [ ] Run the route test file and confirm failures are caused by missing UI/routes rather than test setup mistakes.
- [ ] Build the minimal router, layout, and route containers needed to satisfy the tests.
- [ ] Re-run the route tests and keep them green while expanding the UI.

## Task 4: Implement feature UI

**Files:**
- Create: `src/app/*`
- Create: `src/features/**/*`
- Create: `src/components/ui/*`
- Modify: `src/index.css`, `src/main.tsx`
- Test: `npm run test`

- [ ] Implement the root layout, dashboard header, summary cards, filter controls, and empty states.
- [ ] Implement desktop table and mobile card views for products.
- [ ] Implement create/edit product dialog with Zod + React Hook Form validation.
- [ ] Implement category management dialog with destructive category deletion flow.
- [ ] Implement compare route and compare-selection actions.
- [ ] Add copy-link action and toast feedback.
- [ ] Keep tests passing after each vertical slice.

## Task 5: Verify and polish

**Files:**
- Modify: any failing or rough edges found during verification
- Test: `npm run test`, `npm run build`

- [ ] Run the full test suite.
- [ ] Run a production build.
- [ ] Review responsiveness, empty states, loading/error handling, and visual consistency in code.
- [ ] Summarize the final project structure and key technical decisions for handoff.
