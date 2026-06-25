import { Button, Card, CardBody, CardHeader } from '@/components/ui'
import { supabase } from '@/services/supabase'

export default function AccessPending() {
  async function signOut() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-earth-50">
      <Card className="max-w-md w-full">
        <CardHeader>
          <h2 className="text-xl font-bold text-red-600">
            Access Pending
          </h2>
          <p className="mt-2 text-sm text-earth-600">
            Your Google account has not been authorized yet.
          </p>
        </CardHeader>

        <CardBody>
          <Button
            className="w-full"
            onClick={signOut}
          >
            Sign Out
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}