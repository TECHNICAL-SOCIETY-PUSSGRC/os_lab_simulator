export const SampleData = () => [
  {
      "Pid": "P1",
      "AT": 0,
      "BT": 4,
  },{
      "Pid": "P2",
      "AT": 3,
      "BT": 5,
  },{
      "Pid": "P3",
      "AT": 2,
      "BT": 2,
  }
]

export const createCopyJSON = (data) => JSON.parse(JSON.stringify(data))
export const compareArraysOrJSONs = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const highlightColor = 'rgba(96, 130, 182, 0.6)'
const highlightResultColor = 'rgba(0, 143, 90, 0.6)'

// non repeatead color array
export const createColorSchemes = (noOfProcesses) => {
  const makeColor = (colorNum, colors) => {
    if (colors < 1) colors = 1;  // defaults to one color - avoid divide by zero
    return colorNum * (360 / colors) % 360;
  }
  let totalColors = noOfProcesses;

  let colors = [];
  for (let i = 0; i < noOfProcesses; i++){
    let color = "hsl( " + makeColor(i, totalColors) + ", 50%, 50% )";
    colors.push(color);
  }
  return colors;
}

export const createGanttChartData = (steps) => {
  let ganttChartData = [], temp = [];
  let limit = 7, isCPUFree = true;    // assuming the limit of processes to be shown per line as 7 (default value).
  let curProcessID = null;    // current process running in the cpu

  steps.forEach(({ cpu, curTime }) => {
    if(isCPUFree && cpu.Pid){
      // means the cpu was free but now there's a process that started running in it
      isCPUFree = false;
      curProcessID = cpu.Pid;

      temp.push({
        Pid: cpu.Pid,
        arrivalTime: curTime,
        exitingTime: null,
        timeInCPU: null,
        color: cpu.color
      })
    } else if (!isCPUFree && !cpu.Pid) {
      // means the cpu was busy but now its free
      isCPUFree = true;
      let curTempIndex = temp.length - 1;
      temp[curTempIndex].exitingTime = curTime;
      temp[curTempIndex].timeInCPU = temp[curTempIndex].exitingTime - temp[curTempIndex].arrivalTime;
    } else if (!isCPUFree && cpu.Pid !== curProcessID) {
      // this indicates that the cpu is prempted before the current process could be completed

      // filling the remaining details for the previous process
      let curTempIndex = temp.length - 1;
      temp[curTempIndex].exitingTime = curTime;
      temp[curTempIndex].timeInCPU = temp[curTempIndex].exitingTime - temp[curTempIndex].arrivalTime;

      // update data for the new process
      curProcessID = cpu.Pid
      temp.push({
        Pid: cpu.Pid,
        arrivalTime: curTime,
        exitingTime: null,
        timeInCPU: null,
        color: cpu.color
      })
    }
  })
  

  // filling empty time intervals
  let temp2 = [], prevExitingTime = 0
  let emptyProcess = { Pid: '', arrivalTime: null, exitingTime: null, timeInCPU: null, color: 'transparent' }
  temp.map((process) => {
    if(process.arrivalTime !== prevExitingTime){
      // if the two process are not adjacent to each other w.r.t. their time intervals, then this indicated that there is an empty interval of time between them
      emptyProcess.arrivalTime = prevExitingTime
      emptyProcess.exitingTime = process.arrivalTime
      emptyProcess.timeInCPU = emptyProcess.exitingTime - emptyProcess.arrivalTime
      temp2.push(createCopyJSON(emptyProcess))
    }

    temp2.push(process)
    prevExitingTime = process.exitingTime
  })

  // creating ganttChartData
  let temp3 = []
  temp2.map((process) => {
    temp3.push(process)
    if(temp3.length === limit){
      ganttChartData.push(createCopyJSON(temp3))
      temp3 = []
    }
  })
  if(temp3.length) ganttChartData.push(createCopyJSON(temp3))

  return ganttChartData;
}

/* Scheduling Functions */

