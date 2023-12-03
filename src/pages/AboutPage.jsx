import { Nav, TeamCard } from '../components'
import '../styles/About.css'

import ashishImg from '../assets/teamImage/ashishImg.png'
import kavyaImg from '../assets/teamImage/kavyaImg.jpg'
import socialImg from '../assets/teamImage/Social.png'


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
          <TeamCard name="Ashish Singh" id='1' image = {ashishImg} social={socialImg} />
          <TeamCard name="Kavya Gupta" id='2' image={kavyaImg}  social={socialImg} />
        </div>
      </div>
    </div>
  )
}

export default About