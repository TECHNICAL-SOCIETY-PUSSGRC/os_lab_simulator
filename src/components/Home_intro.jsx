import React from 'react'
import '../styles/Home_intro.css'
import Button from './Button'

const Home_intro = () => {
  return (
    <div className='home_intro'>
      <h1> CPU Scheduling Simulator </h1>
      <p>
                Virtual lab for all type of Scheduling algorithm which will help you to understand algorithm better way.

                <br/>
                Start simulation now.
            </p>


          <button>GET STARTED</button>

      
    </div>
  )
}

export default Home_intro