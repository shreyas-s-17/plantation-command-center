import { Link } from 'react-router-dom'
import { PageHeader, Button } from '@/components/ui'
import { ROUTES } from '@/lib/routes'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4">
      <PageHeader
        title="404"
        description="The page you're looking for doesn't exist."
        className="text-center"
      />
      <Link to={ROUTES.DASHBOARD}>
        <Button>Go to dashboard</Button>
      </Link>
    </div>
  )
}
