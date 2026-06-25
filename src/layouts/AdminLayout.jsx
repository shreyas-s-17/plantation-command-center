import { Outlet } from 'react-router-dom'
import { Sidebar, MobileNav } from '@/components/navigation'
import { ADMIN_NAV_ITEMS } from '@/lib/constants'
import Badge from '@/components/ui/Badge'

export default function AdminLayout() {
  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <MobileNav items={ADMIN_NAV_ITEMS} />

      <div className="hidden lg:block">
        <Sidebar items={ADMIN_NAV_ITEMS} className="fixed inset-y-0 left-0" />
      </div>

      <main className="flex-1 lg:pl-64">
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 sm:px-6">
          <div className="mx-auto flex max-w-7xl items-center gap-2">
            <Badge variant="warning">Admin Mode</Badge>
            <p className="text-xs text-amber-800 sm:text-sm">
              You are viewing the administrative dashboard
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
