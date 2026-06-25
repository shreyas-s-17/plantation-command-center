import { NAV_ITEMS } from '@/lib/constants'
import NavLink from './NavLink'
import NavIcon from './NavIcon'
import { APP_NAME } from '@/lib/constants'
import { supabase } from '@/services/supabase'
import { useEffect, useState } from 'react'

export default function Sidebar({ items = NAV_ITEMS, className = '' }) {
  const [email, setEmail] = useState('')

useEffect(() => {
  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      setEmail(user.email)
    }
  }

  loadUser()
}, [])
  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <aside
      className={`flex h-full w-64 flex-col border-r border-earth-200 bg-white ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-earth-100 px-4 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-700 text-white">
          <NavIcon name="leaf" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-earth-950">{APP_NAME}</p>
          <p className="text-xs text-earth-500">Operations</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            label={item.label}
            icon={item.icon}
            end={item.path === '/'}
          />
        ))}
      </nav>

      <div className="border-t border-earth-100 p-3 space-y-3">
        <div className="rounded-lg bg-earth-50 px-3 py-2.5">
          <p className="text-xs font-medium text-earth-700">Signed in</p>
          <p className="truncate text-sm text-earth-900">
  {email}
</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}