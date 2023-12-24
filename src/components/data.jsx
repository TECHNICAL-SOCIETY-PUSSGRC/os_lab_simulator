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