import { Link } from "react-router-dom";
import { SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { dark } from '@clerk/themes'
import { SpringButton } from ".";
import '../styles/Nav.css'

const Nav = () => {
  return (
    <div className='navbar '>
       <div className='oslab'>
        <Link to="/">OS LAB</Link>
       </div>

       <div>
        <ul className='flex gap-6 links'>
          <li> <Link to={'/'}>Home</Link> </li>
          <li> <Link to={'/docs'}>Docs</Link> </li>
          <li> <Link to={'/simulator'}>Simulator</Link> </li>
          <li> <Link to={'/about'}>About</Link> </li>

          <SignedIn>
            <UserButton afterSignOutUrl='/' appearance={{ baseTheme: dark }} userProfileProps={{ appearance: { baseTheme: dark }}} />
          </SignedIn>

          <SignedOut>
            <Link className="after:hidden" to={'/sign-in'}> 
              <SpringButton> Sign In </SpringButton> 
            </Link>
          </SignedOut>
        </ul>
       </div>
    </div>
  )
}

export default Nav