import { SignUp as ClerkSignUp } from '@clerk/clerk-react'

const SignUp = () => {
  return (
    <ClerkSignUp signInUrl='/sign-in' />
  )
}

export default SignUp