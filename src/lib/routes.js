export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  SITE_DETAILS: '/sites/:siteId',
  COORDINATOR: '/coordinator/:siteId',
  ADMIN: '/admin',
  REPORTS: '/reports',
  SETTINGS: '/settings',
  OPERATIONS: '/operations/:siteId',
}

export function siteDetailsPath(siteId) {
  return `/sites/${siteId}`
}
