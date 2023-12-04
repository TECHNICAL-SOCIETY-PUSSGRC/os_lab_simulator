export const dynamicAlgo=()=>{
    return [
      {
        "name": "Fibonacci Sequence (Memoization)",
        "description": "Fibonacci Sequence is a series of numbers where each number is the sum of the two preceding ones. Memoization is an optimization technique to store computed values and avoid redundant calculations.",
        "advantages": [
          "Optimizes time complexity by avoiding redundant calculations",
          "Reduces time complexity from exponential to linear"
        ],
        "disadvantages": [
          "Requires additional memory for storing computed values",
          "Not suitable for all types of problems"
        ],
        "timeComplexity": "O(n)",
        "spaceComplexity": "O(n)",
        "applications": [
          "Calculating Fibonacci numbers",
          "Optimizing recursive algorithms"
        ],
        "implementationDetails": {
          "algorithm": {
            "description": "Fibonacci Sequence using memoization stores previously computed values to avoid redundant calculations.",
            "codeSnippet": "// Fibonacci Sequence with Memoization\n\nfunction fibonacci(n, memo = {}) {\n  if (n <= 1) {\n    return n;\n  }\n\n  if (memo[n] !== undefined) {\n    return memo[n];\n  }\n\n  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);\n  return memo[n];\n}"
          }
        }
      },
      {
        "name": "Longest Common Subsequence (LCS)",
        "description": "Longest Common Subsequence is the longest subsequence common to two sequences (arrays or strings). It is often used in bioinformatics and text comparison.",
        "advantages": [
          "Useful for comparing sequences of elements",
          "Dynamic programming approach optimizes time complexity"
        ],
        "disadvantages": [
          "Requires additional memory for the dynamic programming table",
          "Not suitable for all types of sequence comparison"
        ],
        "timeComplexity": "O(m * n)",
        "spaceComplexity": "O(m * n)",
        "applications": [
          "Bioinformatics for DNA sequence comparison",
          "Text comparison for plagiarism detection"
        ],
        "implementationDetails": {
          "algorithm": {
            "description": "Longest Common Subsequence (LCS) uses a dynamic programming table to find the length and actual subsequence.",
            "codeSnippet": "// Longest Common Subsequence (LCS)\n\nfunction longestCommonSubsequence(X, Y) {\n  const m = X.length;\n  const n = Y.length;\n  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));\n\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (X[i - 1] === Y[j - 1]) {\n        dp[i][j] = dp[i - 1][j - 1] + 1;\n      } else {\n        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n      }\n    }\n  }\n\n  // Reconstruct the LCS from the table\n  let i = m, j = n;\n  const lcs = [];\n\n  while (i > 0 && j > 0) {\n    if (X[i - 1] === Y[j - 1]) {\n      lcs.unshift(X[i - 1]);\n      i--;\n      j--;\n    } else if (dp[i - 1][j] > dp[i][j - 1]) {\n      i--;\n    } else {\n      j--;\n    }\n  }\n\n  return lcs;\n}"
          }
        }
      },
      {
        "name": "Knapsack Problem",
        "description": "Knapsack Problem involves selecting a subset of items with maximum total value, given a constraint on the total weight that can be carried.",
        "advantages": [
          "Optimizes selection of items for maximum value",
          "Dynamic programming approach ensures efficiency"
        ],
        "disadvantages": [
          "Requires additional memory for the dynamic programming table",
          "Not suitable for problems with fractional items"
        ],
        "timeComplexity": "O(n * W)",
        "spaceComplexity": "O(n * W)",
        "applications": [
          "Resource allocation problems",
          "Optimizing investment portfolios"
        ],
        "implementationDetails": {
          "algorithm": {
            "description": "Knapsack Problem uses dynamic programming to find the maximum value achievable within weight constraints.",
            "codeSnippet": "// 0/1 Knapsack Problem\n\nfunction knapsack(weights, values, W) {\n  const n = weights.length;\n  const dp = new Array(n + 1).fill(0).map(() => new Array(W + 1).fill(0));\n\n  for (let i = 1; i <= n; i++) {\n    for (let w = 1; w <= W; w++) {\n      if (weights[i - 1] <= w) {\n        dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);\n      } else {\n        dp[i][w] = dp[i - 1][w];\n      }\n    }\n  }\n\n  return dp[n][W];\n}"
          }
        }
      },

      {
        "name": "Edit Distance",
        "description": "Edit Distance measures the minimum number of operations (insertions, deletions, or substitutions) required to transform one string into another. It is widely used in applications like spell checking and DNA sequence analysis.",
        "advantages": [
          "Useful for string similarity measurement",
          "Dynamic programming approach optimizes time complexity"
        ],
        "disadvantages": [
          "Requires additional memory for the dynamic programming table",
          "Not suitable for very long strings due to space complexity"
        ],
        "timeComplexity": "O(m * n)",
        "spaceComplexity": "O(m * n)",
        "applications": [
          "Spell checking and correction",
          "DNA sequence analysis"
        ],
        "implementationDetails": {
          "algorithm": {
            "description": "Edit Distance uses dynamic programming to find the minimum number of operations to transform one string into another.",
            "codeSnippet": "// Edit Distance\n\nfunction editDistance(str1, str2) {\n  const m = str1.length;\n  const n = str2.length;\n  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));\n\n  for (let i = 0; i <= m; i++)"
          }
        }},
          {
            "name": "Matrix Chain Multiplication",
            "description": "Matrix Chain Multiplication determines the most efficient way to multiply a sequence of matrices to minimize the total number of scalar multiplications. It has applications in optimization problems involving matrix products.",
            "advantages": [
              "Optimizes the order of matrix multiplication",
              "Dynamic programming approach ensures efficiency"
            ],
            "disadvantages": [
              "Requires additional memory for the dynamic programming table",
              "Not suitable for problems with irregular matrix dimensions"
            ],
            "timeComplexity": "O(n^3)",
            "spaceComplexity": "O(n^2)",
            "applications": [
              "Optimizing matrix chain multiplication",
              "Computer graphics and computer-aided design"
            ],
            "implementationDetails": {
              "algorithm": {
                "description": "Matrix Chain Multiplication uses dynamic programming to find the most efficient way to multiply a sequence of matrices.",
                "codeSnippet": "// Matrix Chain Multiplication\n\nfunction matrixChainMultiplication(dims) {\n  const n = dims.length - 1; // Number of matrices\n  const dp = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));\n\n  for (let len = 2; len <= n; len++) {\n    for (let i = 1; i <= n - len + 1; i++) {\n      const j = i + len - 1;\n      dp[i][j] = Infinity;\n\n      for (let k = i; k < j; k++) {\n        const cost = dp[i][k] + dp[k + 1][j] + dims[i - 1] * dims[k] * dims[j];\n        dp[i][j] = Math.min(dp[i][j], cost);\n      }\n    }\n  }\n\n  return dp[1][n];\n}"
              }
            }
          },
          {
            "name": "Longest Increasing Subsequence (LIS)",
            "description": "Longest Increasing Subsequence is the longest subsequence of a given sequence such that all elements of the subsequence are in strictly increasing order.",
            "advantages": [
              "Useful for finding patterns in sequences",
              "Dynamic programming approach optimizes time complexity"
            ],
            "disadvantages": [
              "Requires additional memory for the dynamic programming table",
              "Not suitable for all types of sequences"
            ],
            "timeComplexity": "O(n^2)",
            "spaceComplexity": "O(n)",
            "applications": [
              "Identifying trends in financial data",
              "Genomic sequence analysis"
            ],
            "implementationDetails": {
              "algorithm": {
                "description": "Longest Increasing Subsequence (LIS) uses dynamic programming to find the length of the longest increasing subsequence.",
                "codeSnippet": "// Longest Increasing Subsequence (LIS)\n\nfunction longestIncreasingSubsequence(nums) {\n  const n = nums.length;\n  const dp = new Array(n).fill(1);\n\n  for (let i = 1; i < n; i++) {\n    for (let j = 0; j < i; j++) {\n      if (nums[i] > nums[j] && dp[i] < dp[j] + 1) {\n        dp[i] = dp[j] + 1;\n      }\n    }\n  }\n\n  return Math.max(...dp);\n}"
              }
            }
          },
          {
            "name": "Coin Change Problem",
            "description": "Coin Change Problem involves finding the number of ways to make a certain amount of change using a given set of coin denominations.",
            "advantages": [
              "Determines the number of ways to make change",
              "Dynamic programming approach optimizes time complexity"
            ],
            "disadvantages": [
              "Requires additional memory for the dynamic programming table",
              "Not suitable for problems with non-integer amounts"
            ],
            "timeComplexity": "O(n * m)",
            "spaceComplexity": "O(n)",
            "applications": [
              "Making change in currency systems",
              "Variations in combinatorial problems"
            ],
            "implementationDetails": {
              "algorithm": {
                "description": "Coin Change Problem uses dynamic programming to find the number of ways to make change.",
                "codeSnippet": "// Coin Change Problem\n\nfunction coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(0);\n  dp[0] = 1;\n\n  for (const coin of coins) {\n    for (let i = coin; i <= amount; i++) {\n      dp[i] += dp[i - coin];\n    }\n  }\n\n  return dp[amount];\n}"
              }
            }
          },
          {
            "name": "Maximum Subarray Sum",
            "description": "Maximum Subarray Sum involves finding the contiguous subarray with the largest sum within a given array of numbers.",
            "advantages": [
              "Identifies the maximum sum subarray",
              "Dynamic programming approach optimizes time complexity"
            ],
            "disadvantages": [
              "Requires additional memory for the dynamic programming table",
              "Not suitable for problems with non-numeric arrays"
            ],
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(n)",
            "applications": [
              "Financial data analysis",
              "Image processing for feature detection"
            ],
            "implementationDetails": {
              "algorithm": {
                "description": "Maximum Subarray Sum uses dynamic programming to find the maximum sum subarray.",
                "codeSnippet": "// Maximum Subarray Sum\n\nfunction maxSubarraySum(nums) {\n  const n = nums.length;\n  const dp = new Array(n).fill(0);\n  dp[0] = nums[0];\n  let maxSum = nums[0];\n\n  for (let i = 1; i < n; i++) {\n    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);\n    maxSum = Math.max(maxSum, dp[i]);\n  }\n\n  return maxSum;\n"
          
            }}},
            {
              "name": "Minimum Cost Path",
              "description": "Minimum Cost Path involves finding the path with the minimum cost from the top-left corner to the bottom-right corner of a matrix. Each cell in the matrix represents a cost to traverse that cell.",
              "advantages": [
                "Determines the path with the minimum cost",
                "Dynamic programming approach optimizes time complexity"
              ],
              "disadvantages": [
                "Requires additional memory for the dynamic programming table",
                "Not suitable for problems with irregular matrices"
              ],
              "timeComplexity": "O(m * n)",
              "spaceComplexity": "O(m * n)",
              "applications": [
                "Robot navigation",
                "Network routing algorithms"
              ],
              "implementationDetails": {
                "algorithm": {
                  "description": "Minimum Cost Path uses dynamic programming to find the path with the minimum cost in a matrix.",
                  "codeSnippet": "// Minimum Cost Path\n\nfunction minCostPath(costMatrix) {\n  const m = costMatrix.length;\n  const n = costMatrix[0].length;\n  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0));\n\n  dp[0][0] = costMatrix[0][0];\n\n  // Initialize the first row\n  for (let i = 1; i < m; i++) {\n    dp[i][0] = dp[i - 1][0] + costMatrix[i][0];\n  }\n\n  // Initialize the first column\n  for (let j = 1; j < n; j++) {\n    dp[0][j] = dp[0][j - 1] + costMatrix[0][j];\n  }\n\n  // Build the DP table\n  for (let i = 1; i < m; i++) {\n    for (let j = 1; j < n; j++) {\n      dp[i][j] = costMatrix[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);\n    }\n  }\n\n  return dp[m - 1][n - 1];\n}"
                }
              }
            },
            {
              "name": "Longest Palindromic Subsequence (LPS)",
              "description": "Longest Palindromic Subsequence is the longest subsequence of a given sequence that is also a palindrome.",
              "advantages": [
                "Useful for finding palindromic patterns in sequences",
                "Dynamic programming approach optimizes time complexity"
              ],
              "disadvantages": [
                "Requires additional memory for the dynamic programming table",
                "Not suitable for all types of sequences"
              ],
              "timeComplexity": "O(n^2)",
              "spaceComplexity": "O(n^2)",
              "applications": [
                "Genomic sequence analysis",
                "Text compression algorithms"
              ],
              "implementationDetails": {
                "algorithm": {
                  "description": "Longest Palindromic Subsequence (LPS) uses dynamic programming to find the length of the longest palindromic subsequence.",
                  "codeSnippet": "// Longest Palindromic Subsequence (LPS)\n\nfunction longestPalindromicSubsequence(str) {\n  const n = str.length;\n  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));\n\n  for (let i = 0; i < n; i++) {\n    dp[i][i] = 1;\n  }\n\n  for (let len = 2; len <= n; len++) {\n    for (let i = 0; i < n - len + 1; i++) {\n      const j = i + len - 1;\n\n      if (str[i] === str[j] && len === 2) {\n        dp[i][j] = 2;\n      } else if (str[i] === str[j]) {\n        dp[i][j] = dp[i + 1][j - 1] + 2;\n      } else {\n        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);\n      }\n    }\n  }\n\n  return dp[0][n - 1];\n}"
                }
              }
            },
            {
              "name": "Largest Independent Set",
              "description": "Largest Independent Set involves finding the size of the largest set of nodes in a binary tree that are not adjacent to each other.",
              "advantages": [
                "Determines the size of the largest independent set in a binary tree",
                "Dynamic programming approach optimizes time complexity"
              ],
              "disadvantages": [
                "Requires additional memory for the dynamic programming table",
                "Not suitable for problems with non-binary tree structures"
              ],
              "timeComplexity": "O(n)",
              "spaceComplexity": "O(n)",
              "applications": [
                "Graph theory",
                "Network node selection"
              ],
              "implementationDetails": {
                "algorithm": {
                  "description": "Largest Independent Set uses dynamic programming to find the size of the largest independent set in a binary tree.",
                  "codeSnippet": "// Largest Independent Set\n\nfunction largestIndependentSet(root) {\n  if (!root) {\n    return 0;\n  }\n\n  const dp = new Map();\n\n  function calcSize(node) {\n    if (!node) {\n      return 0;\n    }\n\n    if (dp.has(node)) {\n      return dp.get(node);\n    }\n\n    const sizeIncludingNode = 1 + (node.left ? calcSize(node.left.left) + calcSize(node.left.right) : 0) +\n      (node.right ? calcSize(node.right.left) + calcSize(node.right.right) : 0);\n\n    const sizeExcludingNode = calcSize(node.left) + calcSize(node.right);\n\n    const result = Math.max(sizeIncludingNode, sizeExcludingNode);\n    dp.set(node, result);\n\n    return result;\n  }\n\n  return calcSize(root);\n}"
                }
              }
            }
            // Add more dynamic programming algorithms as needed
            ]
            }
            
          
            