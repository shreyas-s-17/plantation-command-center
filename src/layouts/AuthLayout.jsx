import { Outlet } from 'react-router-dom'
import { APP_NAME } from '@/lib/constants'
import NavIcon from '@/components/navigation/NavIcon'

export default function AuthLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-br from-forest-950 via-forest-900 to-earth-950">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6">
        <div className="mb-8 flex items-center gap-3 text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-600">
            <NavIcon name="leaf" />
          </div>
          <div>
            <p className="text-lg font-semibold">{APP_NAME}</p>
            <p className="text-sm text-forest-200">Plantation operations platform</p>
          </div>
        </div>

        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      <footer className="py-4 text-center text-xs text-forest-300/70">
        &copy; {new Date().getFullYear()} {APP_NAME}
      </footer>
    </div>
  )
}
