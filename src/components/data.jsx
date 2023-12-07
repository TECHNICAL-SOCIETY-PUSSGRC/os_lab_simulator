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

export const OSAlgorithms = () => {
  return [
    {
      "name": "FCFS",
      "description": "First-Come-First-Serve: Schedules processes in the order they arrive for execution..."
    },
    {
      "name": "SJF",
      "description": "Shortest Job First: Schedules the process with the shortest burst time first..."
    },
    {
      "name": "SRJF",
      "description": "Shortest Remaining Job First: A preemptive version of SJF, where  process ..."
    },
    {
      "name": "RR",
      "description": "Round Robin: Allocates a fixed time slice (quantum) to each process in a cyclic manner..."
    },
    {
      "name": "Priority",
      "description": "Priority Scheduling: Assigns priority levels to processes, scheduling higher-priority... "
    },
    {
        "name": "MLQ",
        "description": "Multilevel Queue Scheduling: Divides processes into multiple priority levels ..."
    }
  ]
}

export const sortingALgo=()=>{
  return [
    {
      "name": "Bubble Sort",
      "description": "A simple sorting algorithm that repeatedly steps through the list, compares... "
    },
    {
      "name": "QuickSort",
      "description": "An efficient divide-and-conquer sorting algorithm that works by selecting a 'pivot'..."
    },
    {
      "name": "Merge Sort",
      "description": "A divide-and-conquer sorting algorithm that divides the input array into..."
    },
    {
      "name": "Heap Sort",
      "description": "A comparison-based sorting algorithm that uses a binary heap data structure..."
    }
  ]
}

export const searchingAlgo=()=>{
    return [
      {
        "name": "Binary Search",
        "description": "A search algorithm that finds the position of a target value within a sorted array..."
      },
      {
        "name": "Depth-First Search (DFS)",
        "description": "An algorithm for traversing or searching tree or graph data structures..."
      },
      {
        "name": "Breadth-First Search (BFS)",
        "description": "An algorithm for traversing or searching tree or graph data structures. It explores..."
      },
      {
        "name": "Dijkstra's Algorithm",
        "description": "A shortest-path algorithm that finds the shortest path between two nodes in a graph..."
      },
      {
        "name": "Linear Search",
        "description": "A simple search algorithm that sequentially checks each element of a list until... "
      }
    ]
}

export const dpAlgo=()=>{
  return [
    {
      "name": "Longest Common Subsequence (LCS)",
      "description": "A problem in dynamic programming that finds the length of the longest subsequence common ..."
    },
    {
      "name": "Knapsack Problem",
      "description": "A problem in combinatorial optimization and dynamic programming that models a knapsack with a fixed..."
    },
    {
      "name": "Fibonacci Sequence",
      "description": "A series of numbers in which each number is the sum of the two preceding ones, often..."
    },
    {
      "name": "Matrix Chain Multiplication",
      "description": "A problem in dynamic programming that finds the most efficient way to multiply a given..."
    }
  ]
}

export const btAlgo=()=>{
  return[
    {
      "name": "N-Queens Problem",
      "description": "A classic problem in which the goal is to place N chess queens on an N X N chessboard..."
    },
    {
      "name": "Sudoku Solver",
      "description": "An algorithm for solving Sudoku puzzles by backtracking and trying out different possibilities."
    },
    {
      "name": "Hamiltonian Cycle",
      "description": "A problem in graph theory that asks whether a Hamiltonian cycle exists in a given graph..."
    },
    {
      "name": "Subset Sum Problem",
      "description": "A decision problem in combinatorics and computer science that asks whether there exists..."
    }
  ]
}

export const graphAlgo=()=>{
  return[      
    {
      "name": "Dijkstra's Algorithm",
      "description": "A shortest-path algorithm that finds the shortest path between two nodes in a graph... "
    },
    {
      "name": "Bellman-Ford Algorithm",
      "description": "A single-source shortest path algorithm that can handle negative edge weights.... "
    },
    {
      "name": "Floyd-Warshall Algorithm",
      "description": "An algorithm for finding shortest paths in a weighted graph with positive or... "
    },
    {
      "name": "Prim's Algorithm",
      "description": "A greedy algorithm that finds a minimum spanning tree for a weighted undirected... "
    },
    {
      "name": "Kruskal's Algorithm",
      "description": "A greedy algorithm that finds a minimum spanning tree for a connected, undirected graph... "
    },
  ]
}

