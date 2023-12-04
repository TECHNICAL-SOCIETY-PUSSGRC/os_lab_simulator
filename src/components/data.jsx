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

export const FCFS = (data, currentTime) => {
    let result = []
    result.sort((a, b) => Number(a.AT) - Number(b.AT))
    result.map((process) => {
        process.CT = Number(process.BT) + currentTime
        process.TAT = Number(process.CT) - Number(process.AT)
        process.WT = Number(process.TAT) - Number(process.BT)
        currentTime = Number(process.CT)
    })
    return result;
}

export const createCopyJSON = (data) => JSON.parse(JSON.stringify(data))

export const StepWiseFCFS = (data, currentTime) => {
    data = createCopyJSON(data) // so that original data is not modified
    currentTime = Number(currentTime) // so that original data is not modified
    data.map((process) => process.CT = process.TAT = process.WT = '') // filling empty data

    let steps = []
    data.sort((a, b) => Number(a.AT) - Number(b.AT))
    steps.push({ data: createCopyJSON(data), currentTime: currentTime, explanationMessage: "Sort the data in the increasing order of Arrival Time (AT)" })

    data.map((process) => {
        let curTime = currentTime;
        process.CT = Number(process.BT) + currentTime
        currentTime = Number(process.CT)
        
        steps.push({ data: createCopyJSON(data), currentTime: currentTime, explanationMessage: `Current Time: ${curTime}.\nProcess ${process.Pid} is executed till ${currentTime} time unit.\nCT of ${process.Pid}: ${process.CT}` })
    })
    data.map((process) => {
        process.TAT = Number(process.CT) - Number(process.AT)
        steps.push({ data: createCopyJSON(data), currentTime: currentTime, explanationMessage: `Process ${process.Pid} is executed till ${process.CT} time unit (CT).\nProcess ${process.Pid} arrived at ${process.AT} time unit (AT).\nTAT = CT - AT.\nTAT of ${process.Pid}: ${process.CT} - ${process.AT} = ${process.TAT}` })
    })
    data.map((process) => {
        process.WT = Number(process.TAT) - Number(process.BT)
        steps.push({ data: createCopyJSON(data), currentTime: currentTime, explanationMessage: `Turn Around Time of Process ${process.Pid} is ${process.TAT} time unit (TAT).\nBurst Time of Process ${process.Pid} is ${process.BT} time unit (BT).\nWT = TAT - BT.\nTAT of ${process.Pid}: ${process.CT} - ${process.AT} = ${process.TAT}` })
    })
    return steps;
}