export const StepWiseFCFS = (data) => {
  data = createCopyJSON(data) // so that original data is not modified

  let newData = data.map((processData, index) => {
    return ({
      ...processData,
      originalIndex: index,
    })
  })
  newData.sort((a, b) => a.AT - b.AT)
  
  
  let cpu = {}, queue = [], completed = [], steps = []
  let cpuProcessCT = -1 // required time units count at which process that is currently running in cpu will be completed
  let curTime = 0 // current time units count
  let timeGap = 0, prevRT = 0 // time units passed since last process was added in cpu, prev remaining time of process in cpu
  let avgTAT = 0.0, avgWT = 0.0;

  const updateData = (newData) => data[newData.originalIndex] = newData
  const pushInSteps = (msg) => {
    steps.push({
      cpu: createCopyJSON(cpu),
      queue: createCopyJSON(queue),
      completed: createCopyJSON(completed),
      curTime,
      data: createCopyJSON(data),
      msg,
      avgTAT,
      avgWT,
      ganttChartData: []
    })

    let newGanttChartData = createGanttChartData(steps)
    steps[steps.length - 1].ganttChartData = newGanttChartData;
  }
  const executeProcess = () => {
    prevRT = cpu.RT
    cpu.RT = cpuProcessCT - curTime
    timeGap = prevRT - cpu.RT

    if(! cpu.RT){
      // that means the process has completed
      cpu.CT = curTime
      updateData(cpu)
    }
  }
  const completeCurrentProcess = () => {
    curTime = cpuProcessCT
    executeProcess()
    
    completed.push(cpu.Pid)
    let completedProcessID = cpu.Pid
    cpu = {}
    pushInSteps(`At ${curTime} time unit, Process ${completedProcessID} is completed.`)
  }
  const pushIntoQueue = (processData) => {
    curTime = processData.AT
    queue.push(processData)

    let isExecuted = ! compareArraysOrJSONs(cpu, {})
    if(isExecuted){
      // this means that cpu had a process running in it so lets execute the process
      executeProcess()
    }

    pushInSteps(`At ${curTime} time unit, Process ${processData.Pid} is arrived & is added to queue.${isExecuted? `\nRemaining Time of ${cpu.Pid} in CPU: ${prevRT} (RT) - ${timeGap} (timeGap) = ${cpu.RT} time unit.`: ''}`)
  }
  const assignProcessToCPU = () => {
    if(! queue.length){
      // console.log("Cannot assign process to cpu: Queue is Empty");
      cpuProcessCT = -1
      return;
    }

    cpu = queue.shift()
    cpuProcessCT = curTime + cpu.BT
    executeProcess()
    pushInSteps(`At ${curTime} time unit, CPU is free so Process ${cpu.Pid} is assigned to CPU.\nRemaining Time of ${cpu.Pid} in CPU: ${cpu.BT} time unit (BT of P1).`)
  }


  newData.map((processData) => {
    while(cpu?.Pid && cpuProcessCT < processData.AT){
      // this means that cpu had a process running in it and its completed now
      completeCurrentProcess()

      // cpu is free now so can assign new process to it
      assignProcessToCPU()
    }

    // adding the process to queue
    pushIntoQueue(processData)

    // if cpu is free then assign the process now, no need to wait
    if(! cpu?.Pid) assignProcessToCPU()
  })

  // executing the remaining processes in the queue
  while(queue.length){
    completeCurrentProcess()
    assignProcessToCPU()
  }
  // considering the last process that was running in cpu
  if(cpu?.Pid) {
    completeCurrentProcess()
  }


  // calcualting TAT and WT
  data.map((process) => {
    process.TAT = process.CT - process.AT
    process.bgColor = {
      TAT: highlightResultColor,
      CT: highlightColor, AT: highlightColor
    }

    pushInSteps(`Process ${process.Pid} is executed till ${process.CT} time unit (CT).\nProcess ${process.Pid} arrived at ${process.AT} time unit (AT).\nTurn Around Time, TAT = CT - AT.\nTAT of ${process.Pid}: ${process.CT} - ${process.AT} = ${process.TAT}`)

    // resetting bgColor to transparent
    process.bgColor = {
      TAT: 'transparent', CT: 'transparent', AT: 'transparent'
    }
  })
  data.map((process) => {
    process.WT = process.TAT - process.BT
    process.bgColor = {
      WT: highlightResultColor,
      TAT: highlightColor, BT: highlightColor
    }

    pushInSteps(`Turn Around Time of Process ${process.Pid} is ${process.TAT} time unit (TAT).\nBurst Time of Process ${process.Pid} is ${process.BT} time unit (BT).\nWaiting Time, WT = TAT - BT.\nWT of ${process.Pid}: ${process.CT} - ${process.AT} = ${process.TAT}`)
    
    // resetting bgColor to transparent
    process.bgColor = {
      WT: 'transparent', TAT: 'transparent', BT: 'transparent'
    }
  })

  data.map((process) => {
    process.bgColor = { TAT: highlightColor }
  })
  avgTAT = (data.reduce((acc, cur) => acc + cur.TAT, 0) / data.length).toFixed(2)
  pushInSteps(`All the processes are completed.\nAverage TAT: ${avgTAT}`)
  
  data.map((process) => {
    process.bgColor = {
      TAT: 'transparent',
      WT: highlightColor
    }
  })
  avgWT = (data.reduce((acc, cur) => acc + cur.WT, 0) / data.length).toFixed(2)
  pushInSteps(`Average WT: ${avgWT}`)
  
  return steps;
}

