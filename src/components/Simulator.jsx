import { useState, useRef, useEffect, useMemo } from "react"
import { Table, ShinyButton } from '.'
import AlgorithmsData from '../assets/DataFiles/AlgorithmsData'
import { SampleData, StepWiseFCFS } from './data'

const Simulator = () => {
  const columnsBeforeRunning = useMemo(() => [
    { Header: 'Process ID (Pid)', accessor: 'Pid' },
    { Header: 'Arrival Time (AT)', accessor: 'AT'},
    { Header: 'Burst Time (BT)', accessor: 'BT' },
  ], [])
  const columnsWhileRunning = useMemo(() => [
    { Header: 'Process ID (Pid)', accessor: 'Pid' },
    { Header: 'Arrival Time (AT)', accessor: 'AT'},
    { Header: 'Burst Time (BT)', accessor: 'BT' },
    { Header: 'Completion Time (CT)', accessor: 'CT'},
    { Header: 'Turnaround Time (TAT)', accessor: 'TAT'},
    { Header: 'Waiting Time (WT)', accessor: 'WT' },
  ], [])

  const algoOptionsRef = useRef(null)
  const algoRef = useRef(null)

  const [isAlgoOpen, setIsAlgoOpen] = useState(false)
  const [algo, setAlgo] = useState('FCFS')
  const [noOfProcesses, setNoOfProcesses] = useState(SampleData().length)
  const [contextSwitchTime, setContextSwitchTime] = useState(0.0)
  const [data, setData] = useState(SampleData)
  const [isRunning, setIsRunning] = useState(false)
  const [animateShine, setAnimateShine] = useState(false)
  const [animateOpacity, setAnimateOpacity] = useState(false)
  const [queue, setQueue] = useState([{ Pid: 'Pid', AT: 'AT'}])
  const [stack, setStack] = useState(['Pid'])
  const [cpu, setCPU] = useState({Pid: 'Pid', RT: 'RT'})
  const [currentTime, setCurrentTime] = useState(0)
  const [isCPUFree, setIsCPUFree] = useState(false)
  const [isQueueEmpty, setIsQueueEmpty] = useState(false)
  const [isStackEmpty, setIsStackEmpty] = useState(false)
  const [animateTime, setAnimateTime] = useState(false)
  const [explanationMessage, setExplanationMessage] = useState([''])
  const [animateMessage, setAnimateMessage] = useState(false)
  const [steps, setSteps] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(-1) 

  /* Helper Functions */
  const handleAnimateOpacity = () => {
    setAnimateOpacity(true)
    const timeoutId = setTimeout(() => setAnimateOpacity(false), 500)
    return () => clearTimeout(timeoutId);
  }
  const processExplanationMessage = (msg) => {
    return msg.split("\n")
  }

  /* Functionalities Functions */
  const handleChangeAlgoClick = () => {
    if(isRunning) return; // if simulation is running, then don't allow to change the algo
    setIsAlgoOpen(true);
  }
  const handleChangeAlgo = (e) => {
    setAlgo(e.target.value)
    setIsAlgoOpen(false);
  }
  const handleContextTimeChange = (e) => {
    setContextSwitchTime(e.target.value)
  }
  const handleFillSampleData = () => {
    const sampleData = SampleData()
    setData(sampleData)
    setNoOfProcesses(sampleData.length)

    handleAnimateOpacity()
  }
  const handleFillRandomData = () => {
    const newData = []
    for(let i=0; i<noOfProcesses; i++){
      newData.push({
        Pid: "P" + (i+1),
        AT: Math.floor(Math.random() * 10),
        BT: Math.floor(Math.random() * 10)
      })
    }
    setData(newData)

    handleAnimateOpacity();
  }
  const handleAddProcess = () => {
    const newData = [...data]
    newData.push({
      Pid: "P" + (newData.length+1),
      AT: 0,
      BT: 0
    })
    setData(newData)
    setNoOfProcesses(newData.length)
  }
  const handleReset = () => {
    setData([])
    setNoOfProcesses(0)
    setIsRunning(false)
    setCurrentTime(0)
    setCPU({Pid: 'Pid', RT: 'RT'})
    setQueue([{ Pid: 'Pid', AT: 'AT'}])
    setStack(['Pid'])
    setExplanationMessage([''])
  }
  const handleRun = () => {
    data.map((process, index) => {
      if(process.Pid === '') process.Pid = 'P' + (index+1)
      process.AT = (process.AT === '')? 0: parseInt(process.AT)
      process.BT = (process.BT === '')? 0: parseInt(process.BT)

      // filling empty data
      process.CT = process.TAT = process.WT = null 
      process.bgColor = {
        Pid: 'transparent', AT: 'transparent', BT: 'transparent', CT: 'transparent', TAT: 'transparent', WT: 'transparent'
      }
    })

    setIsRunning(true)
    setSteps(StepWiseFCFS(data))
    console.log(StepWiseFCFS(data))
    handleAnimateOpacity()
  }
  const handleNext = () => {
    if(currentStepIndex === steps.length-1) return;

    const newStepIndex = currentStepIndex + 1
    setCurrentStepIndex(newStepIndex)

    const { cpu: newCPU, queue: newQueue, completed: newStack, curTime, data: newData, msg } = steps[newStepIndex]
    setExplanationMessage(processExplanationMessage(msg))

    if(JSON.stringify(cpu) !== JSON.stringify(newCPU)) setCPU(newCPU)
    if(JSON.stringify(queue) !== JSON.stringify(newQueue)) setQueue(newQueue)
    if(JSON.stringify(stack) !== JSON.stringify(newStack)) setStack(newStack)

    setCurrentTime(curTime)
    if(JSON.stringify(data) !== JSON.stringify(newData)) setData(newData)
  }
  const handlePrev = () => {
    if(currentStepIndex === -1) return;

    const newStepIndex = currentStepIndex - 1
    setCurrentStepIndex(newStepIndex)
    
    if(newStepIndex == -1){
      setExplanationMessage([''])
      setCurrentTime(0)
      setCPU({ Pid: 'Pid', RT: 'RT'})
      setQueue([{ Pid: 'Pid', AT: 'AT'}])
      setStack(['Pid'])
      return;
    }

    const { cpu: newCPU, queue: newQueue, completed: newStack, curTime, data: newData, msg } = steps[newStepIndex]
    setExplanationMessage(processExplanationMessage(msg))

    if(JSON.stringify(cpu) !== JSON.stringify(newCPU)) setCPU(newCPU)
    if(JSON.stringify(queue) !== JSON.stringify(newQueue)) setQueue(newQueue)
    if(JSON.stringify(stack) !== JSON.stringify(newStack)) setStack(newStack)

    setCurrentTime(curTime)
    if(JSON.stringify(data) !== JSON.stringify(newData)) setData(newData)
  }
  const handleShowFinalResult = () => {
    const newStepIndex = steps.length-1
    setCurrentStepIndex(newStepIndex)

    const { cpu: newCPU, queue: newQueue, completed: newStack, curTime, data: newData, msg } = steps[newStepIndex]
    setExplanationMessage(processExplanationMessage(msg))

    if(JSON.stringify(cpu) !== JSON.stringify(newCPU)) setCPU(newCPU)
    if(JSON.stringify(queue) !== JSON.stringify(newQueue)) setQueue(newQueue)
    if(JSON.stringify(stack) !== JSON.stringify(newStack)) setStack(newStack)

    setCurrentTime(curTime)

    if(JSON.stringify(data) !== JSON.stringify(newData)) setData(newData)
    handleAnimateOpacity()
  }
  const handleRestart = () => {
    setCurrentStepIndex(-1)
    setExplanationMessage([''])
    setCurrentTime(0)
    setCPU({ Pid: 'Pid', RT: 'RT'})
    setQueue([{ Pid: 'Pid', AT: 'AT'}])
    setStack(['Pid'])

    const { data: newData } = steps[0]
    if(JSON.stringify(data) !== JSON.stringify(newData)) setData(newData)
  }

  useEffect(() => {
    if(algoOptionsRef.current === null) return;

    if(isAlgoOpen){
      algoOptionsRef.current.style.maxHeight = "180px"
      algoOptionsRef.current.style.maxWidth = "550px"
    }else{
      algoOptionsRef.current.style.maxHeight = "32px"
      algoOptionsRef.current.style.maxWidth = "125px"
    }
  }, [isAlgoOpen])

  useEffect(() => {
    setAnimateShine(true);
    const timeoutId = setTimeout(() => setAnimateShine(false), 1000);
    return () => clearTimeout(timeoutId);
  }, [noOfProcesses]);

  useEffect(() => {
    setIsCPUFree(true)
    const timeoutId = setTimeout(() => setIsCPUFree(false), 1000)
    return () => clearTimeout(timeoutId)
  }, [cpu])

  useEffect(() => {
    setIsQueueEmpty(true)
    const timeoutId = setTimeout(() => setIsQueueEmpty(false), 1000)
    return () => clearTimeout(timeoutId)
  }, [queue])

  useEffect(() => {
    setIsStackEmpty(true)
    const timeoutId = setTimeout(() => setIsStackEmpty(false), 1000)
    return () => clearTimeout(timeoutId)
  }, [stack])

  useEffect(() => {
    setAnimateTime(true)
    const timeoutId = setTimeout(() => setAnimateTime(false), 1000)
    return () => clearTimeout(timeoutId)
  }, [currentTime])

  useEffect(() => {
    setAnimateMessage(true)
    const timeoutId = setTimeout(() => setAnimateMessage(false), 500)
    return () => clearTimeout(timeoutId)
  }, [explanationMessage])

  // useEffect(() => console.log("data: ", data), [data])


  return (
    <div className="text-white text-center">
      <h1 className="text-4xl">CPU Scheduling Simulator</h1>

      {/* AlgoSelect Section */}
      <div className="mt-3 flex flex-row justify-center gap-5">
        <h1 className="text-2xl">Algo: </h1>

        <div ref={algoOptionsRef} className="flex flex-col border border-r-0 border-t-0 transition-all ease-in-out duration-1000 max-h-[32px] max-w-[125px] overflow-hidden">
          {
            isAlgoOpen?
              AlgorithmsData.map(({name, value}, index) => {
                return (
                  <button key={index} className="text-xl pl-2 pr-3 py-1 text-left" value={value} onClick={handleChangeAlgo}>
                    • {name}
                  </button>
                )
              })
            :
              <button ref={algoRef} className="relative flex text-2xl px-2 items-center w-[550px] h-[180px] group overflow-hidden" onClick={handleChangeAlgoClick}>
                {algo}

                {/* down arrow sign */}
                <div className="absolute left-[108px] border-dashed border-4 border-r-transparent border-l-transparent border-b-0 w-0 h-0" />  
               </button>
          }
        </div>
      </div>

      {isRunning && <div className="mt-10 mx-10 flex flex-row text-2xl gap-24 items-center">
        {/* Current Time */}
        <div className="flex flex-row py-3 px-5 gap-4">
          <div className="flex flex-col group">
            <span> Current Time: </span>
            <div className={`h-[2px] bg-white transition-all duration-1000 ease-in-out ${animateTime && 'animate-line'}`} />
          </div>
          <span> {currentTime} </span>
        </div>
        
        {/* Explanation Section */}
        <div className="flex justify-center items-center w-[800px] overflow-hidden text-xl tracking-widest">
          <div className={`px-6 py-6 transition-opacity duration-500 ease-in-out ${animateMessage? 'opacity-0 border-0': 'opacity-100 border'}`}>         
            {explanationMessage.map((msg, index) => <p key={index}> {msg} </p>)}
          </div>
        </div>
      </div>}

      <div className="w-full flex flex-row pl-5 pt-10 gap-16">
        {isRunning?
          <div className="flex flex-col gap-10">
            {/* CPU Section */}
            <div className={`w-[200px] ${cpu.Pid? 'h-[120px]': 'h-[75px]'} border flex flex-col px-5 ${isCPUFree? 'max-h-[70px]': 'max-h-[120px]'} transition-all duration-1000 ease-in-out`}>
              <h2 className="text-2xl border-b-2 py-2">CPU</h2>

              {
                cpu.Pid && <div className={`flex flex-row items-center justify-evenly h-full text-xl
                transition-opacity duration-1000 ease-in-out ${isCPUFree? 'opacity-0': 'opacity-100'}`}>
                  <span> {cpu.Pid} </span>
                  <span> : </span>
                  <span> {cpu.RT} </span>
                </div>
              }
            </div>

            {/* Queue Section */}
            <div className={`h-fit border flex flex-col px-3 max-h-[${isQueueEmpty? '70px': '500px'}] transition-all duration-1000 ease-in-out`}>
              <h2 className="text-2xl border-b-2 py-2 uppercase tracking-wide">Queue</h2>
              <div className="flex flex-col py-3 gap-3 text-xl">
                {
                  queue.map(({ Pid, AT}, index) => {
                    return (
                      <div key={index} className={`flex flex-row items-center justify-evenly text-xl transition-opacity duration-1000 ease-in-out ${isQueueEmpty? 'opacity-0': 'opacity-100'}`}>
                        <span> {Pid} </span>
                        <span> : </span>
                        <span> {AT} </span>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        :  
          /* Simulator Sidebar Before Running */
          <div className="flex flex-col gap-5 my-auto border p-5 justify-center items-center text-left text-2xl">
            <div className="relative group overflow-hidden">
              Total No. of Processes: {noOfProcesses}

              {/* Shiny div */}
              <div className={`absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 ${animateShine? 'animate-shine': ''}`} />
            </div>
            
            <div className="flex flex-row items-center">
              Context Switch Time:
              <input 
                type="number" 
                name="contextSwitchTime"
                min={0.0}
                step={0.1} 
                value={contextSwitchTime} 
                onChange={handleContextTimeChange} 
                className="ml-2 px-2 w-[100px] text-center bg-transparent border-b-2 focus:outline-none"
              />
            </div>
            
            <ShinyButton 
              className="text-left border-b-2 w-fit"
              text="Fill Sample Data"
              onClick={handleFillSampleData}
            />
            <ShinyButton 
              className="text-left border-b-2 w-fit"
              text="Fill Random Data"
              onClick={handleFillRandomData}
            />
            <ShinyButton 
              className="text-left border-b-2 w-fit"
              text="Add Process"
              onClick={handleAddProcess}
            />
          </div> 
        }

        <div className="flex flex-col flex-grow-[1] gap-10">
          {/* Table */}
          <Table 
            data={data} 
            setData={setData} 
            setNoOfProcesses={setNoOfProcesses} 
            animateOpacity={animateOpacity} 
            isRunning={isRunning}
            columns={isRunning? columnsWhileRunning: columnsBeforeRunning}
          />

          {/* Simulation Buttons Section While Running */}
          {isRunning && <div className="flex flex-row justify-between w-[800px] mx-auto">
            <div className="flex flex-row gap-5">
              <ShinyButton 
                className="text-xl border px-3 py-2"
                text="Show Final Result"
                onClick={handleShowFinalResult}
              />
              <ShinyButton 
                className="text-xl border px-3 py-2"
                text="Reset"
                onClick={handleReset}
              />
              <ShinyButton 
                className="text-xl border px-3 py-2"
                text="Restart"
                onClick={handleRestart}
              />
            </div>

            <div className="flex flex-row gap-5">
              <ShinyButton 
                className="text-xl border px-3 py-2"
                text="Prev"
                onClick={handlePrev}
              />
              <ShinyButton 
                className="text-xl border px-3 py-2"
                text="Next"
                onClick={handleNext}
              />
            </div>
          </div>}
        </div>
        
        {/* Completed Stack Section */}
        {isRunning && <div className={`mr-5 w-[200px] h-fit border flex flex-col px-3 max-h-[${isStackEmpty? '70px': '500px'}] transition-all duration-1000 ease-in-out`}>
          <h2 className="text-2xl border-b-2 py-2 uppercase tracking-wide">Completed</h2>
          <div className={`flex flex-col py-3 gap-3 text-xl transition-opacity duration-1000 ease-in-out ${isStackEmpty? 'opacity-0': 'opacity-100'}`}>
            {
              stack.map((Pid, index) => <span key={index}> {Pid} </span>)
            }
          </div>
        </div>}
      </div>

      {isRunning?
        <div className="py-10">
          {/* Gant Chart */}
          <div className="flex flex-col h-fit justify-center">
            <h2 className="text-2xl border-b-2 uppercase py-2 px-4 mx-auto"> Gantt Chart </h2>

            <div className="flex flex-wrap justify-center py-5 px-10">
              <div className="h-[50px] flex-grow-[1] border text-xl flex justify-center items-center">
                P1
              </div>

              <div className="h-[50px] w-[100px] border text-xl flex items-center justify-center">
                P2
              </div>

              <div className="h-[50px] w-[100px] border text-xl flex items-center justify-center">
                P3
              </div>
            </div>
          </div>

          {/* Pie Charts */}
          <div className="flex flex-row justify-evenly mt-10">
            <div className="w-[500px] h-[400px] text-2xl border">
              <h2 className="text-2xl border-b-2 py-2 px-5 mx-auto w-fit"> Waiting Time (WT) </h2>
            </div>

            <div className="w-[500px] h-[400px] text-2xl border">
              <h2 className="text-2xl border-b-2 py-2 px-5 mx-auto w-fit"> Turnaround Time (TAT) </h2>
            </div>
          </div>
        </div>
      : 
        /* Simulator Buttons Section Before Running */
        <div className="flex flex-row gap-5 justify-end mt-16 pr-10">
          <ShinyButton 
            className="text-xl border px-3 py-2"
            text="Reset"
            onClick={handleReset}
          />
          <ShinyButton 
            className="text-xl border px-3"
            text="Run"
            onClick={handleRun}
          />
        </div>
      }
    </div>
  )
}

export default Simulator