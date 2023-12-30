import { SignIn as ClerkSignIn } from "@clerk/clerk-react"

const SignIn = ({ redirectUrl='/' }) => {
  return (
    <ClerkSignIn signUpUrl='/sign-up' redirectUrl={redirectUrl} />
  )
}

export default SignIn