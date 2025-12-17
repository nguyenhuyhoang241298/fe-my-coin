import GmailSigninButton from './GmailSigninButton'
import MagicLink from './magic-link'
import Passkey from './passkey'

const OtherType = () => {
  return (
    <div className="flex items-center justify-between gap-4">
      <GmailSigninButton />
      <MagicLink />
      <Passkey />
    </div>
  )
}

export default OtherType
