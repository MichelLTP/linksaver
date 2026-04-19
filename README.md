# LinkSaver

LinkSaver is a small React app for saving product links, organizing them into categories, and comparing items side by side before buying. It is designed for people who collect products from different stores and want one place to track names, links, prices, and categories.

## What the app does

- Save products with a name, store name, price, category, and product URL
- Organize saved products into custom categories
- Filter products by category
- Sort saved products inside the dashboard
- Compare selected products on a dedicated comparison page
- Open original product links directly from the dashboard or compare view
- Persist data locally in the browser so saved items remain available between sessions

## Stack

- React 19
- TypeScript
- Vite
- React Router
- Zustand with persisted browser storage
- React Hook Form
- Zod
- Tailwind CSS v4
- Radix UI primitives
- Vitest and Testing Library

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 20 or newer
- npm 10 or newer

### 1. Clone the repository

```bash
git clone https://github.com/MichelLTP/linksaver.git
cd linksaver
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

After the server starts, open the local URL shown in the terminal. In a standard Vite setup, this is usually:

```text
http://localhost:5173
```

### 4. Build for production

```bash
npm run build
```

This creates the production build in `dist/`.

### 5. Preview the production build locally

```bash
npm run preview
```

### 6. Run tests

```bash
npm run test
```

If you want tests to rerun while you work:

```bash
npm run test:watch
```

## Available Scripts

- `npm run dev` starts the Vite development server
- `npm run build` runs TypeScript project builds and creates the production bundle
- `npm run preview` serves the production build locally
- `npm run test` runs the Vitest suite once
- `npm run test:watch` runs Vitest in watch mode

## How the app is organized

```text
src/
  app/         App bootstrap, providers, layout, and routing
  components/  Shared UI building blocks
  features/    Feature areas such as dashboard, compare, categories, and products
  lib/         Shared types, helpers, and storage constants
  store/       Zustand store and selectors
  test/        Route, feature, and store tests
```

## Notes

- App data is stored in the browser using local storage, so saved products are specific to the browser profile you use.
- No backend or external database is required to run the app locally.

