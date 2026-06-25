import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/services/supabase'

const SITE_COLUMNS =
  'id, site_code, site_name, target_saplings, completed_saplings, status, coordinators, last_updated'

function normalizeSite(row) {
  const target = Number(row.target_saplings ?? 0)
  const completed = Number(row.completed_saplings ?? 0)

  return {
    id: row.id,
    siteCode: row.site_code ?? '',
    name: row.site_name ?? '',
    target,
    completed,
    coordinators: Array.isArray(row.coordinators) ? row.coordinators : [],
    status: row.status ?? 'active',
    lastUpdated: row.last_updated ?? null,
  }
}

export function useSites() {
  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('sites')
      .select(SITE_COLUMNS)
      .order('site_name')

    if (fetchError) {
      setError(fetchError.message)
      setSites([])
      setLoading(false)
      return
    }

    setSites((data ?? []).map(normalizeSite))
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { sites, loading, error, refresh }
}
