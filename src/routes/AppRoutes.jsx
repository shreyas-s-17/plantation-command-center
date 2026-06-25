import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayout, AppLayout, AdminLayout } from '@/layouts'
import AccessPending from '@/pages/AccessPending'
import {
  Login,
  Dashboard,
  SiteDetails,
  CoordinatorDashboard,
  AdminDashboard,
  Reports,
  Settings,
  NotFound,
} from '@/pages'
import { ROUTES } from '@/lib/routes'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROUTES.SITE_DETAILS,
        element: <SiteDetails />,
      },
      {
        path: ROUTES.REPORTS,
        element: <Reports />,
      },
      {
        path: ROUTES.SETTINGS,
        element: <Settings />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: ROUTES.ADMIN,
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: '/access-pending',
    element: <AccessPending />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
])
