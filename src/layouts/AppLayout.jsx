import { Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '@/services/supabase'
import { Sidebar, MobileNav } from '@/components/navigation'
import { NAV_ITEMS } from '@/lib/constants'

export default function AppLayout() {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

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
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <MobileNav items={NAV_ITEMS} />

      <div className="hidden lg:block">
        <Sidebar items={NAV_ITEMS} className="fixed inset-y-0 left-0" />
      </div>

      <main className="flex-1 lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}