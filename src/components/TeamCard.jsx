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
    <div class="maincontainer">
            <div class="back">
                <h2>Copywriting</h2>
                <p>Introduction to Copywriting’ workshop focuses on the theory and processes of professional copywriting as applied to persuasion, reasoning, and rhetoric. This workshop is best-suited to learning how to write and think about consumer-driven functions.</p>
            </div>
            <div class="front">
                <div class="image">
                <img src={image} alt='ashish singh'/>
                <h2>{name}</h2>
                </div>
            </div>
        </div>


        {/* jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj */}


        <div class={`container`}>
        <div class="card">
            <div class="face bg-face face1">
                
                    <h1>Lets Get Connect </h1>
            </div>
            <div class="face face2">
                <div class="content">
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
    </div>
       
      
        </>
  )
}

export default TeamCard