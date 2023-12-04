export const graphAlgos=()=>


{return [
      {
        "name": "Breadth-First Search (BFS)",
        "description": "Breadth-First Search explores a graph level by level, visiting all neighbors of a node before moving on to the next level.",
        "advantages": [
          "Finds the shortest path in an unweighted graph",
          "Identifies connected components in an undirected graph"
        ],
        "disadvantages": [
          "Not suitable for weighted graphs where a shorter path may exist through a neighbor"
        ],
        "timeComplexity": "O(V + E)",
        "spaceComplexity": "O(V)",
        "applications": [
          "Shortest path finding",
          "Network routing algorithms"
        ],
        "implementationDetails": {
          "algorithm": {
            "description": "Breadth-First Search (BFS) explores a graph level by level using a queue.",
            "codeSnippet": "// Breadth-First Search (BFS)\n\nfunction bfs(graph, start) {\n  const visited = new Set();\n  const queue = [start];\n\n  while (queue.length > 0) {\n    const node = queue.shift();\n\n    if (!visited.has(node)) {\n      visited.add(node);\n      // Process the node as needed\n\n      for (const neighbor of graph[node]) {\n        if (!visited.has(neighbor)) {\n          queue.push(neighbor);\n        }\n      }\n    }\n  }\n}"
          }
        }
      },
      {
        "name": "Depth-First Search (DFS)",
        "description": "Depth-First Search explores a graph by going as deep as possible along each branch before backtracking.",
        "advantages": [
          "Identifies cycles in a graph",
          "Determines connected components in an undirected graph"
        ],
        "disadvantages": [
          "Not suitable for finding the shortest path in unweighted graphs"
        ],
        "timeComplexity": "O(V + E)",
        "spaceComplexity": "O(V)",
        "applications": [
          "Cycle detection",
          "Topological sorting"
        ],
        "implementationDetails": {
          "algorithm": {
            "description": "Depth-First Search (DFS) explores a graph by going as deep as possible along each branch before backtracking.",
            "codeSnippet": "// Depth-First Search (DFS)\n\nfunction dfs(graph, start, visited = new Set()) {\n  visited.add(start);\n  // Process the node as needed\n\n  for (const neighbor of graph[start]) {\n    if (!visited.has(neighbor)) {\n      dfs(graph, neighbor, visited);\n    }\n  }\n}"
          }
        }
      },
      {
        "name": "Dijkstra's Algorithm",
        "description": "Dijkstra's Algorithm finds the shortest path from a start node to all other nodes in a weighted graph.",
        "advantages": [
          "Finds the shortest path in weighted graphs with non-negative edges",
          "Handles graphs with varying edge weights"
        ],
        "disadvantages": [
          "Not suitable for graphs with negative edges or cycles"
        ],
        "timeComplexity": "O((V + E) * log(V))",
        "spaceComplexity": "O(V + E)",
        "applications": [
          "Shortest path finding in maps and navigation systems",
          "Network routing algorithms"
        ],
        "implementationDetails": {
          "algorithm": {
            "description": "Dijkstra's Algorithm finds the shortest path from a start node to all other nodes in a weighted graph.",
            "codeSnippet": "// Dijkstra's Algorithm\n\nfunction dijkstra(graph, start) {\n  const distances = {};\n  const priorityQueue = new MinHeap(); // MinHeap implementation needed\n\n  for (const node in graph) {\n    distances[node] = node === start ? 0 : Infinity;\n    priorityQueue.insert(node, distances[node]);\n  }\n\n  while (!priorityQueue.isEmpty()) {\n    const currentNode = priorityQueue.extractMin();\n\n    for (const neighbor in graph[currentNode]) {\n      const cost = distances[currentNode] + graph[currentNode][neighbor];\n\n      if (cost < distances[neighbor]) {\n        distances[neighbor] = cost;\n        priorityQueue.decreaseKey(neighbor, cost);\n      }\n    }\n  }\n\n  return distances;\n}"
          }
        }
      },
     
 
  
      {
        "name": "Bellman-Ford Algorithm",
        "description": "Bellman-Ford Algorithm finds the shortest path from a start node to all other nodes in a weighted graph, even when the graph contains negative-weighted edges.",
        "advantages": [
          "Handles graphs with negative-weighted edges",
          "Identifies negative-weight cycles"
        ],
        "disadvantages": [
          "Time complexity is higher than Dijkstra's Algorithm",
          "Not suitable for graphs with negative cycles"
        ],
        "timeComplexity": "O(V * E)",
        "spaceComplexity": "O(V)",
        "applications": [
          "Shortest path finding in graphs with negative edges",
          "Network routing in the presence of faults"
        ],
        "implementationDetails": {
          "algorithm": {
            "description": "Bellman-Ford Algorithm finds the shortest path from a start node to all other nodes in a weighted graph, even when the graph contains negative-weighted edges.",
            "codeSnippet": "// Bellman-Ford Algorithm\n\nfunction bellmanFord(graph, start) {\n  const distances = {};\n\n  for (const node in graph) {\n    distances[node] = node === start ? 0 : Infinity;\n  }\n\n  for (let i = 0; i < Object.keys(graph).length - 1; i++) {\n    for (const node in graph) {\n      for (const neighbor in graph[node]) {\n        const cost = distances[node] + graph[node][neighbor];\n\n        if (cost < distances[neighbor]) {\n          distances[neighbor] = cost;\n        }\n      }\n    }\n  }\n\n  // Check for negative cycles\n  for (const node in graph) {\n    for (const neighbor in graph[node]) {\n      if (distances[node] + graph[node][neighbor] < distances[neighbor]) {\n        throw new Error('Graph contains a negative cycle');\n      }\n    }\n  }\n\n  return distances;\n}"
          }
        }
      },
      {
        "name": "Prim's Algorithm",
        "description": "Prim's Algorithm finds the minimum spanning tree of a connected, undirected graph.",
        "advantages": [
          "Finds the minimum spanning tree of a graph",
          "Works well for sparse graphs"
        ],
        "disadvantages": [
          "Not suitable for disconnected graphs",
          "Inefficient for dense graphs"
        ],
        "timeComplexity": "O(V^2) with an adjacency matrix, O((V + E) * log(V)) with a priority queue",
        "spaceComplexity": "O(V)",
        "applications": [
          "Network design",
          "Cluster analysis"
        ],
        "implementationDetails": {
          "algorithm": {
            "description": "Prim's Algorithm finds the minimum spanning tree of a connected, undirected graph.",
            "codeSnippet": "// Prim's Algorithm\n\nfunction prim(graph) {\n  const V = Object.keys(graph).length;\n  const parent = {};\n  const key = {};\n  const mstSet = new Set();\n\n  for (const node in graph) {\n    key[node] = Infinity;\n  }\n\n  key[Object.keys(graph)[0]] = 0;\n  parent[Object.keys(graph)[0]] = null;\n\n  for (let count = 0; count < V - 1; count++) {\n    const u = minKey(key, mstSet);\n    mstSet.add(u);\n\n    for (const v in graph[u]) {\n      if (!mstSet.has(v) && graph[u][v] < key[v]) {\n        parent[v] = u;\n        key[v] = graph[u][v];\n      }\n    }\n  }\n\n  return parent;\n}\n\nfunction minKey(key, mstSet) {\n  let min = Infinity;\n  let minIndex = null;\n\n  for (const node in key) {\n    if (!mstSet.has(node) && key[node] < min) {\n      min = key[node];\n      minIndex = node;\n    }\n  }\n\n  return minIndex;\n}"
          }
        }
      },
      {
        "name": "Kruskal's Algorithm",
        "description": "Kruskal's Algorithm finds the minimum spanning tree of a connected, undirected graph.",
        "advantages": [
          "Finds the minimum spanning tree of a graph",
          "Works well for sparse graphs"
        ],
        "disadvantages": [
          "Not suitable for disconnected graphs",
          "Inefficient for dense graphs"
        ],
        "timeComplexity": "O(E * log(V))",
        "spaceComplexity": "O(V + E)",
        "applications": [
          "Network design",
          "Cluster analysis"
        ],
        "implementationDetails": {
          "algorithm": {
            "description": "Kruskal's Algorithm finds the minimum spanning tree of a connected, undirected graph.",
            "codeSnippet": "// Kruskal's Algorithm\n\nfunction kruskal(graph) {\n  const V = Object.keys(graph).length;\n  const parent = {};\n  const rank = {};\n  const edges = [];\n\n  for (const node in graph) {\n    parent[node] = node;\n    rank[node] = 0;\n\n    for (const neighbor in graph[node]) {\n      edges.push([node, neighbor, graph[node][neighbor]]);\n    }\n  }\n\n  edges.sort((a, b) => a[2] - b[2]);\n\n  const result = {};\n\n  for (const edge of edges) {\n    const [u, v, weight] = edge;\n    const rootU = find(parent, u);\n    const rootV = find(parent, v);\n\n    if (rootU !== rootV) {\n      result[u] = result[u] || {};\n      result[u][v] = weight;\n      union(parent, rank, rootU, rootV);\n    }\n  }\n\n  return result;\n}\n\nfunction find(parent, i) {\n  if (parent[i] !== i) {\n    parent[i] = find(parent, parent[i]);\n  }\n  return parent[i];\n}\n\nfunction union(parent, rank, x, y) {\n  const rootX = find(parent, x);\n  const rootY = find(parent, y);\n\n  if (rootX !== rootY) {\n    if (rank[rootX] < rank[rootY]) {\n      parent[rootX] = rootY;\n    } else if (rank[rootX] > rank[rootY]) {\n      parent[rootY] = rootX;\n    } else {\n      parent[rootY] = rootX;\n      rank[rootX]"

        }
      }
    },
    {
      "name": "Floyd-Warshall Algorithm",
      "description": "Floyd-Warshall Algorithm finds the shortest paths between all pairs of nodes in a weighted graph, including graphs with negative-weighted edges.",
      "advantages": [
        "Handles graphs with negative-weighted edges",
        "Finds the shortest paths between all pairs of nodes"
      ],
      "disadvantages": [
        "Time complexity is higher than Dijkstra's Algorithm for sparse graphs"
      ],
      "timeComplexity": "O(V^3)",
      "spaceComplexity": "O(V^2)",
      "applications": [
        "Routing in computer networks",
        "Shortest path calculations in transportation"
      ],
      "implementationDetails": {
        "algorithm": {
          "description": "Floyd-Warshall Algorithm finds the shortest paths between all pairs of nodes in a weighted graph.",
          "codeSnippet": "// Floyd-Warshall Algorithm\n\nfunction floydWarshall(graph) {\n  const V = Object.keys(graph).length;\n  const dist = {};\n\n  for (const node in graph) {\n    dist[node] = {};\n    for (const otherNode in graph) {\n      dist[node][otherNode] = node === otherNode ? 0 : Infinity;\n    }\n  }\n\n  for (const node in graph) {\n    for (const neighbor in graph[node]) {\n      dist[node][neighbor] = graph[node][neighbor];\n    }\n  }\n\n  for (const k in graph) {\n    for (const i in graph) {\n      for (const j in graph) {\n        if (dist[i][k] + dist[k][j] < dist[i][j]) {\n          dist[i][j] = dist[i][k] + dist[k][j];\n        }\n      }\n    }\n  }\n\n  return dist;\n}"
        }
      }
    },
    {
      "name": "Topological Sorting",
      "description": "Topological Sorting orders the nodes of a directed acyclic graph (DAG) in such a way that for every directed edge (u, v), node u comes before node v in the ordering.",
      "advantages": [
        "Helps in task scheduling",
        "Detects cycles in a directed graph"
      ],
      "disadvantages": [
        "Applicable only to Directed Acyclic Graphs (DAGs)"
      ],
      "timeComplexity": "O(V + E)",
      "spaceComplexity": "O(V)",
      "applications": [
        "Task scheduling",
        "Compiler optimizations"
      ],
      "implementationDetails": {
        "algorithm": {
          "description": "Topological Sorting orders the nodes of a directed acyclic graph (DAG) in such a way that for every directed edge (u, v), node u comes before node v in the ordering.",
          "codeSnippet": "// Topological Sorting\n\nfunction topologicalSort(graph) {\n  const V = Object.keys(graph).length;\n  const visited = {};\n  const stack = [];\n\n  function dfs(node) {\n    visited[node] = true;\n\n    for (const neighbor of graph[node]) {\n      if (!visited[neighbor]) {\n        dfs(neighbor);\n      }\n    }\n\n    stack.push(node);\n  }\n\n  for (const node in graph) {\n    if (!visited[node]) {\n      dfs(node);\n    }\n  }\n\n  return stack.reverse();\n}"
        }
      }
    },
   
  ]
}
    