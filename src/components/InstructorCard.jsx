import React from 'react'
import '../styles/InstructorCard.css'
import sir1 from '../assets/teamImage/sir1.jpeg'
import sir2 from '../assets/teamImage/sir2.jpg'
import { FaFacebookSquare } from "react-icons/fa";


const InstructorCard = () => {
  return (
    <div  className='top-box-here'><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
               <h2 className='top-head'>Our Instructor</h2>
    <div className="instructor-card">
      <div className="imgBox">
        <img src={sir1} alt="" />
        <img src={sir2} alt="" />
      </div>
      <div className="details">
        <div className="ins-content">
          <h2> Kanwalpreet Singh Malhi</h2>
          <p>(Assis.Prof)</p>
          <div className="social-icons">
            <a href="https://facebook.com" target='_blank'><FaFacebookSquare/></a>
            <a href="https://twitter.com" target='_blank'><i className="fa fa-twitter" aria-hidden="true"></i></a>
            <a href="https://www.linkedin.com/in/kanwalpreet-singh-malhi-91014928/"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
            <a href="https://instagram.com" target='_blank'><i className="fa fa-instagram" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    </div></div>
  )
}

export default InstructorCard