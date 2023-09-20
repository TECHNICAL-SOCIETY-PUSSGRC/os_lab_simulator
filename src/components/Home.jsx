import React from 'react'
import Home_intro from './Home_intro'
import Home_content from './Home_content'
import Home_blogs from './Home_blogs'
import Home_fly from './Home_fly'
import Nav from './Nav'
import '../styles/Home.css'
 
const Home = () => {
  return (
   <div >
   
   
     <div className='home_page'>
     <Nav  />
        
        <Home_intro  />
       </div>

    <Home_content/>
        <Home_blogs/>
        <Home_fly/>
   </div>
  )
}

export default Home