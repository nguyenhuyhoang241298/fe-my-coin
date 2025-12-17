import Passkey from './components/passkey'
import TwoFactor from './components/two-factor'

const Page = () => {
  return (
    <div className="container p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <TwoFactor />
      <Passkey />
    </div>
  )
}

export default Page
