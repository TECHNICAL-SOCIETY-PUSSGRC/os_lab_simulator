import '../styles/Home_content.css'

const Home_content = () => {
  return (
    <div className='Home_content'>
      <h1>Why we need CPU Scheduling Algorithms</h1>
      <p>Main purposes of CPU Scheduling Algorithms are listed below</p>
      <div className="cards">

      <div className="card1 cardd" href="">
  <h3> Time Minimizing</h3>
  <p  className='textp'>In CPU scheduling, the objective is to minimize the turnaround time, waiting time, and response time to enhance the overall system performance and efficiency. Several algorithms and techniques are used to achieve this goal. </p>
  <div className="go-corner" href="">
    <div className="go-arrow">
      →
    </div>
  </div>
</div>


<div className="card1 cardd" href="">
<h3> CPU Utilization</h3>
<p className='textp'>CPU scheduling is a process that allows one process to use the CPU while the execution of another process is on hold due to unavailability of any resource like I/O etc, thereby making full use of CPU. The aim of CPU scheduling is to maximize CPU utilization by making the system efficient, fast, and fair. </p>
  <div className="go-corner" href="">
    <div className="go-arrow">
      →
    </div>
  </div>
</div>


<div className="card1 cardd" href="">
<h3> Max Performance</h3>
  <p className='textp'> CPU scheduling algorithms play a crucial role in maximizing the performance of a computer system by efficiently managing the allocation of CPU resources to various processes. The primary goal is to reduce the overall turnaround time, waiting time, and response time of processes.</p>
  <div className="go-corner" href="">
    <div className="go-arrow">
      →
    </div>
  </div>
</div>
       
      
       
      </div>
    </div>
  )
}

export default Home_content