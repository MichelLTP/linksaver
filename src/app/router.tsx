import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { RootLayout } from '@/app/layout/root-layout'
import { ComparePage } from '@/features/compare/compare-page'
import { DashboardPage } from '@/features/dashboard/dashboard-page'

function RouteErrorBoundary() {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
      Something went wrong while loading this page.
    </div>
  )
}

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'category/:id', element: <DashboardPage /> },
      { path: 'compare', element: <ComparePage /> },
    ],
  },
]

export const router = createBrowserRouter(appRoutes)
