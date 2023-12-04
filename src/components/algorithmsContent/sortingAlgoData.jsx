export const sortingAlgo=()=>{
    return[

    {
      "name": "Bubble Sort",
      "description": "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
      "advantages": [
        "Simple and easy to understand",
        "No additional memory is required (in-place sorting)"
      ],
      "disadvantages": [
        "Inefficient for large datasets",
        "Quadratic time complexity O(n^2)"
      ],
      "timeComplexity": "O(n^2)",
      "spaceComplexity": "O(1)",
      "applications": [
        "Educational purposes",
        "Useful for small datasets with simplicity as a priority"
      ],
      "implementationDetails": {
        "algorithm": {
          "description": "Bubble Sort can be implemented using nested loops.",
          "codeSnippet": "// Bubble Sort\n\nfunction bubbleSort(arr) {\n  const n = arr.length;\n  for (let i = 0; i < n - 1; i++) {\n    for (let j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        // Swap arr[j] and arr[j + 1]\n        const temp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = temp;\n      }\n    }\n  }\n}"
        }
      }
    },
    {
      "name": "Selection Sort",
      "description": "Selection Sort is a simple sorting algorithm that divides the input list into a sorted and an unsorted region. It repeatedly selects the smallest (or largest) element from the unsorted region and swaps it with the first element of the unsorted region.",
      "advantages": [
        "Simple and easy to understand",
        "In-place sorting"
      ],
      "disadvantages": [
        "Inefficient for large datasets",
        "Quadratic time complexity O(n^2)"
      ],
      "timeComplexity": "O(n^2)",
      "spaceComplexity": "O(1)",
      "applications": [
        "Educational purposes",
        "Useful for small datasets with simplicity as a priority"
      ],
      "implementationDetails": {
        "algorithm": {
          "description": "Selection Sort can be implemented using nested loops.",
          "codeSnippet": "// Selection Sort\n\nfunction selectionSort(arr) {\n  const n = arr.length;\n  for (let i = 0; i < n - 1; i++) {\n    let minIndex = i;\n    for (let j = i + 1; j < n; j++) {\n      if (arr[j] < arr[minIndex]) {\n        minIndex = j;\n      }\n    }\n    // Swap arr[i] and arr[minIndex]\n    const temp = arr[i];\n    arr[i] = arr[minIndex];\n    arr[minIndex] = temp;\n  }\n}"
        }
      }
    },
    {
      "name": "Insertion Sort",
      "description": "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
      "advantages": [
        "Simple and efficient for small datasets",
        "In-place sorting"
      ],
      "disadvantages": [
        "Inefficient for large datasets",
        "Quadratic time complexity O(n^2)"
      ],
      "timeComplexity": "O(n^2)",
      "spaceComplexity": "O(1)",
      "applications": [
        "Useful for small datasets or mostly sorted datasets",
        "Online algorithm - can sort a list as it receives it"
      ],
      "implementationDetails": {
        "algorithm": {
          "description": "Insertion Sort builds the sorted array one element at a time.",
          "codeSnippet": "// Insertion Sort\n\nfunction insertionSort(arr) {\n  const n = arr.length;\n  for (let i = 1; i < n; i++) {\n    const key = arr[i];\n    let j = i - 1;\n\n    // Move elements greater than key to one position ahead\n    while (j >= 0 && arr[j] > key) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n\n    arr[j + 1] = key;\n  }\n}"
        }
      }
    },
    {
      "name": "Merge Sort",
      "description": "Merge Sort is an efficient, stable, and comparison-based sorting algorithm. Most implementations produce a stable sort, meaning that the implementation preserves the input order of equal elements in the sorted output.",
      "advantages": [
        "Stable and efficient for large datasets",
        "Divide and conquer strategy"
      ],
      "disadvantages": [
        "Requires additional space for merging",
        "Higher space complexity compared to in-place algorithms"
      ],
      "timeComplexity": "O(n log n)",
      "spaceComplexity": "O(n)",
      "applications": [
        "External sorting",
        "Sorting linked lists",
        "Useful for large datasets where stability is important"
      ],
      "implementationDetails": {
        "algorithm": {
          "description": "Merge Sort uses a divide and conquer strategy.",
          "codeSnippet": "// Merge Sort\n\nfunction mergeSort(arr) {\n  if (arr.length <= 1) {\n    return arr;\n  }\n\n  const middle = Math.floor(arr.length / 2);\n  const left = arr.slice(0, middle);\n  const right = arr.slice(middle);\n\n  return merge(mergeSort(left), mergeSort(right));\n}\n\nfunction merge(left, right) {\n  let result = [];\n  let leftIndex = 0;\n  let rightIndex = 0;\n\n  while (leftIndex < left.length && rightIndex < right.length) {\n    if (left[leftIndex] < right[rightIndex]) {\n      result.push(left[leftIndex]);\n      leftIndex++;\n    } else {\n      result.push(right[rightIndex]);\n      rightIndex++;\n    }\n  }\n\n  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));\n}"
        }
      }
    },
    {
      "name": "Quick Sort",
      "description": "Quick Sort is an efficient, comparison-based sorting algorithm. It uses a divide-and-conquer strategy to sort elements based on a pivot element, and it is often faster in practice compared to other sorting algorithms.",
      "advantages": [
        "Efficient for large datasets",
        "In-place sorting"
      ],
      "disadvantages": [
        "Not stable",
        "Worst-case time complexity is quadratic (though rare in practice)"
      ],
      "timeComplexity": "O(nlog n) average, O(n^2) worst-case",
      "spaceComplexity": "O(log n)",
      "applications": [
      "General-purpose sorting",
      "QuickSelect algorithm for finding the kth smallest element",
      "Useful for large datasets where average-case performance is crucial"
      ],
      "implementationDetails": {
      "algorithm": {
      "description": "Quick Sort uses a divide and conquer strategy with a pivot element.",
      "codeSnippet": "// Quick Sort\n\nfunction quickSort(arr, low, high) {\n if (low < high) {\n // Partition the array, arr[p] is now at the correct place\n const pivotIndex = partition(arr, low, high);\n\n // Recursively sort the sub-arrays before and after the pivot\n quickSort(arr, low, pivotIndex - 1);\n quickSort(arr, pivotIndex + 1, high);\n }\n}\n\nfunction partition(arr, low, high) {\n const pivot = arr[high];\n let i = low - 1;\n\n for (let j = low; j < high; j++) {\n if (arr[j] < pivot) {\n i++;\n // Swap arr[i] and arr[j]\n const temp = arr[i];\n arr[i] = arr[j];\n arr[j] = temp;\n }\n }\n\n // Swap arr[i + 1] and arr[high] (pivot)\n const temp = arr[i + 1];\n arr[i + 1] = arr[high];\n arr[high] = temp;\n\n return i + 1;\n}"
      }
      }
      },
      {
      "name": "Heap Sort",
      "description": "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region and iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region.",
      "advantages": [
      "Stable",
      "Efficient for large datasets",
      "In-place sorting"
      ],
      "disadvantages": [
      "Not suitable for small datasets due to its overhead",
      "Not an adaptive algorithm"
      ],
      "timeComplexity": "O(n log n)",
      "spaceComplexity": "O(1)",
      "applications": [
      "Priority queue implementations",
      "External sorting"
      ],
      "implementationDetails": {
      "algorithm": {
      "description": "Heap Sort uses a binary heap data structure.",
      "codeSnippet": "// Heap Sort\n\nfunction heapSort(arr) {\n const n = arr.length;\n\n // Build a max heap\n for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {\n heapify(arr, n, i);\n }\n\n // Extract elements from the heap one by one\n for (let i = n - 1; i > 0; i--) {\n // Swap the root (max element) with the last element\n const temp = arr[0];\n arr[0] = arr[i];\n arr[i] = temp;\n\n // Call max heapify on the reduced heap\n heapify(arr, i, 0);\n }\n}\n\nfunction heapify(arr, n, i) {\n let largest = i;\n const left = 2 * i + 1;\n const right = 2 * i + 2;\n\n if (left < n && arr[left] > arr[largest]) {\n largest = left;\n }\n\n if (right < n && arr[right] > arr[largest]) {\n largest = right;\n }\n\n if (largest !== i) {\n // Swap arr[i] and arr[largest]\n const temp = arr[i];\n arr[i] = arr[largest];\n arr[largest] = temp;\n\n // Recursively heapify the affected sub-tree\n heapify(arr, n, largest);\n }\n}"
      }
      }
      },
      {
      "name": "Counting Sort",
      "description": "Counting Sort is a non-comparison-based sorting algorithm that operates in linear time. It assumes that the input elements are integers within a specific range and uses counting arrays to determine the position of each element in the sorted output.",
      "advantages": [
      "Efficient for a range of input elements",
      "Linear time complexity"
      ],
      "disadvantages": [
      "Limited to integer inputs",
      "Requires additional space for counting arrays"
      ],
      "timeComplexity": "O(n + k)",
      "spaceComplexity": "O(k)",
      "applications": [
      "Sorting integers in a specific range",
      "Auxiliary sorting algorithm for other algorithms"
      ],
      "implementationDetails": {
      "algorithm": {
      "description": "Counting Sort uses counting arrays to determine element positions.",
      "codeSnippet": "// Counting Sort\n\nfunction countingSort(arr) {\n const n = arr.length;\n const output = new Array(n);\n\n // Find the maximum element in the input array\n const max = Math.max(...arr);\n\n // Initialize the count array\n const count = new Array(max + 1).fill(0);\n\n // Count the occurrences of each element\n for (let i = 0; i < n; i++) {\n count[arr[i]]++;\n }\n\n // Modify count array to store the position of each element\n for (let i = 1; i <= max; i++) {\n count[i] += count[i - 1];\n }\n\n // Build the output array\n for (let i = n - 1; i >= 0; i--) {\n output[count[arr[i]] - 1] = arr[i];\n count[arr[i]]--;\n }\n\n // Copy the output array to the original array\n for (let i = 0; i < n; i++) {\n arr[i] = output[i];\n }\n}"
      }
      }
      },
      {
      "name": "Radix Sort",
      "description": "Radix Sort is a non-comparison-based sorting algorithm that sorts integers by processing individual digits. It can be applied to integers of varying lengths, such as strings or fixed-size integers.",
      "advantages": [
      "Linear time complexity",
      "Suitable for fixed-size integers or strings"
      ],
      "disadvantages": [
      "Limited to specific types of inputs",
      "Not as space-efficient as other algorithms"
      ],
      "timeComplexity": "O(nk)",
      "spaceComplexity": "O(n + k)",
      "applications": [
      "Sorting integers or strings with fixed sizes",
      "Used as a stable sort when combined with another stable sortalgorithm"
    ],
    "implementationDetails": {
    "algorithm": {
    "description": "Radix Sort processes digits from the least significant to the most significant.",
    "codeSnippet": "// Radix Sort\n\nfunction radixSort(arr) {\n const max = Math.max(...arr);\n\n // Perform counting sort for each digit place\n for (let exp = 1; max / exp > 0; exp *= 10) {\n countingSortByDigit(arr, exp);\n }\n}\n\nfunction countingSortByDigit(arr, exp) {\n const n = arr.length;\n const output = new Array(n);\n const count = new Array(10).fill(0);\n\n // Count the occurrences of each digit at the current place\n for (let i = 0; i < n; i++) {\n const digit = Math.floor(arr[i] / exp) % 10;\n count[digit]++;\n }\n\n // Modify count array to store the position of each element\n for (let i = 1; i < 10; i++) {\n count[i] += count[i - 1];\n }\n\n // Build the output array, maintaining stability\n for (let i = n - 1; i >= 0; i--) {\n const digit = Math.floor(arr[i] / exp) % 10;\n output[count[digit] - 1] = arr[i];\n count[digit]--;\n }\n\n // Copy the output array to the original array\n for (let i = 0; i < n; i++) {\n arr[i] = output[i];\n }\n}"
    }
    }
    },
    {
    "name": "Bucket Sort",
    "description": "Bucket Sort is a distribution-based sorting algorithm that distributes elements into a number of buckets and then sorts each bucket individually. It is useful when the input is uniformly distributed over a range.",
    "advantages": [
    "Efficient for uniformly distributed input",
    "Linear time complexity on average"
    ],
    "disadvantages": [
    "Not suitable for highly skewed distributions",
    "Requires additional space for buckets"
    ],
    "timeComplexity": "O(n^2) worst-case, O(n + k) average",
    "spaceComplexity": "O(n + k)",
    "applications": [
    "Sorting elements uniformly distributed over a range",
    "Used when the input distribution is known and uniform"
    ],
    "implementationDetails": {
    "algorithm": {
    "description": "Bucket Sort divides the input into buckets and applies a sorting algorithm to each bucket.",
    "codeSnippet": "// Bucket Sort\n\nfunction bucketSort(arr) {\n const n = arr.length;\n const buckets = [];\n\n // Create empty buckets\n for (let i = 0; i < n; i++) {\n buckets[i] = [];\n }\n\n // Distribute elements into buckets\n for (let i = 0; i < n; i++) {\n const bucketIndex = Math.floor(n * arr[i]);\n buckets[bucketIndex].push(arr[i]);\n }\n\n // Sort each bucket individually (using another sorting algorithm)\n for (let i = 0; i < n; i++) {\n buckets[i].sort();\n }\n\n // Concatenate the sorted buckets to get the final sorted array\n return [].concat(...buckets);\n}"
    }
    }
    }
    ]
}