import { PageHeader, Card, CardBody, EmptyState } from '@/components/ui'
import NavIcon from '@/components/navigation/NavIcon'

export default function Reports() {
  return (
    <>
      <PageHeader
        title="Reports"
        description="Generate and export plantation operation reports"
      />

      <Card>
        <CardBody>
          <EmptyState
            icon={<NavIcon name="reports" />}
            title="No reports yet"
            description="Reports for harvest yields, worker activity, and site performance will be available here."
          />
        </CardBody>
      </Card>
    </>
  )
}
