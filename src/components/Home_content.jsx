import React from 'react'
import '../styles/Home_content.css'

const Home_content = () => {
  return (
    <div className='Home_content'>
      <h1>Why we need Algorithms</h1>
      <p>Purpose of CPU Scheduling Algorithms are listed below</p>
      <div className="cards">
        <div className="card">
         <div className="heading">
         <h3> Time Minimizing</h3>
         <div className='line'></div>
         </div>
          <p>There are many very different types of algorithms for different different tasks. By using them we can minimize waiting time, response time and turnaround time of processes. like turnaround time is minimized if most processes finish their next cpu burst within one time quantum.</p>
        </div>
        <div className="card">
        <h3> CPU Utilization</h3>
          <p>There are many very different types of algorithms for different different tasks. By using them we can minimize waiting time, response time and turnaround time of processes. like turnaround time is minimized if most processes finish their next cpu burst within one time quantum.</p>
        </div>
        <div className="card">
        <h3> Max Performance</h3>
          <p>There are many very different types of algorithms for different different tasks. By using them we can minimize waiting time, response time and turnaround time of processes. like turnaround time is minimized if most processes finish their next cpu burst within one time quantum.</p>
        </div>
      </div>
    </div>
  )
}

export default Home_content