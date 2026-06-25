import { useParams, Link } from 'react-router-dom'
import { PageHeader, Card, CardBody, Badge, EmptyState } from '@/components/ui'
import NavIcon from '@/components/navigation/NavIcon'
import { ROUTES } from '@/lib/routes'

export default function SiteDetails() {
  const { siteId } = useParams()

  return (
    <>
      <PageHeader
        title={`Site ${siteId}`}
        description="Detailed view of plantation site operations"
        actions={
          <Link
            to={ROUTES.DASHBOARD}
            className="text-sm font-medium text-forest-700 hover:text-forest-800"
          >
            &larr; Back to dashboard
          </Link>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: 'Area', value: '124 ha' },
          { label: 'Workers On-site', value: '8' },
          { label: 'Last Inspection', value: '—' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardBody>
              <p className="text-sm text-earth-600">{stat.label}</p>
              <p className="mt-1 text-xl font-semibold text-earth-950">{stat.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardBody>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-earth-950">Site Info</h2>
              <Badge variant="success">Active</Badge>
            </div>
            <dl className="space-y-3 text-sm">
              {[
                ['Site ID', siteId],
                ['Region', '—'],
                ['Crop Type', '—'],
                ['Manager', '—'],
              ].map(([term, value]) => (
                <div key={term} className="flex justify-between gap-4">
                  <dt className="text-earth-600">{term}</dt>
                  <dd className="font-medium text-earth-900">{value}</dd>
                </div>
              ))}
            </dl>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <EmptyState
              icon={<NavIcon name="site" />}
              title="Activity feed"
              description="Site activity and events will appear here once data is connected."
            />
          </CardBody>
        </Card>
      </div>
    </>
  )
}
