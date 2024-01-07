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

  steps.forEach(({ cpu, curTime }) => {
    if(isCPUFree && cpu.Pid){
      // means the cpu was free but now there's a process that started running in it
      isCPUFree = false;

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

// this is wrong.
export const FCFS = (data) => {
  data = createCopyJSON(data)

  let newData = data.map((processData, index) => {
    return ({
      ...processData,
      CT: undefined, TAT: undefined, WT: undefined, // filling empty data
      originalIndex: index,
    })
  })
  newData.sort((a, b) => Number(a.AT) - Number(b.AT))

  let cpu = {}, queue = [], completed = []
  let cpuProcessCT = -1 // required time units count at which process that is currently running in cpu will be completed
  let curTime = 0 // current time units count

  newData.map((processData, index) => {
    if(processData.AT >= cpuProcessCT) {
      if(cpuProcessCT !== -1) {
        // this means that cpu really had a process running in it and its completed now
        curTime = cpuProcessCT
        completed.push(cpu)
        cpu = {}
      }
      // cpu is free now

      // adding the process to queue, so that when cpu gets free, it can pick up the process from queue
      curTime = processData.AT
      queue.push(processData)

      // there are processes in the queue, so pick up the first one and assign it to cpu
      cpu = queue.shift()
      cpuProcessCT = processData.AT + cpu.BT // new cpuProcessCT
      cpu.CT = cpuProcessCT
    } else {
      // cpu is busy so wait for it to get free
      curTime = processData.AT
      queue.push(processData)
    }
  })

  // executing the remaining processes in the queue
  while(queue.length){
    curTime = cpuProcessCT
    completed.push(cpu)
    cpu = {}

    cpu = queue.shift()
    cpuProcessCT = curTime + cpu.BT
    cpu.CT = cpuProcessCT
  }

  newData.map((process) => {
    process.TAT = Number(process.CT) - Number(process.AT)
    process.WT = Number(process.TAT) - Number(process.BT)
    data[process.originalIndex] = process
  })
  return data
}

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
    while(cpuProcessCT !== -1 && cpuProcessCT <= processData.AT){
      // this means that cpu had a process running in it and its completed now
      completeCurrentProcess()

      // cpu is free now so can assign new process to it
      assignProcessToCPU()
    }

    // adding the process to queue
    pushIntoQueue(processData)

    // if cpu is free then assign the process now, no need to wait
    if(cpuProcessCT === -1) assignProcessToCPU()
  })

  // executing the remaining processes in the queue
  while(queue.length){
    completeCurrentProcess()
    assignProcessToCPU()
  }
  // considering the last process that was running in cpu
  if(cpuProcessCT !== -1) {
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
    // Find the process with the minimum BT value in the queue
    let minBTProcess = queue[0];
    queue.map((processData) => {
      if(processData.BT < minBTProcess.BT) minBTProcess = processData;
    })

    // Remove the minBTProcess from the queue
    queue = queue.filter((processData) => processData !== minBTProcess);
    
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
      // highlighting all the processes with same minBT value
      originalIndexes.map((index) => {
        if(data[index].BT === nextProcess.BT)
          data[index].bgColor = {
            BT: highlightResultColor,
            AT: highlightColor
          }
      })
      nextProcess.bgColor = { ...nextProcess.bgColor, AT: highlightResultColor }

      // changing the msg accordingly
      minMsg = `As there are multiple processes present with the same min. BT value: ${nextProcess.BT}, the process with min. AT value among them is chosen and i.e. ${nextProcess.Pid}, with AT: ${nextProcess.AT}.`
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
    while(cpuProcessCT !== -1 && cpuProcessCT <= processData.AT){
      // this means that cpu had a process running in it and its completed now
      completeCurrentProcess()

      // cpu is free now so can assign new process to it
      assignProcessToCPU()
    }

    // adding the process to queue
    pushIntoQueue(processData)

    // if cpu is free then assign the process now, no need to wait
    if(cpuProcessCT === -1) assignProcessToCPU()
  })

  // executing the remaining processes in the queue
  while(queue.length){
    completeCurrentProcess()
    assignProcessToCPU()
  }
  // considering the last process that was running in cpu
  if(cpuProcessCT !== -1) {
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

export const StepWiseSJRF = (data) => {
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
  let minRTProcess = null; // the process with min. RT in the queue

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
    // Find the process with the minimum BT value in the queue
    let minBTProcess = queue[0];
    queue.map((processData) => {
      if(processData.BT < minBTProcess.BT) minBTProcess = processData;
    })

    // Remove the minBTProcess from the queue
    queue = queue.filter((processData) => processData !== minBTProcess);
    
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
      // highlighting all the processes with same minBT value
      originalIndexes.map((index) => {
        if(data[index].BT === nextProcess.BT)
          data[index].bgColor = {
            BT: highlightResultColor,
            AT: highlightColor
          }
      })
      nextProcess.bgColor = { ...nextProcess.bgColor, AT: highlightResultColor }

      // changing the msg accordingly
      minMsg = `As there are multiple processes present with the same min. BT value: ${nextProcess.BT}, the process with min. AT value among them is chosen and i.e. ${nextProcess.Pid}, with AT: ${nextProcess.AT}.`
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
    if(processData.AT >= Math.min(cpuProcessCT, minRTProcess.RT)) {



      // if(cpuProcessCT !== -1) {
      //   // this means that cpu really had a process running in it and its completed now
      //   completeCurrentProcess()
      // }
      // // cpu is free now

      // // adding the process to queue, so that when cpu gets free, it can pick up the process from queue
      // pushIntoQueue(processData)

      // // there are processes in the queue, so pick up the first one and assign it to cpu
      // assignProcessToCPU()
    } else{
      // cpu is busy so wait for it to get free
      pushIntoQueue(processData)
    }
  })


  // executing the remaining processes in the queue
  while(queue.length){
    completeCurrentProcess()
    assignProcessToCPU()
  }
  // considering the last process that was running in cpu
  if(cpuProcessCT !== -1) {
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