import GmailSigninButton from './GmailSigninButton'
import MagicLink from './magic-link'

const OtherType = () => {
  return (
    <div className="flex items-center justify-between gap-4">
      <GmailSigninButton />
      <MagicLink />
    </div>
  )
}

export default OtherType
