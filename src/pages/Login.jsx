import { useState } from 'react'
import { Card, CardBody, CardHeader, Button } from '@/components/ui'
import { supabase } from '@/services/supabase'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleGoogleSignIn() {
    setLoading(true)
    setError(null)

    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-earth-950">
          🌱 Plantation Command Center
        </h2>
        <p className="mt-1 text-sm text-earth-600">
          Please sign in with your Google account to continue.
        </p>
      </CardHeader>

      <CardBody>
        <Button
          size="lg"
          className="w-full"
          disabled={loading}
          onClick={handleGoogleSignIn}
        >
          Continue with Google
        </Button>

        {error && (
          <p className="mt-4 text-center text-xs text-red-600">{error}</p>
        )}

        <p className="mt-6 text-center text-xs text-earth-500">
          Plantation Monitoring System
        </p>
      </CardBody>
    </Card>
  )
}
