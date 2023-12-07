import { useNavigate } from 'react-router-dom'
import '../styles/Home_intro.css'

const Home_intro = () => {

  const navigate = useNavigate()

  const handleChange = ()=>{
      navigate('/docs')
  }
  return (
    <div className='home_intro'>
      <h1> CPU Scheduling Simulator </h1>
      <p>
        Virtual lab for all type of Scheduling algorithm which will help you to understand algorithm better way.

        <br/>
        Start simulation now.
      </p>

      <button onClick={handleChange} className="button-85" role="button">Get Started</button>      
    </div>
  )
}

export default Home_intro