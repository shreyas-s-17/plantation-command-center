import { NavLink as RouterNavLink } from 'react-router-dom'
import { cn } from '@/utils/cn'
import NavIcon from './NavIcon'

export default function NavLink({ to, label, icon, onClick, end = false }) {
  return (
    <RouterNavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
          isActive
            ? 'bg-forest-700 text-white'
            : 'text-earth-700 hover:bg-earth-100 hover:text-earth-900',
        )
      }
    >
      {icon && <NavIcon name={icon} />}
      {label}
    </RouterNavLink>
  )
}