export const StepWiseSJF = (data) => {
  data = createCopyJSON(data) // so that original data is not modified

  let newData = data.map((processData, index) => {
    return ({
      ...processData,
      originalIndex: index,
    })
  })
  newData.sort((a, b) => a.AT - b.AT)
  
  
  let cpu = {}, queue = [], completed = [], steps = []
  let cpuProcessCT = -1 // required time units count at which process that is currently running in cpu will be completed
  let curTime = 0 // current time units count
  let timeGap = 0, prevRT = 0 // time units passed since last process was added in cpu, prev remaining time of process in cpu
  let avgTAT = 0.0, avgWT = 0.0;

  const updateData = (newData) => data[newData.originalIndex] = newData
  const pushInSteps = (msg) => {
    steps.push({
      cpu: createCopyJSON(cpu),
      queue: createCopyJSON(queue),
      completed: createCopyJSON(completed),
      curTime,
      data: createCopyJSON(data),
      msg,
      avgTAT,
      avgWT,
      ganttChartData: []
    })

    let newGanttChartData = createGanttChartData(steps)
    steps[steps.length - 1].ganttChartData = newGanttChartData;
  }
  const executeProcess = () => {
    prevRT = cpu.RT
    cpu.RT = cpuProcessCT - curTime
    timeGap = prevRT - cpu.RT

    if(! cpu.RT){
      // that means the process has completed
      cpu.CT = curTime
      updateData(cpu)
    }
  }
  const completeCurrentProcess = () => {
    curTime = cpuProcessCT
    executeProcess()
    
    completed.push(cpu.Pid)
    let completedProcessID = cpu.Pid
    cpu = {}
    pushInSteps(`At ${curTime} time unit, Process ${completedProcessID} is completed.`)
  }
  const pushIntoQueue = (processData) => {
    curTime = processData.AT
    queue.push(processData)

    let isExecuted = ! compareArraysOrJSONs(cpu, {})
    if(isExecuted){
      // this means that cpu had a process running in it so lets execute the process
      executeProcess()
    }

    pushInSteps(`At ${curTime} time unit, Process ${processData.Pid} is arrived & is added to queue.${isExecuted? `\nRemaining Time of ${cpu.Pid} in CPU: ${prevRT} (RT) - ${timeGap} (timeGap) = ${cpu.RT} time unit.`: ''}`)
  }
  const getNextProcessToAssignFromQueue = () => {
    if(!queue.length) return;

    // Find the process with the minimum BT value in the queue
    let minBTProcess = queue.reduce((prev, curr) => prev.BT < curr.BT ? prev : curr)

    // Remove the minBTProcess from the queue
    queue = queue.filter((processData) => processData.Pid !== minBTProcess.Pid);
    
    return minBTProcess;
  }
  const assignProcessToCPU = () => {
    if(! queue.length){
      // console.log("Cannot assign process to cpu: Queue is Emtpy");
      cpuProcessCT = -1
      return;
    }

    // Highlighting the orginal Indexes of the elements present in queue
    let originalIndexes = []
    queue.map((processData) => originalIndexes.push(processData.originalIndex))
    originalIndexes.map((index) => {
      data[index].bgColor = {
        BT: highlightColor
      }
    })

    // picking up the next process
    const nextProcess = getNextProcessToAssignFromQueue()
    nextProcess.bgColor = { BT: highlightResultColor }
    let minMsg = `The process with min. BT value among all other processes in queue is ${nextProcess.Pid}, with BT: ${nextProcess.BT}.`

    // the minBTprocess is removed from queue, check if there were more processes with same minBT value
    let minBTProcesses = queue.filter((processData) => processData.BT === nextProcess.BT)
    if(minBTProcesses.length){
      // highlighting all the processes with same minBT value present in the queue
      originalIndexes.map((index) => {
        if(data[index].BT === nextProcess.BT)
          data[index].bgColor = {
            BT: highlightResultColor,
            AT: highlightColor
          }
      })
      nextProcess.bgColor = { ...nextProcess.bgColor, AT: highlightResultColor }

      let minATMsg = ` and i.e. ${nextProcess.Pid}, with AT: ${nextProcess.AT}.`

      // checking if there are multiple processes with same min AT and BT.
      let minATProcesses = minBTProcesses.filter((processData) => processData.AT === nextProcess.AT)
      if(minATProcesses.length){
        // highlighting all the processes with same minAT and minBT value
        originalIndexes.map((index) => {
          if(data[index].AT === nextProcess.AT)
            data[index].bgColor = {
              ...data[index].bgColor,
              AT: highlightColor
            }
        })
        nextProcess.bgColor = { ...nextProcess.bgColor, AT: highlightResultColor }

        // changing the msg accordingly
        minATMsg = `.\nAs there are multiple proceses with same minAT value as well, the process that comes first among them in the queue will be chosen and i.e. ${nextProcess.Pid}, with AT: ${nextProcess.AT}.`
      }

      // changing the msg accordingly
      minMsg = `As there are multiple processes present with the same min. BT value: ${nextProcess.BT}, the process with min. AT value among them is chosen${minATMsg}`
    }

    cpu = nextProcess
    updateData(cpu)

    cpuProcessCT = curTime + cpu.BT
    executeProcess()
    pushInSteps(`At ${curTime} time unit, CPU is free.\n${minMsg}\nHence, Process ${cpu.Pid} is assigned to CPU.\nRemaining Time of ${cpu.Pid} in CPU: ${cpu.BT} time unit (BT of P1).`)

    // resetting highlightning back to normal
    originalIndexes.map((index) => {
      data[index].bgColor = {
        AT: 'transparent', BT: 'transparent'
      }
    })
  }


  newData.map((processData) => {
    while(cpu?.Pid && cpuProcessCT < processData.AT){
      // this means that cpu had a process running in it and its completed now
      completeCurrentProcess()

      // cpu is free now so can assign new process to it
      assignProcessToCPU()
    }

    // adding the process to queue
    pushIntoQueue(processData)

    // if cpu is free then assign the process now, no need to wait
    if(! cpu?.Pid) assignProcessToCPU()
  })

  // executing the remaining processes in the queue
  while(queue.length){
    completeCurrentProcess()
    assignProcessToCPU()
  }
  // considering the last process that was running in cpu
  if(cpu?.Pid) {
    completeCurrentProcess()
  }


  // calcualting TAT and WT
  data.map((process) => {
    process.TAT = process.CT - process.AT
    process.bgColor = {
      TAT: highlightResultColor,
      CT: highlightColor,
      AT: highlightColor
    }

    pushInSteps(`Process ${process.Pid} is executed till ${process.CT} time unit (CT).\nProcess ${process.Pid} arrived at ${process.AT} time unit (AT).\nTurn Around Time, TAT = CT - AT.\nTAT of ${process.Pid}: ${process.CT} - ${process.AT} = ${process.TAT}`)

    // resetting bgColor to transparent
    process.bgColor = {
      TAT: 'transparent', CT: 'transparent', AT: 'transparent'
    }
  })
  data.map((process) => {
    process.WT = process.TAT - process.BT
    process.bgColor = {
      WT: highlightResultColor,
      TAT: highlightColor,
      BT: highlightColor
    }

    pushInSteps(`Turn Around Time of Process ${process.Pid} is ${process.TAT} time unit (TAT).\nBurst Time of Process ${process.Pid} is ${process.BT} time unit (BT).\nWaiting Time, WT = TAT - BT.\nWT of ${process.Pid}: ${process.CT} - ${process.AT} = ${process.TAT}`)
    
    // resetting bgColor to transparent
    process.bgColor = {
      WT: 'transparent', TAT: 'transparent', BT: 'transparent'
    }
  })

  data.map((process) => {
    process.bgColor = {
      TAT: highlightColor
    }
  })
  avgTAT = (data.reduce((acc, cur) => acc + cur.TAT, 0) / data.length).toFixed(2)
  pushInSteps(`All the processes are completed.\nAverage TAT: ${avgTAT}`)
  
  data.map((process) => {
    process.bgColor = {
      TAT: 'transparent',
      WT: highlightColor
    }
  })
  avgWT = (data.reduce((acc, cur) => acc + cur.WT, 0) / data.length).toFixed(2)
  pushInSteps(`Average WT: ${avgWT}`)
  
  return steps;
}

