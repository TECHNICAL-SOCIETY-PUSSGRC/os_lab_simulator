import React from 'react'
import '../styles/InstructorCard.css'
import sir1 from '../assets/teamImage/sir1.jpeg'
import sir2 from '../assets/teamImage/sir2.jpg'

const InstructorCard = () => {
  return (
    <div  className='top-box-here'><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
               <h2 className='top-head'>Our Instructor</h2>
    <div class="instructor-card">
      <div class="imgBox">
        <img src={sir2} alt="" />
        <img src={sir1} alt="" />
      </div>
      <div class="details">
        <div class="ins-content">
          <h2> Kanwalpreet Singh Malhi</h2>
          <p>(Assis.Prof)</p>
          <div class="social-icons">
            <a href="https://facebook.com" target='_blank'><i class="fa fa-facebook" aria-hidden="true"></i></a>
            <a href="https://twitter.com" target='_blank'><i class="fa fa-twitter" aria-hidden="true"></i></a>
            <a href="https://www.linkedin.com/in/kanwalpreet-singh-malhi-91014928/"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
            <a href="https://instagram.com" target='_blank'><i class="fa fa-instagram" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    </div></div>
  )
}

export default InstructorCard