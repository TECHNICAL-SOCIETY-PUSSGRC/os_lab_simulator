// import logo from '../assets/logo1.svg'
// import logo from '../assets/logo.SVG'
import '../styles/TeamCard.css'
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";




const TeamCard = ({ name,image,social,id}) => {
  console.log("id is: ",id)
  return (
    <>
    <div className='big-box'>
      {
        id ==1? <div class="maincontainer maincontainer-1">
        <div class="back">
            <h2>About Me & Project</h2>
            <p> Myself Ashish Singh , student of Computer Science & Engineering Panjab University SSGRC Hoshiarpur. <br />Currently studying in 3rd year. <br />I have developed this project to  understand the complex algorithms of our syllabus in a easy way. </p>
             
        </div>
        <div class="front front-1">
            <div class="image">
            <img src={image} alt='ashish singh'/>
            <h2>{name}</h2>
            </div>
        </div>
    </div> :  <div class="maincontainer maincontainer-2">
            <div class="back">
                <h2>About Me & Project</h2>
                <p>Hey Everyone ! This is Kavya Gupta, a third-year BE CSE student at Panjab University SSG Regional Center.
                  Purpose of developing this project is to sharp my Full Stack Skills and help our juniors to understand easily the world of Algorithms.
                </p>
            </div>
            <div class="front front-2">
                <div class="image">
                <img src={image} alt='Kavya Gupta'/>
                <h2>{name}</h2>
                </div>
            </div>
        </div>
      }
   


        {/* jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj */}


        {
          id ==1?<div class={`container container-1`}>
          <div class="card">
              <div class="face bg-face face1">
                  
                      <h1>Lets Get Connect </h1>
              </div>
              <div class="face face2">
                  <div class=" c1 content">
                  <h3>
                          <a href="https://www.linkedin.com/in/adamdipinto/" target="_blank">Follow Us</a>
                      </h3>
                     
                      <div className='social-link' >
                      
                     <a href="https://www.linkedin.com/in/ashish3553/" target='_blank'><FaLinkedin/></a>             
                     <a href="https://github.com/AS21317" target='_blank'> <FaGithub/></a>
                     <a href="mailto:ashish3553singh@gmail.com" target='_blank'> <MdEmail/></a>
                      </div>
                  </div>
              </div>
          </div>
      </div>: <div class={`container container-2`}>
          <div class="card">
              <div class="face bg-face face1">
                  
                      <h1>Lets Get Connect </h1>
              </div>
              <div class="face face2">
                  <div class="c2 content">
                  <h3>
                          <a href="https://www.linkedin.com/in/adamdipinto/" target="_blank">Follow Us</a>
                      </h3>
                     
                      <div className='social-link' >
                      
                     <a href=""><FaLinkedin/></a>             
                     <a href=""> <FaGithub/></a>
                     <a href="mailto:ashish3553singh@gmail.com"> <MdEmail/></a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
        }

    </div>
       
      
        </>
  )
}

export default TeamCard