export const StepWiseSRJF = (data) => {
  data = createCopyJSON(data) // so that original data is not modified
  data.map((process) => process.RT = process.BT)

  let newData = data.map((processData, index) => {
    return ({
      ...processData,
      originalIndex: index,
    })
  })
  newData.sort((a, b) => a.AT - b.AT)
  
  
  let cpu = {}, queue = [], completed = [], steps = []
  let cpuProcessCT = -1 // required time units count at which process that is currently running in cpu will be completed
  let curTime = 0 // current time units count
  let timeGap = 0, prevBT = 0 // time units passed since last process was added in cpu, prev remaining time of process in cpu
  let avgTAT = 0.0, avgWT = 0.0;
  let minBTProcess = { Pid: null, BT: Number.MAX_SAFE_INTEGER }; // process with min BT in the queue

  const updateData = (newData) => data[newData.originalIndex] = newData
  const pushInSteps = (msg) => {
    steps.push({
      cpu: createCopyJSON(cpu),
      queue: createCopyJSON(queue),
      completed: createCopyJSON(completed),
      curTime,
      data: createCopyJSON(data),
      msg,
      avgTAT,
      avgWT,
      ganttChartData: []
    })

    let newGanttChartData = createGanttChartData(steps)
    steps[steps.length - 1].ganttChartData = newGanttChartData;
  }
  const executeProcess = () => {
    prevBT = cpu.BT
    cpu.RT = cpu.BT = cpuProcessCT - curTime
    timeGap = prevBT - cpu.BT

    if(! cpu.BT){
      // that means the process has completed
      cpu.CT = curTime
    }
    updateData(cpu)
  }
  const pushIntoQueue = (processData) => {
    curTime = processData.AT
    queue.push(processData)
    if(minBTProcess.BT > processData.BT) minBTProcess = processData

    let isExecuted = ! compareArraysOrJSONs(cpu, {})
    if(isExecuted){
      // this means that cpu had a process running in it so lets execute the process
      executeProcess()
    }

    pushInSteps(`At ${curTime} time unit, Process ${processData.Pid} is arrived & is added to queue.${isExecuted? `\nRemaining Time of ${cpu.Pid} in CPU: ${prevBT} - ${timeGap} (timeGap) = ${cpu.BT} time unit.`: ''}`)
  }
  const findMinBTProcess = () => {
    if(queue.length) minBTProcess = queue.reduce((prev, cur) => prev.BT < cur.BT ? prev : cur) 
    else minBTProcess = { Pid: null, BT: Number.MAX_SAFE_INTEGER }
  }
  const getNextProcessToAssignFromQueue = () => {
    let nextProcess = minBTProcess

    // Remove the minBTProcess from the queue
    queue = queue.filter((processData) => processData.Pid !== nextProcess.Pid);

    // Find the next process with the minimum BT value in the queue
    findMinBTProcess()

    return nextProcess;
  }
  const assignProcessToCPU = () => {
    if(! queue.length){
      // console.log("Cannot assign process to cpu: Queue is Emtpy");
      cpuProcessCT = -1
      return;
    }

    // Highlighting the orginal Indexes of the elements present in queue
    let originalIndexes = []
    queue.map((processData) => originalIndexes.push(processData.originalIndex))
    originalIndexes.map((index) => {
      data[index].bgColor = {
        BT: highlightColor
      }
    })

    // picking up the next process
    const nextProcess = getNextProcessToAssignFromQueue()
    nextProcess.bgColor = { BT: highlightResultColor }

    // initialising the msg according to current situation
    let minMsg = `The process with min. BT value among all other processes in queue is ${nextProcess.Pid}, with BT: ${nextProcess.BT}.`

    // the minBTprocess is removed from queue, check if there were more processes with same minBT value
    let minBTProcesses = queue.filter((processData) => processData.BT === nextProcess.BT)
    if(minBTProcesses.length){
      // highlighting all the processes with same minBT value present in the queue
      originalIndexes.map((index) => {
        if(data[index].BT === nextProcess.BT)
          data[index].bgColor = {
            BT: highlightResultColor,
            AT: highlightColor
          }
      })
      nextProcess.bgColor = { ...nextProcess.bgColor, AT: highlightResultColor }

      // initialising another msg according to current situation
      let minATMsg = ` and i.e. ${nextProcess.Pid}, with AT: ${nextProcess.AT}.`

      // checking if there are multiple processes with same min AT and BT.
      let minATProcesses = minBTProcesses.filter((processData) => processData.AT === nextProcess.AT)
      if(minATProcesses.length){
        // highlighting all the processes with same minAT and minBT value
        originalIndexes.map((index) => {
          if(data[index].AT === nextProcess.AT)
            data[index].bgColor = {
              ...data[index].bgColor,
              AT: highlightColor
            }
        })
        nextProcess.bgColor = { ...nextProcess.bgColor, AT: highlightResultColor }

        // updating the msg accordingly
        minATMsg = `.\nAs there are multiple proceses with same minAT value as well, the process that comes first among them in the queue will be chosen and i.e. ${nextProcess.Pid}, with AT: ${nextProcess.AT}.`
      }

      // updating the msg accordingly
      minMsg = `As there are multiple processes present with the same min. BT value: ${nextProcess.BT}, the process with min. AT value among them is chosen${minATMsg}`
    }

    cpu = nextProcess
    updateData(cpu)

    cpuProcessCT = curTime + cpu.BT
    executeProcess()
    pushInSteps(`At ${curTime} time unit, CPU is free.\n${minMsg}\nHence, Process ${cpu.Pid} is assigned to CPU.\nRemaining Time of ${cpu.Pid} in CPU: ${cpu.BT} time unit (BT of P1).`)

    // resetting highlightning back to normal
    originalIndexes.map((index) => {
      data[index].bgColor = {
        AT: 'transparent', BT: 'transparent'
      }
    })
  }
  const checkForPrempt = () => {
    if(!cpu?.Pid || cpu.BT <= minBTProcess.BT) return;
    // else premption is needed

    let preemptedProcess = cpu
    cpu = getNextProcessToAssignFromQueue()
    cpuProcessCT = curTime + cpu.BT
    
    queue.push(preemptedProcess)
    findMinBTProcess()

    // highlighting the preempted and the current cpu process
    data[preemptedProcess.originalIndex].bgColor = { Pid: highlightColor }
    data[cpu.originalIndex].bgColor = { Pid: highlightResultColor, AT: highlightResultColor, BT: highlightResultColor }

    pushInSteps(`At ${curTime} time unit, Process ${preemptedProcess.Pid} is preempted from CPU and added to Queue again and process ${cpu.Pid} is assigned to CPU.\nRemaining Time of ${preemptedProcess.Pid}: ${prevBT} - ${timeGap} (timeGap) = ${preemptedProcess.BT} time unit.\nRemaining Time of ${cpu.Pid} in CPU: ${cpu.BT} time unit (BT of ${cpu.Pid}).`)

    // resetting the highlighting back to normal
    data[preemptedProcess.originalIndex].bgColor = { BT: 'transparent' }
    data[cpu.originalIndex].bgColor = { AT: 'transparent', BT: 'transparent' }
  }
  const completeCurrentProcess = () => {
    if (! cpu?.Pid) {
      // console.log('Cannot complete current process: CPU is empty')
      return;
    }

    let cpuBT = cpu.BT
    curTime += Math.min(cpuBT, minBTProcess.BT)
    executeProcess() // will change the cpu.BT according to the curTime
    
    if (cpuBT <= minBTProcess.BT) {
      // means the cpu process is completely executed
      completed.push(cpu.Pid)
      let completedProcessID = cpu.Pid
      cpu = {}
      pushInSteps(`At ${curTime} time unit, Process ${completedProcessID} is completed.`)
    } else {
      // this means that the process that is currently running in cpu is not the one with min BT value
      // so we need to preempt the current process and assign the process with min BT value to cpu
      checkForPrempt()
    }
  }


  newData.map((processData) => {
    while(cpu?.Pid && curTime + Math.min(cpu.BT, minBTProcess.BT) < processData.AT){
      // this means that cpu had a process running in it and its completed now
      completeCurrentProcess()

      // cpu is free now so can assign new process to it
      assignProcessToCPU()
    }

    // adding the process to queue
    pushIntoQueue(createCopyJSON(processData))

    checkForPrempt()
    if (! cpu?.Pid) { 
      // means cpu is free so assign the next process
      assignProcessToCPU() 
    }
  })

  // executing the remaining processes in the queue
  while(queue.length){
    completeCurrentProcess()
    assignProcessToCPU()
  }
  // considering the last process that was running in cpu
  if(cpu?.Pid) {
    completeCurrentProcess()
  }

  // resetting the BT for all the processes for calculating the TAT and WT correctly.
  newData.map((process) => data[process.originalIndex].BT = process.BT)

  // calcualting TAT and WT
  data.map((process) => {
    process.TAT = process.CT - process.AT
    process.bgColor = {
      TAT: highlightResultColor,
      CT: highlightColor,
      AT: highlightColor
    }

    pushInSteps(`Process ${process.Pid} is executed till ${process.CT} time unit (CT).\nProcess ${process.Pid} arrived at ${process.AT} time unit (AT).\nTurn Around Time, TAT = CT - AT.\nTAT of ${process.Pid}: ${process.CT} - ${process.AT} = ${process.TAT}`)

    // resetting bgColor to transparent
    process.bgColor = {
      TAT: 'transparent', CT: 'transparent', AT: 'transparent'
    }
  })
  data.map((process) => {
    process.WT = process.TAT - process.BT
    process.bgColor = {
      WT: highlightResultColor,
      TAT: highlightColor,
      BT: highlightColor
    }

    pushInSteps(`Turn Around Time of Process ${process.Pid} is ${process.TAT} time unit (TAT).\nBurst Time of Process ${process.Pid} is ${process.BT} time unit (BT).\nWaiting Time, WT = TAT - BT.\nWT of ${process.Pid}: ${process.CT} - ${process.AT} = ${process.TAT}`)
    
    // resetting bgColor to transparent
    process.bgColor = {
      WT: 'transparent', TAT: 'transparent', BT: 'transparent'
    }
  })

  data.map((process) => {
    process.bgColor = {
      TAT: highlightColor
    }
  })
  avgTAT = (data.reduce((acc, cur) => acc + cur.TAT, 0) / data.length).toFixed(2)
  pushInSteps(`All the processes are completed.\nAverage TAT: ${avgTAT}`)
  
  data.map((process) => {
    process.bgColor = {
      TAT: 'transparent',
      WT: highlightColor
    }
  })
  avgWT = (data.reduce((acc, cur) => acc + cur.WT, 0) / data.length).toFixed(2)
  pushInSteps(`Average WT: ${avgWT}`)
  
  return steps;
}