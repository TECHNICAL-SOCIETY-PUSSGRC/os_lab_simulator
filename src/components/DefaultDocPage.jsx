import React from 'react'

const DefaultDocPage = () => {
  return (
    <div className='docs-container'>

        <div className="doc-container">
        <h1>What is CPU Scheduling?</h1>
        <p>CPU Scheduling is a process of determining which process will own CPU for execution while another process is
            on hold. The main task of CPU scheduling is to make sure that whenever the CPU remains idle, the OS at least
            select one of the processes available in the ready queue for execution. The selection process will be
            carried out by the CPU scheduler. It selects one of the processes in memory that are ready for execution.
        </p>
        </div>

        <div className="doc-container">
        <h1>Why CPU Scheduling?</h1>
        <div>A typical process involves both I/O time and CPU time. In a uni programming system like MS-DOS, time spent
            waiting for I/O is wasted and CPU is free during this time. In multi programming systems, one process can
            use CPU while another is waiting for I/O. This is possible only with process scheduling.<br/><br/>
            <h2 className="light-heading" >Objectives of Process Scheduling Algorithm</h2>
            <li>Max CPU utilization [Keep CPU as busy as possible]</li>
            <li>Fair allocation of CPU.</li>
            <li>Max throughput [Number of processes that complete their execution per time unit]</li>
            <li>Min turnaround time [Time taken by a process to finish execution]</li>
            <li>Min waiting time [Time a process waits in ready queue]</li>
            <li>Min response time [Time when a process produces first response]</li>

        </div>
        </div>
            
        <div className="doc-container">
        <h1>Important CPU scheduling Terminologies</h1>
        <p>A typical process involves both I/O time and CPU time. In a uni programming system like MS-DOS, time spent waiting for I/O is wasted and CPU is free during this time. In multi programming systems, one process can use CPU while another is waiting for I/O. This is possible only with process scheduling.<br/><br/> 
        <li><span className="light-heading" > Burst Time/Execution Time:</span> It is a time required by the process to complete execution. It
            is also called running time.</li>
        <li><span className="light-heading"  > Arrival Time:</span> when a process enters in a ready state</li>
        <li>  <span className="light-heading">Finish Time:</span> when process complete and exit from a system</li>
        <li><span className="light-heading" > Multiprogramming:</span> A number of programs which can be present in memory at the same time.
        </li>
        <li><span className="light-heading" > Jobs:</span> It is a type of program without any kind of user interaction.</li>
        <li><span className="light-heading">User:</span> It is a kind of program having user interaction.</li>
        <li><span className="light-heading" > Process:</span> It is the reference that is used for both job and user.</li>
        <li><span className="light-heading">CPU/IO burst cycle:</span> Characterizes process execution, which alternates between CPU and I/O
            activity. CPU times are shorter than the time of I/O.</li>

        </p>
        </div>

        <div className="doc-container">
        <h1>Types of CPU Scheduling</h1>
        <p>There is mainly two major types of CPU Scheduling which is listed below.There is sub-types of this algorithm also. we have discussed all algorithm in details below. </p>
        <li  className="lighter-heading">Preemptive Algorithm</li>
        <li className="lighter-heading">Non Preemptive Algorithm</li>
        <br/>

        <p><span className="light-heading" >Preemptive Scheduling</span><br/><br/>
            In Preemptive Scheduling, the tasks are mostly assigned with their priorities. Sometimes it is important to
            run a task with a higher priority before another lower priority task, even if the lower priority task is
            still running. The lower priority task holds for some time and resumes when the higher priority task
            finishes its execution.<br/><br/>
            <br/>
            <span className="light-heading" >Non-Preemptive Scheduling</span><br/><br/>
            In this type of scheduling method, the CPU has been allocated to a specific process. The process that keeps
            the CPU busy will release the CPU either by switching context or terminating. It is the only method that can
            be used for various hardware platforms. That’s because it doesn’t need special hardware (for example, a
            timer) like preemptive scheduling.
        </p>
        </div>

        <div className="doc-container algo-type">
        <h1>Types of CPU scheduling Algorithm</h1>
        <p>There are mainly six types of process scheduling algorithm</p>
        
        <div className="algo-names">
        <li>First Come First Serve (FCFS)</li>
        <li>Shortest-Job-First (SJF) Scheduling</li>
        <li>Shortest Remaining Time</li>
        <li>Priority Scheduling</li>
        <li>Round Robin Scheduling</li>
        <li>Multilevel Queue Scheduling</li>
        </div>
        </div>



        <div className="doc-container" id="fcfs">
        <h1>1 First Come First Serve</h1>
        <p>First Come First Serve is the full form of FCFS. It is the easiest and most simple CPU scheduling algorithm.
            In this type of algorithm, the process which requests the CPU gets the CPU allocation first. This scheduling
            method can be managed with a FIFO queue.<br/><br/>

            As the process enters the ready queue, its PCB (Process Control Block) is linked with the tail of the queue.
            So, when CPU becomes free, it should be assigned to the process at the beginning of the queue.</p>

        <h4>
            <li>Advantages</li>
        </h4>
        <p>1. It is simple and easy to understand.<br/></p>

        <h4>
            <li>Disadvantages</li>
        </h4>
        <p>1. The process with less execution time suffer i.e. waiting time is often quite long.<br/><br/>
            2. Favors CPU Bound process then I/O bound process.<br/><br/>
            3. FCFS algorithm is particularly troublesome for time-sharing systems, where it is important that each user
            get a share of the CPU at regular intervals.</p>
        </div>



        <div className="doc-container">
        <h1>2 Shortest Remaining Time</h1>
        <p>The full form of SRT is Shortest remaining time. It is also known as SJF preemptive scheduling. In this
            method, the process will be allocated to the task, which is closest to its completion. This method prevents
            a newer ready state process from holding the completion of an older process.<br/></p>

        <h4>
            <li>Advantages</li>
        </h4>
        <p>1. The main advantage of the SRTF algorithm is that it makes the processing of the jobs faster than the SJF
            algorithm, mentioned it’s overhead charges are not counted.</p>

        <h4>
            <li>Disadvantages</li>
        </h4>
        <p>1. In SRTF, the context switching is done a lot more times than in SJN due to more consumption of the CPU's
            valuable time for processing. The consumed time of CPU then adds up to its processing time and which then
            diminishes the advantage of fast processing of this algorithm.<br/></p>
        <br/>
        </div>


        <div className="doc-container">
        <h1>3 Priority Based Scheduling</h1>
        <p>Priority scheduling is a method of scheduling processes based on priority. In this method, the scheduler
            selects the tasks to work as per the priority.<br/><br/>

            Priority scheduling also helps OS to involve priority assignments. The processes with higher priority should
            be carried out first, whereas jobs with equal priorities are carried out on a round-robin or FCFS basis.
            Priority can be decided based on memory requirements, time requirements, etc.<br/><br/>

        </p>
        <h4>
            <li>Advantages</li>
        </h4>
        <p>1. This provides a good mechanism where the relative importance of each process maybe precisely defined.<br/>
        </p>

        <h4>
            <li>Disadvantages</li>
        </h4>
        <p>1. If high priority processes use up a lot of CPU time, lower priority processes may starve and be postponed
            indefinitely.The situation where a process never gets scheduled to run is called starvation<br/><br/>
            2. Another problem is deciding which process gets which priority level assigned to it..<br/></p>
        <br/>
        </div>



        <div className= "doc-container">
        <h1>4 Round-Robin Scheduling</h1>
        <p>Round robin is the oldest, simplest scheduling algorithm. The name of this algorithm comes from the
            round-robin principle, where each person gets an equal share of something in turn. It is mostly used for
            scheduling algorithms in multitasking. This algorithm method helps for starvation free execution of
            processes.<br/><br/></p>

        <h4>
            <li>Advantages</li>
        </h4>
        <p>1. Every process gets an equal share of the CPU.<br/><br/>
            2. RR is cyclic in nature, so there is no starvation.</p>

        <h4>
            <li>Disadvantages</li>
        </h4>
        <p>1. Setting the quantum too short, increases the overhead and lowers the CPU efficiency, but setting it too
            long may cause poor response to short processes.<br/><br/>
            2. Average waiting time under the RR policy is often long.<br/>
        </p>
        
       
        </div>
        


        <div className="doc-container">
        <h1>5 Shortest Job First</h1>
        <p>SJF is a full form of Shortest job first is a scheduling algorithm in which the process with the shortest
            execution time should be selected for execution next. This scheduling method can be preemptive or
            non-preemptive. It significantly reduces the average waiting time for other processes awaiting
            execution.<br/></p>

        <h4>
            <li>Advantages</li>
        </h4>
        <p>1. Shortest jobs are favored.<br/><br/>
            2. It is provably optimal, in that it gives the minimum average waiting time for a given set of processes.
        </p>

        <h4>
            <li>Disadvantages</li>
        </h4>
        <p>1. SJF may cause starvation, if shorter processes keep coming. This problem is solved by aging..<br/><br/>
            2. It cannot be implemented at the level of short term CPU scheduling.<br/></p>

            {/* <button class="btn_1" onclick="gotoSimulator();">Go to Simulator</button> */}
        <br/>
        </div>

        
        <div className="doc-container">
        <h1>6 Multiple-Level Queues Scheduling</h1>
        <p>This algorithm separates the ready queue into various separate queues. In this method, processes are assigned
            to a queue based on a specific property of the process, like the process priority, size of the memory,
            etc.<br/><br/>

            However, this is not an independent scheduling OS algorithm as it needs to use other types of algorithms in
            order to schedule the jobs.<br/><br/></p>

        <h4>
            <li>Advantages</li>
        </h4>
        <p>1. Application of separate scheduling for various kind of processes is possible
            .<br/></p>

        <h4>
            <li>Disadvantages</li>
        </h4>
        <p>1. The lowest level process faces starvation problem.<br/></p>

       
        </div>

       




      </div>
  )
}

export default DefaultDocPage