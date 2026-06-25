import { PageHeader, Card, CardBody, EmptyState } from '@/components/ui'
import NavIcon from '@/components/navigation/NavIcon'

export default function AdminDashboard() {
  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        description="Manage users, sites, and system configuration"
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Users', value: '—' },
          { label: 'Organizations', value: '—' },
          { label: 'Pending Invites', value: '—' },
          { label: 'System Alerts', value: '—' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardBody>
              <p className="text-sm text-earth-600">{stat.label}</p>
              <p className="mt-1 text-2xl font-semibold text-earth-950">{stat.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardBody>
            <EmptyState
              icon={<NavIcon name="admin" />}
              title="User management"
              description="Create, edit, and deactivate user accounts."
            />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <EmptyState
              icon={<NavIcon name="settings" />}
              title="System settings"
              description="Configure global plantation parameters and integrations."
            />
          </CardBody>
        </Card>
      </div>
    </>
  )
}
