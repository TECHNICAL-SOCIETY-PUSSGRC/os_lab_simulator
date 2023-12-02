// import logo from '../assets/logo1.svg'
// import logo from '../assets/logo.SVG'
import '../styles/TeamCard.css'

const TeamCard = ({ name }) => {
  return (
    <div className='team-card'>
        {/* <div className='logo-box'>
            <img src={logo} alt="logo" />
        </div> */}
        <h1>{name}</h1>
        <p>Full Stack Developer</p>
    </div>
  )
}

export default TeamCard