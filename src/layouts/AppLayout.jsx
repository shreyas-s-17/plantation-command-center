import { Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '@/services/supabase'
import { useNavigate } from 'react-router-dom'


export default function AppLayout() {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
  
      if (!session) {
        setSession(null)
        setLoading(false)
        return
      }
      console.log("Logged in email:", session.user.email)
      
      const { data: userRecord, error } = await supabase
        .from('users')
        .select('role, site_id')
        .eq('email', session.user.email)
        .single()

        console.log("User record:", userRecord)
console.log("Error:", error)
  
if (error || !userRecord) {
  await supabase.auth.signOut()
  setSession(null)
  setLoading(false)
  return
} 
  
      setSession({
        ...session,
        appUser: userRecord,
      })

      if (
        userRecord.role === 'coordinator' &&
        window.location.pathname === '/'
      ) {
        window.location.replace(`/coordinator/${userRecord.site_id}`)
        return
      }
  
      setLoading(false)
    }
  
    checkSession()
  
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkSession()
    })
  
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <div className="p-8">Loading...</div>

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-dvh bg-earth-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-xl font-bold text-forest-700">
            🌱 Plantation Command Center
          </h1>
  
          <div className="flex items-center gap-4">
            <span className="text-sm text-earth-700">
              {session.user.email}
            </span>
  
            <button
              className="rounded-lg border px-3 py-2 text-sm hover:bg-earth-100"
              onClick={async () => {
                await supabase.auth.signOut()
navigate("/login", { replace: true })
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
  
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}