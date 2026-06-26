import { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardBody, CardHeader, Input, Button, PageHeader } from '@/components/ui'
import { supabase } from '@/services/supabase'
import { cn } from '@/utils/cn'

const SITE_COLUMNS =
  'id, site_code, site_name, target_saplings, completed_saplings, status, plantation_coordinator, operations_coordinator, last_updated'

function formatNumber(value) {
  return value.toLocaleString()
}

function normalizeSite(row) {
  const target = Number(row.target_saplings ?? 0)
  const completed = Number(row.completed_saplings ?? 0)

  return {
    id: row.id,
    name: row.site_name ?? '',
    target,
    completed,
    remaining: Math.max(target - completed, 0),
  }
}

export default function CoordinatorDashboard() {
  const { siteId } = useParams()
  const navigate = useNavigate()
  const [site, setSite] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [plantationCount, setPlantationCount] = useState('')
  const [remarks, setRemarks] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const fetchSite = useCallback(async () => {
    if (!siteId) {
      setError('Site ID is missing from the URL.')
      setSite(null)
      setLoading(false)
      return
    }
    
    const { data, error: fetchError } = await supabase
      .from('sites')
      .select(SITE_COLUMNS)
      .eq('id', siteId)
      .single()

    if (fetchError) {
      setError(fetchError.message)
      setSite(null)
      setLoading(false)
      return
    }

    setSite(normalizeSite(data))
    setLoading(false)
  }, [siteId])

  useEffect(() => {
    fetchSite()
  }, [fetchSite])

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitError(null)
    setSuccessMessage(null)

    const count = Number(plantationCount)

    if (!Number.isFinite(count) || count <= 0) {
      setSubmitError('Enter a valid number of saplings planted.')
      return
    }

    setSubmitting(true)

    const { error: insertError } = await supabase.from('daily_updates').insert({
      site_id: siteId,
      plantation_count: count,
      remarks: remarks.trim() || null,
    })

    if (insertError) {
      setSubmitError(insertError.message)
      setSubmitting(false)
      return
    }

    const newCompleted = site.completed + count

    const { error: updateError } = await supabase
      .from('sites')
      .update({
        completed_saplings: newCompleted,
        last_updated: new Date().toISOString(),
      })
      .eq('id', siteId)

    if (updateError) {
      setSubmitError(updateError.message)
      setSubmitting(false)
      return
    }

    setPlantationCount('')
setRemarks('')
setSubmitting(false)

navigate("/")
  }

  if (loading) {
    return (
      <>
        <PageHeader
          title="Coordinator Dashboard"
          description="Record daily plantation progress"
        />
        <p className="text-sm text-earth-600">Loading site...</p>
      </>
    )
  }

  if (error || !site) {
    return (
      <>
        <PageHeader
          title="Coordinator Dashboard"
          description="Record daily plantation progress"
        />
        <Card>
          <CardBody>
            <p className="text-sm font-medium text-red-700">Failed to load site</p>
            <p className="mt-1 text-sm text-earth-600">{error ?? 'Site not found.'}</p>
          </CardBody>
        </Card>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title={site.name}
        description="Record daily plantation progress for this site"
      />
      <div className="mb-4">
  <Button
    variant="secondary"
    onClick={() => navigate("/")}
  >
    ← Back to Dashboard
  </Button>
</div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardBody>
            <p className="text-sm font-medium text-earth-600">Site Name</p>
            <p className="mt-2 text-lg font-semibold text-earth-950">{site.name}</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-sm font-medium text-earth-600">Target Saplings</p>
            <p className="mt-2 text-2xl font-semibold text-earth-950">
              {formatNumber(site.target)}
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-sm font-medium text-earth-600">Completed Saplings</p>
            <p className="mt-2 text-2xl font-semibold text-forest-700">
              {formatNumber(site.completed)}
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-sm font-medium text-earth-600">Remaining Saplings</p>
            <p className="mt-2 text-2xl font-semibold text-earth-950">
              {formatNumber(site.remaining)}
            </p>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-base font-semibold text-earth-950">Record Plantation</h2>
        </CardHeader>

        <CardBody>
          <form className="max-w-xl space-y-4" onSubmit={handleSubmit}>
            <Input
              label="New Saplings Planted"
              type="number"
              name="plantationCount"
              min="1"
              step="1"
              value={plantationCount}
              onChange={(event) => setPlantationCount(event.target.value)}
              placeholder="Enter number of saplings"
            />

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="remarks"
                className="text-sm font-medium text-earth-800"
              >
                Remarks
              </label>
              <textarea
                id="remarks"
                name="remarks"
                rows={4}
                value={remarks}
                onChange={(event) => setRemarks(event.target.value)}
                placeholder="Add any notes about today's plantation activity"
                className={cn(
                  'w-full rounded-lg border border-earth-300 bg-white px-3 py-2 text-sm',
                  'text-earth-950 placeholder:text-earth-400',
                  'focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20',
                  'disabled:cursor-not-allowed disabled:bg-earth-50 disabled:opacity-60',
                )}
              />
            </div>

            <Button type="submit" size="lg" disabled={submitting}>
              🌱 Record Plantation
            </Button>

            {submitError && (
              <p className="text-sm text-red-600">{submitError}</p>
            )}

            {successMessage && (
              <p className="text-sm font-medium text-forest-700">{successMessage}</p>
            )}
          </form>
        </CardBody>
      </Card>
    </>
  )
}
