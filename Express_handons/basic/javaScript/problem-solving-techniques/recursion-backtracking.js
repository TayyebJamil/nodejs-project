// Concept:
// Recursion: Solve a problem by breaking it into smaller subproblems.
// Backtracking: Try all possibilities, but backtrack if a path fails.
// 📌 When to Use?
// When the problem can be broken down into small

// Recursion & Backtracking
// Concept: Solve problems by breaking them into smaller subproblems.
// Example Problem: Print all subsets of an array.
// 🟢 Recursive Backtracking Approach
function findSubsets(arr, index = 0, current = [], result = []) {
  if (index === arr.length) {
    result.push([...current]);
    return;
  }

  // Include the element
  findSubsets(arr, index + 1, [...current, arr[index]], result);
  // Exclude the element
  findSubsets(arr, index + 1, current, result);

  return result;
}

console.log(findSubsets([1, 2, 3]));
// Output: [[], [3], [2], [2,3], [1], [1,3], [1,2], [1,2,3]]