export const aiAlgo=()=>{
    return[
        {
			"name": "A* Search Algorithm",
			"description": "A best-first search algorithm that uses a heuristic to efficiently find ..."
		},	
		{
			"name": "Decision Trees",
			"description": "A decision support tool that uses a tree-like model of decisions and their possible consequences..."
		},
		{
			"name": "K-Nearest Neighbors",
			"description": "A non-parametric classification algorithm that is used for both classification and..."
		},
		{
			"name": "Artificial Neural Networks",
			"description": "A computational model inspired by the structure and functioning of the human brain..."
		},
		{
			"name": "K-Means Clustering",
			"description": "A type of unsupervised learning algorithm used for clustering or partitioning data..."
		},
		{
			"name": "Genetic Algorithms",
			"description": "A heuristic search algorithm inspired by the process of natural selection, used for..."
		},
		{
			"name": "NLP",
			"description": "A field of AI that focuses on the interaction between computers and humans using... "
		},
         
    ]
}

export const createCopyJSON = (data) => JSON.parse(JSON.stringify(data))
export const compareArraysOrJSONs = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b)
}

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
    } else{
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

  const updateData = (newData) => data[newData.originalIndex] = newData
  const pushInSteps = (msg) => {
    steps.push({
      cpu: createCopyJSON(cpu),
      queue: createCopyJSON(queue),
      completed: createCopyJSON(completed),
      curTime,
      data: createCopyJSON(data),
      msg
    })
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
  const assignProcessToCPU = (processData) => {
    if(! queue.length){
      console.log("Cannot assign process to cpu: Queue is Emtpy");
      return;
    }

    cpu = queue.shift()
    cpuProcessCT = curTime + cpu.BT
    executeProcess()
    pushInSteps(`At ${curTime} time unit, CPU is free so Process ${cpu.Pid} is assigned to CPU.\nRemaining Time of ${cpu.Pid} in CPU: ${cpu.BT} time unit (BT of P1).`)
  }


  newData.map((processData) => {
    if(processData.AT >= cpuProcessCT) {
      if(cpuProcessCT !== -1) {
        // this means that cpu really had a process running in it and its completed now
        completeCurrentProcess()
      }
      // cpu is free now

      // adding the process to queue, so that when cpu gets free, it can pick up the process from queue
      pushIntoQueue(processData)

      // there are processes in the queue, so pick up the first one and assign it to cpu
      assignProcessToCPU()
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
      TAT: '#008F5A',
      CT: '#6082B6',
      AT: '#6082B6'
    }

    pushInSteps(`Process ${process.Pid} is executed till ${process.CT} time unit (CT).\nProcess ${process.Pid} arrived at ${process.AT} time unit (AT).\nTAT = CT - AT.\nTAT of ${process.Pid}: ${process.CT} - ${process.AT} = ${process.TAT}`)

    // resetting bgColor to transparent
    process.bgColor = {
      TAT: 'transparent', CT: 'transparent', AT: 'transparent'
    }
  })
  data.map((process) => {
    process.WT = process.TAT - process.BT
    process.bgColor = {
      WT: '#008F5A',
      TAT: '#6082B6',
      BT: '#6082B6'
    }

    pushInSteps(`Turn Around Time of Process ${process.Pid} is ${process.TAT} time unit (TAT).\nBurst Time of Process ${process.Pid} is ${process.BT} time unit (BT).\nWT = TAT - BT.\nWT of ${process.Pid}: ${process.CT} - ${process.AT} = ${process.TAT}`)
    
    // resetting bgColor to transparent
    process.bgColor = {
      WT: 'transparent', TAT: 'transparent', BT: 'transparent'
    }
  })
  return steps;
}
