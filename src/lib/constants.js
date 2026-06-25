export const APP_NAME = 'Plantation Command Center'

export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/', icon: 'dashboard' },
  { label: 'Reports', path: '/reports', icon: 'reports' },
  { label: 'Settings', path: '/settings', icon: 'settings' },
]

export const ADMIN_NAV_ITEMS = [
  { label: 'Admin', path: '/admin', icon: 'admin' },
  ...NAV_ITEMS,
]
