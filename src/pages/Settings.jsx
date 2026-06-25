import { PageHeader, Card, CardBody, CardHeader, Input, Button } from '@/components/ui'

export default function Settings() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your account and application preferences"
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold text-earth-950">Profile</h2>
          </CardHeader>
          <CardBody>
            <form className="max-w-md space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input label="Display name" name="displayName" placeholder="Your name" />
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="you@company.com"
                disabled
              />
              <Button type="submit" variant="secondary">
                Save changes
              </Button>
            </form>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold text-earth-950">Notifications</h2>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-earth-600">
              Notification preferences will be configurable here.
            </p>
          </CardBody>
        </Card>
      </div>
    </>
  )
}
