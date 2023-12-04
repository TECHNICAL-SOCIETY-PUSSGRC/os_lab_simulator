import { Nav, Home_intro, Home_content, Home_blogs, Home_fly } from '../components'
import Footer from '../components/Footer'
import '../styles/Home.css'
 
const Home = () => {
  return (
   <>
      <div className='home_page'>
        <Nav  />
        <Home_intro  />
      </div>

      <Home_content/>
      <Home_blogs/>
      <Home_fly/>
      
   </>
  )
}

export default Home