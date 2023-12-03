export const SampleData = () => [
    {
        "Pid": "P1",
        "AT": "0",
        "BT": "4"
    },{
        "Pid": "P2",
        "AT": "1",
        "BT": "5"
    },{
        "Pid": "P3",
        "AT": "2",
        "BT": "2"
    }
]

export const OSAlgorithms = () => {
    return [
        {
          "name": "FCFS",
          "description": "First-Come-First-Serve: Schedules processes in the order they arrive."
        },
        {
          "name": "SJF",
          "description": "Shortest Job First: Schedules the process with the shortest burst time first."
        },
        {
          "name": "SRJF",
          "description": "Shortest Remaining Job First: A preemptive version of SJF, where the process with the shortest remaining burst time is scheduled next."
        },
        {
          "name": "RR",
          "description": "Round Robin: Allocates a fixed time slice (quantum) to each process in a cyclic manner."
        },
        {
          "name": "Priority",
          "description": "Priority Scheduling: Assigns priority levels to processes, scheduling higher-priority processes first."
        },
        {
            "name": "MLQ",
            "description": "Multilevel Queue Scheduling: Divides processes into multiple priority levels, each with its own scheduling algorithm."
        }
    ]
}