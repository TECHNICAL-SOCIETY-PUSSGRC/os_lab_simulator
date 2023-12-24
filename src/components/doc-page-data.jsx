export const searchingAlgo = () => {
  return [
    {
      name: "Binary Search",
      description:
        "Binary Search is a divide-and-conquer search algorithm that efficiently finds a target value within a sorted array. It works by repeatedly dividing the search range in half.",
      advantages: [
        "Efficient for large datasets",
        "Logarithmic time complexity O(log n)",
        "Well-suited for static and infrequently updated datasets",
      ],
      disadvantages: [
        "Applicable only to sorted arrays",
        "Requires sorted data, which may be an overhead",
        "Not suitable for dynamic datasets that frequently change",
      ],
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      applications: [
        "Searching in databases and file systems",
        "Finding an element in a sorted list",
        "Used in computer graphics algorithms",
      ],
      implementationDetails: {
        iterative: {
          description:
            "Binary Search can be implemented iteratively using a loop.",
          codeSnippet:
            "// Iterative Binary Search\n\nfunction binarySearch(arr, target) {\n  let low = 0;\n  let high = arr.length - 1;\n\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n\n    if (arr[mid] === target) return mid; // Found\n    else if (arr[mid] < target) low = mid + 1; // Search in the right half\n    else high = mid - 1; // Search in the left half\n  }\n\n  return -1; // Not found\n}",
        },
        recursive: {
          description: "Binary Search can also be implemented recursively.",
          codeSnippet:
            "// Recursive Binary Search\n\nfunction binarySearchRecursive(arr, target, low, high) {\n  if (low > high) return -1; // Not found\n\n  const mid = Math.floor((low + high) / 2);\n\n  if (arr[mid] === target) return mid; // Found\n  else if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, high); // Search in the right half\n  else return binarySearchRecursive(arr, target, low, mid - 1); // Search in the left half\n}",
        },
      },
    },
    {
      name: "Linear Search",
      description:
        "Linear Search is a simple search algorithm that checks each element in the list until a match is found or the whole list has been searched.",
      advantages: ["Works on unsorted and sorted arrays", "Easy to implement"],
      disadvantages: [
        "Inefficient for large datasets",
        "Linear time complexity O(n)",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      applications: [
        "Searching for an unsorted list",
        "Used in small datasets",
      ],
      implementationDetails: {
        iterative: {
          description:
            "Linear Search can be implemented iteratively using a loop.",
          codeSnippet:
            "// Iterative Linear Search\n\nfunction linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i; // Found\n  }\n\n  return -1; // Not found\n}",
        },
      },
    },
    {
      name: "Jump Search",
      description:
        "Jump Search is a searching algorithm for ordered lists. It jumps ahead by fixed steps and then performs linear search in the identified block.",
      advantages: [
        "Efficient for large datasets",
        "Square root time complexity O(√n)",
      ],
      disadvantages: [
        "Requires a sorted list",
        "Not suitable for small datasets",
      ],
      timeComplexity: "O(√n)",
      spaceComplexity: "O(1)",
      applications: [
        "Searching in ordered lists",
        "Used in block-based file systems",
      ],
      implementationDetails: {
        iterative: {
          description: "Jump Search can be implemented iteratively.",
          codeSnippet:
            "// Iterative Jump Search\n\nfunction jumpSearch(arr, target) {\n  const n = arr.length;\n  const step = Math.floor(Math.sqrt(n));\n  let prev = 0;\n\n  while (arr[Math.min(step, n) - 1] < target) {\n    prev = step;\n    step += Math.floor(Math.sqrt(n));\n    if (prev >= n) return -1; // Not found\n  }\n\n  // Perform linear search in the identified block\n  for (let i = prev; i < Math.min(step, n); i++) {\n    if (arr[i] === target) return i; // Found\n  }\n\n  return -1; // Not found\n}",
        },
      },
    },
    {
      name: "Exponential Search",
      description:
        "Exponential Search is a searching algorithm that works on sorted arrays. It involves two steps: finding a range where the element may be present and performing binary search in that range.",
      advantages: [
        "Efficient for unbounded arrays",
        "Logarithmic time complexity O(log n)",
      ],
      disadvantages: [
        "Requires a sorted list",
        "May perform worse than other algorithms for small datasets",
      ],
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      applications: [
        "Searching in unbounded arrays",
        "Used in situations where the size of the array is unknown",
      ],
      implementationDetails: {
        iterative: {
          description: "Exponential Search can be implemented iteratively.",
          codeSnippet:
            "// Iterative Exponential Search\n\nfunction exponentialSearch(arr, target) {\n  const n = arr.length;\n\n  if (arr[0] === target) return 0; // Found at the first element\n\n  let i = 1;\n  while (i < n && arr[i] <= target) {\n    i *= 2;\n  }\n\n  return binarySearch(arr, target, i / 2, Math.min(i, n)); // Perform binary search in the identified range\n}",
        },
      },
    },
    {
      name: "Breadth-First Search (BFS)",
      description:
        "BFS is a graph traversal algorithm that explores all the vertices of a graph in breadth-first order, visiting all neighbors of a vertex before moving on to the next level of neighbors.",
      advantages: ["Guarantees the shortest path in an unweighted graph"],
      disadvantages: [
        "Requires more memory compared to DFS",
        "May notbe efficient for very dense graphs",
      ],
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      applications: [
        "Shortest path problems in unweighted graphs",
        "Connected components in an undirected graph",
      ],
      implementationDetails: {
        algorithm: {
          description: "BFS can be implemented using a queue data structure.",
          codeSnippet:
            "// Breadth-First Search (BFS)\n\nfunction bfs(graph, startNode) {\n const queue = [startNode];\n const visited = new Set([startNode]);\n\n while (queue.length > 0) {\n const currentNode = queue.shift();\n // Process the current node\n\n for (const neighbor of graph[currentNode]) {\n if (!visited.has(neighbor)) {\n queue.push(neighbor);\n visited.add(neighbor);\n }\n }\n }\n}",
        },
      },
    },
    {
      name: "Depth-First Search (DFS)",
      description:
        "DFS is a graph traversal algorithm that explores all the vertices of a graph in depth-first order, visiting a vertex and then recursively visiting its adjacent vertices.",
      advantages: [
        "Simpler to implement than BFS",
        "May require less memory compared to BFS",
      ],
      disadvantages: [
        "Does not guarantee the shortest path",
        "May not be efficient for very deep graphs",
      ],
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      applications: [
        "Topological sorting of a directed acyclic graph (DAG)",
        "Detecting cycles in a graph",
      ],
      implementationDetails: {
        algorithm: {
          description:
            "DFS can be implemented using recursion or a stack data structure.",
          codeSnippet:
            "// Depth-First Search (DFS)\n\nfunction dfs(graph, currentNode, visited) {\n // Process the current node\n\n visited.add(currentNode);\n\n for (const neighbor of graph[currentNode]) {\n if (!visited.has(neighbor)) {\n dfs(graph, neighbor, visited);\n }\n }\n}\n\n// Example usage:\n// const visited = new Set();\n// dfs(graph, startNode, visited);",
        },
      },
    },
    {
      name: "Dijkstra's Algorithm",
      description:
        "Dijkstra's Algorithm is a graph algorithm that finds the shortest path between nodes in a weighted graph. It works by maintaining a set of vertices whose shortest distance from the source is known.",
      advantages: [
        "Guarantees the shortest path in a weighted graph",
        "Applicable to both directed and undirected graphs",
      ],
      disadvantages: ["Does not handle negative edge weights"],
      timeComplexity: "O((V + E) * log(V))",
      spaceComplexity: "O(V + E)",
      applications: [
        "Shortest path problems in weighted graphs",
        "Routing protocols in computer networks",
      ],
      implementationDetails: {
        algorithm: {
          description:
            "Dijkstra's Algorithm can be implemented using a priority queue or a min heap.",
          codeSnippet:
            "// Dijkstra's Algorithm\n\nfunction dijkstra(graph, startNode) {\n const distances = {};\n const priorityQueue = new PriorityQueue(); // Implement a priority queue\n\n // Initialize distances and add the start node to the priority queue\n for (const node in graph) {\n distances[node] = node === startNode ? 0 : Infinity;\n priorityQueue.enqueue(node, distances[node]);\n }\n\n while (!priorityQueue.isEmpty()) {\n const currentNode = priorityQueue.dequeue().element;\n\n for (const neighbor in graph[currentNode]) {\n const newDistance = distances[currentNode] + graph[currentNode][neighbor];\n\n if (newDistance < distances[neighbor]) {\n distances[neighbor] = newDistance;\n priorityQueue.enqueue(neighbor, newDistance);\n }\n }\n }\n}",
        },
      },
    },
  ];
};
