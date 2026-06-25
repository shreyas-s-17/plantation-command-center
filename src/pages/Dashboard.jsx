import { Card, CardBody, Badge, PageHeader, Button } from '@/components/ui'
import { useSites } from '@/hooks/useSites'

const statusVariant = {
  active: 'success',
  warning: 'warning',
}

function formatNumber(value) {
  return value.toLocaleString()
}

function getRemaining(target, completed) {
  return Math.max(target - completed, 0)
}

function getProgress(completed, target) {
  if (target <= 0) return 0
  return Math.min((completed / target) * 100, 100)
}

export default function Dashboard() {
  const { sites, loading, error } = useSites()

  const totals = sites.reduce(
    (acc, site) => {
      acc.target += site.target
      acc.completed += site.completed
      return acc
    },
    { target: 0, completed: 0 },
  )

  const totalRemaining = getRemaining(totals.target, totals.completed)

  if (loading) {
    return (
      <>
        <PageHeader
          title="Dashboard"
          description="Plantation progress across all sites"
        />
        <p className="text-sm text-earth-600">Loading sites...</p>
      </>
    )
  }

  if (error) {
    return (
      <>
        <PageHeader
          title="Dashboard"
          description="Plantation progress across all sites"
        />
        <Card>
          <CardBody>
            <p className="text-sm font-medium text-red-700">Failed to load sites</p>
            <p className="mt-1 text-sm text-earth-600">{error}</p>
          </CardBody>
        </Card>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Plantation progress across all sites"
      />

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardBody>
            <p className="text-sm font-medium text-earth-600">Total Target</p>
            <p className="mt-2 text-2xl font-semibold text-earth-950 sm:text-3xl">
              {formatNumber(totals.target)}
            </p>
            <p className="mt-1 text-xs text-earth-500">Saplings planned</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-sm font-medium text-earth-600">Completed</p>
            <p className="mt-2 text-2xl font-semibold text-forest-700 sm:text-3xl">
              {formatNumber(totals.completed)}
            </p>
            <p className="mt-1 text-xs text-earth-500">Saplings planted</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-sm font-medium text-earth-600">Remaining</p>
            <p className="mt-2 text-2xl font-semibold text-earth-950 sm:text-3xl">
              {formatNumber(totalRemaining)}
            </p>
            <p className="mt-1 text-xs text-earth-500">Saplings to go</p>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {sites.map((site) => {
          const target = site.target
          const completed = site.completed
          const remaining = Math.max(target - completed, 0)
          const progress = getProgress(completed, target)

          return (
            <Card key={site.id}>
              <CardBody className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-earth-950">{site.name}</h2>
                    <p className="mt-0.5 text-xs text-earth-500">ID: {site.id}</p>
                  </div>
                  <Badge variant={statusVariant[site.status] ?? 'default'}>
                    {site.status}
                  </Badge>
                </div>

                <dl className="grid grid-cols-3 gap-3 text-center sm:gap-4">
                  <div className="rounded-lg bg-earth-50 px-2 py-2.5 sm:px-3">
                    <dt className="text-xs text-earth-600">Target</dt>
                    <dd className="mt-1 text-sm font-semibold text-earth-950 sm:text-base">
                      {formatNumber(target)}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-forest-50 px-2 py-2.5 sm:px-3">
                    <dt className="text-xs text-earth-600">Completed</dt>
                    <dd className="mt-1 text-sm font-semibold text-forest-700 sm:text-base">
                      {formatNumber(completed)}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-earth-50 px-2 py-2.5 sm:px-3">
                    <dt className="text-xs text-earth-600">Remaining</dt>
                    <dd className="mt-1 text-sm font-semibold text-earth-950 sm:text-base">
                      {formatNumber(remaining)}
                    </dd>
                  </div>
                </dl>

                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs text-earth-600">
                    <span>Progress</span>
                    <span className="font-medium text-earth-900">
                      {progress.toFixed(1)}%
                    </span>
                  </div>
                  <div
                    className="h-2.5 w-full overflow-hidden rounded-full bg-earth-100"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${site.name} progress`}
                  >
                    <div
                      className="h-full rounded-full bg-forest-600 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-earth-500">
                    Coordinators
                  </p>
                  <p className="mt-1.5 text-sm text-earth-800">
                    {site.coordinators.map((coordinator) => coordinator.name).join(', ')}
                  </p>
                </div>

                <div className="pt-1">
                  <Button className="w-full sm:w-auto">Update</Button>
                </div>
              </CardBody>
            </Card>
          )
        })}
      </div>
    </>
  )
}
