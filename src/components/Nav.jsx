import { Link } from "react-router-dom";
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
        </ul>
       </div>
    </div>
  )
}

export default Nav