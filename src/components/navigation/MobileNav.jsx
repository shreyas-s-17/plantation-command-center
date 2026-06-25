import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NAV_ITEMS, APP_NAME } from '@/lib/constants'
import NavLink from './NavLink'
import NavIcon from './NavIcon'
import Button from '@/components/ui/Button'

export default function MobileNav({ items = NAV_ITEMS }) {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-earth-200 bg-white px-4 py-3 lg:hidden">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-700 text-white">
            <NavIcon name="leaf" />
          </div>
          <span className="text-sm font-semibold text-earth-950">{APP_NAME}</span>
        </Link>

        <Button
          variant="ghost"
          size="sm"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <NavIcon name={open ? 'close' : 'menu'} />
        </Button>
      </header>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-earth-950/40 lg:hidden"
            onClick={close}
            aria-hidden="true"
          />
          <nav className="fixed inset-y-0 right-0 z-50 w-72 bg-white p-4 shadow-xl lg:hidden">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-earth-900">Menu</p>
              <Button variant="ghost" size="sm" aria-label="Close menu" onClick={close}>
                <NavIcon name="close" />
              </Button>
            </div>
            <div className="space-y-1">
              {items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  label={item.label}
                  icon={item.icon}
                  end={item.path === '/'}
                  onClick={close}
                />
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  )
}
