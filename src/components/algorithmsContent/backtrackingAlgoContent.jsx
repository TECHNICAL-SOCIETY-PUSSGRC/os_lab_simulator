export const backTrackAlgo=()=>


{ return [
      {
        "name": "N-Queens Problem",
        "description": "N-Queens Problem involves placing N chess queens on an N×N chessboard so that no two queens threaten each other.",
        "advantages": [
          "Determines valid configurations for placing N queens",
          "Backtracking approach ensures exhaustive search"
        ],
        "disadvantages": [
          "Time complexity increases exponentially with the board size",
          "Not suitable for large board sizes"
        ],
        "timeComplexity": "O(N!)",
        "spaceComplexity": "O(N)",
        "applications": [
          "Chessboard configurations",
          "Constraint satisfaction problems"
        ],
        "implementationDetails": {
          "algorithm": {
            "description": "N-Queens Problem uses backtracking to explore all possible configurations of placing queens on a chessboard.",
            "codeSnippet": "// N-Queens Problem\n\nfunction solveNQueens(n) {\n  const result = [];\n\n  function isSafe(board, row, col) {\n    for (let i = 0; i < row; i++) {\n      if (board[i] === col ||\n          board[i] - i === col - row ||\n          board[i] + i === col + row) {\n        return false;\n      }\n    }\n    return true;\n  }\n\n  function placeQueens(board, row) {\n    if (row === n) {\n      result.push([...board]);\n      return;\n    }\n\n    for (let col = 0; col < n; col++) {\n      if (isSafe(board, row, col)) {\n        board[row] = col;\n        placeQueens(board, row + 1);\n      }\n    }\n  }\n\n  placeQueens(new Array(n), 0);\n  return result;\n}"
          }
        }
      },
      {
        "name": "Sudoku Solver",
        "description": "Sudoku Solver involves filling a partially completed 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids contains all of the digits from 1 to 9.",
        "advantages": [
          "Determines valid solutions for partially completed Sudoku grids",
          "Backtracking approach ensures exhaustive search"
        ],
        "disadvantages": [
          "Time complexity increases exponentially with the grid complexity",
          "Not suitable for large or irregular grid sizes"
        ],
        "timeComplexity": "O(9^(n^2))",
        "spaceComplexity": "O(n^2)",
        "applications": [
          "Sudoku puzzle solving",
          "Constraint satisfaction problems"
        ],
        "implementationDetails": {
          "algorithm": {
            "description": "Sudoku Solver uses backtracking to explore all possible configurations of filling digits in a Sudoku grid.",
            "codeSnippet": "// Sudoku Solver\n\nfunction solveSudoku(board) {\n  function isSafe(row, col, num) {\n    for (let i = 0; i < 9; i++) {\n      if (\n        board[row][i] === num ||\n        board[i][col] === num ||\n        board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] === num\n      ) {\n        return false;\n      }\n    }\n    return true;\n  }\n\n  function solve() {\n    for (let row = 0; row < 9; row++) {\n      for (let col = 0; col < 9; col++) {\n        if (board[row][col] === 0) {\n          for (let num = 1; num <= 9; num++) {\n            if (isSafe(row, col, num)) {\n              board[row][col] = num;\n\n              if (solve()) {\n                return true;\n              }\n\n              board[row][col] = 0;\n            }\n          }\n          return false;\n        }\n      }\n    }\n    return true;\n  }\n\n  solve();\n  return board;\n}"
          }
        }
      },
      {
        "name": "Hamiltonian Cycle",
        "description": "Hamiltonian Cycle involves finding a cycle that visits each vertex exactly once in a graph.",
        "advantages": [
          "Determines the existence of Hamiltonian cycles in a graph",
          "Backtracking approach explores all possible paths"
        ],
        "disadvantages": [
          "Time complexity increases exponentially with the graph size",
          "Not suitable for large or dense graphs"
        ],
        "timeComplexity": "O((V-1)!)",
        "spaceComplexity": "O(V)",
        "applications": [
          "Traveling salesman problem",
          "Circuit design in computer science"
        ],
        "implementationDetails": {
          "algorithm": {
            "description": "Hamiltonian Cycle uses backtracking to explore all possible cycles in a graph.",
            "codeSnippet": "// Hamiltonian Cycle\n\nfunction hamiltonianCycle(graph) {\n  const V = graph.length;\n  const path = Array(V).fill(-1);\n\n  function isSafe(v, pos) {\n    if (!graph[path[pos - 1]][v]) {\n      return false;\n    }\n\n    if (path.includes(v)) {\n      return false;\n    }\n\n    return true;\n  }\n\n  function hamiltonianCycleUtil(pos) {\n    if (pos === V) {\n      if (graph[path[pos - 1]][path[0]] === 1) {\n        return true;\n      } else {\n        return false;\n      }\n    }\n\n    for (let v = 1; v < V; v++) {\n      if (isSafe(v, pos)) {\n        path[pos] = v;\n\n        if (hamiltonianCycleUtil(pos + 1)) {\n          return true;\n        }\n\n        path[pos] = -1;\n      }\n    }\n\n    return false;\n  }\n\n  path[0] = 0;\n\n  if (!hamiltonianCycleUtil(1)) {\n    return [];\n  }\n\n  return path;\n}"
          }
        }
      },
     
    
  

    
      {
        "name": "Subset Sum Problem",
        "description": "Subset Sum Problem involves determining whether there exists a subset of a given set with a sum equal to a given target sum.",
        "advantages": [
          "Determines the existence of a subset with a specific sum",
          "Backtracking approach explores all possible subsets"
        ],
        "disadvantages": [
          "Time complexity increases exponentially with the set size",
          "Not suitable for large sets"
        ],
        "timeComplexity": "O(2^n)",
        "spaceComplexity": "O(n)",
        "applications": [
          "Resource allocation problems",
          "Partition problems"
        ],
        "implementationDetails": {
          "algorithm": {
            "description": "Subset Sum Problem uses backtracking to explore all possible subsets to find one with the target sum.",
            "codeSnippet": "// Subset Sum Problem\n\nfunction subsetSum(nums, target) {\n  function backtrack(start, currentSum) {\n    if (currentSum === target) {\n      return true;\n    }\n\n    for (let i = start; i < nums.length; i++) {\n      if (currentSum + nums[i] <= target) {\n        if (backtrack(i + 1, currentSum + nums[i])) {\n          return true;\n        }\n      }\n    }\n\n    return false;\n  }\n\n  return backtrack(0, 0);\n}"
          }
        }
      },
      {
        "name": "Rat in a Maze",
        "description": "Rat in a Maze involves finding a path from the top-left corner to the bottom-right corner of a maze.",
        "advantages": [
          "Determines the existence of a path in a maze",
          "Backtracking approach explores all possible paths"
        ],
        "disadvantages": [
          "Time complexity increases exponentially with the maze size",
          "Not suitable for large or complex mazes"
        ],
        "timeComplexity": "O(2^(n^2))",
        "spaceComplexity": "O(n^2)",
        "applications": [
          "Robot navigation",
          "Maze-solving algorithms"
        ],
        "implementationDetails": {
          "algorithm": {
            "description": "Rat in a Maze uses backtracking to explore all possible paths to find a path from the start to the end of a maze.",
            "codeSnippet": "// Rat in a Maze\n\nfunction ratInMaze(maze) {\n  const n = maze.length;\n  const path = Array.from({ length: n }, () => Array(n).fill(0));\n\n  function isSafe(x, y) {\n    return x >= 0 && x < n && y >= 0 && y < n && maze[x][y] === 1;\n  }\n\n  function solveMazeUtil(x, y) {\n    if (x === n - 1 && y === n - 1) {\n      path[x][y] = 1;\n      return true;\n    }\n\n    if (isSafe(x, y)) {\n      path[x][y] = 1;\n\n      if (solveMazeUtil(x + 1, y) || solveMazeUtil(x, y + 1)) {\n        return true;\n      }\n\n      path[x][y] = 0; // Backtrack\n      return false;\n    }\n\n    return false;\n  }\n\n  if (!solveMazeUtil(0, 0)) {\n    return [];\n  }\n\n  return path;\n}"
          }
        }
      },
     
 
  
  
      {
        "name": "Graph Coloring",
        "description": "Graph Coloring involves assigning colors to the vertices of a graph in such a way that no two adjacent vertices have the same color.",
        "advantages": [
          "Determines a valid coloring for a graph",
          "Backtracking approach explores all possible color assignments"
        ],
        "disadvantages": [
          "Time complexity increases exponentially with the graph size",
          "Not suitable for large or dense graphs"
        ],
        "timeComplexity": "O(m^V)",
        "spaceComplexity": "O(V)",
        "applications": [
          "Map coloring problems",
          "Register allocation in compilers"
        ],
        "implementationDetails": {
          "algorithm": {
            "description": "Graph Coloring uses backtracking to explore all possible color assignments for the vertices of a graph.",
            "codeSnippet": "// Graph Coloring\n\nfunction graphColoring(graph, colors, vertex) {\n  const V = graph.length;\n\n  function isSafe(v, c) {\n    for (let i = 0; i < V; i++) {\n      if (graph[v][i] === 1 && colors[i] === c) {\n        return false;\n      }\n    }\n    return true;\n  }\n\n  function colorUtil(v) {\n    if (v === V) {\n      return true;\n    }\n\n    for (let c = 1; c <= V; c++) {\n      if (isSafe(v, c)) {\n        colors[v] = c;\n\n        if (colorUtil(v + 1)) {\n          return true;\n        }\n\n        colors[v] = 0; // Backtrack\n      }\n    }\n\n    return false;\n  }\n\n  if (!colorUtil(vertex)) {\n    return [];\n  }\n\n  return colors;\n}"
          }
        }
      },
      {
        "name": "Solve the Cryptoarithmetic Puzzle",
        "description": "Cryptoarithmetic Puzzle involves assigning digits to letters in an arithmetic puzzle in such a way that the puzzle is valid.",
        "advantages": [
          "Determines valid digit assignments for a given puzzle",
          "Backtracking approach explores all possible digit assignments"
        ],
        "disadvantages": [
          "Time complexity increases exponentially with the puzzle size",
          "Not suitable for large or complex puzzles"
        ],
        "timeComplexity": "O(10^n)",
        "spaceComplexity": "O(n)",
        "applications": [
          "Education and recreational puzzles",
          "Problem-solving competitions"
        ],
        "implementationDetails": {
          "algorithm": {
            "description": "Cryptoarithmetic Puzzle uses backtracking to explore all possible digit assignments for a given arithmetic puzzle.",
            "codeSnippet": "// Solve the Cryptoarithmetic Puzzle\n\nfunction solveCryptoarithmeticPuzzle(puzzle) {\n  const uniqueChars = [...new Set(puzzle.replace(/[^a-zA-Z]/g, ''))];\n  const assignedDigits = {};\n\n  function isSafe(char, digit) {\n    return !assignedDigits[char] || assignedDigits[char] === digit;\n  }\n\n  function solvePuzzleUtil(index) {\n    if (index === uniqueChars.length) {\n      return true;\n    }\n\n    const char = uniqueChars[index];\n\n    for (let digit = 0; digit <= 9; digit++) {\n      if (isSafe(char, digit)) {\n        assignedDigits[char] = digit;\n\n        if (solvePuzzleUtil(index + 1)) {\n          return true;\n        }\n\n        assignedDigits[char] = undefined; // Backtrack\n      }\n    }\n\n    return false;\n  }\n\n  if (!solvePuzzleUtil(0)) {\n    return {};\n  }\n\n  return assignedDigits;\n}"
          }
        }
      },
      // Add more backtracking algorithms as needed
    ]
  }
      