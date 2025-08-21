// 3️⃣ Sliding Window Approach
// 🔹 Concept:
// Instead of checking all subarrays, maintain a "window" that moves dynamically.
// Works well for contiguous subarray problems.
// 📌 When to Use?
// When dealing with subarrays or continuous sequences.
// When finding maximum/minimum sum or length.
// When reducing nested loops (O(N²) → O(N)).
// ⏳ Time Complexity: O(N)
// Example Problem:
// Find the maximum sum of k consecutive elements.

// The hashing approach is a technique that uses a hash table (or hash map) to efficiently store and retrieve data. It is widely used in searching, counting, and detecting duplicates due to its O(1) average time complexity for insert, delete, and lookup operations.

function maxSubarraySum(arr, k) {
  let maxSum = 0,
    windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i];

  maxSum = windowSum;
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}
console.log(maxSubarraySum([2, 3, 4, 1, 5], 2)); // 7
