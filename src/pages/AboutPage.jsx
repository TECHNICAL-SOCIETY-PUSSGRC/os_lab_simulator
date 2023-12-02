import { Nav, TeamCard } from '../components'
import '../styles/About.css'

const About = () => {
  return (
    <div className='about-us-page'>
      <div className='title-section'>
        <Nav />
        <h1 className='title'>About Us</h1>
      </div>

      <div className='our-team-container'>
        <h1 style={{ color: '#444' }}>Our Team</h1>

        <div className='team'>
          <TeamCard name="Ashish Singh" />
          <TeamCard name="Kavya Gupta" />
        </div>
      </div>
    </div>
  )
}

export default About