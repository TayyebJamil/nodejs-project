// 1️⃣ Brute Force (Trial & Error)
// Concept: Try all possible solutions.
// When to Use: If constraints are small (≤
// 10
// 3
// 10
// 3
//  ).
// Example Problem: Find all pairs in an array that sum to a given target.
// 📝 Problem:
// Given arr = [2, 7, 11, 15] and target = 9, find a pair (a, b) such that a + b = target.
arr = [2, 11, 7, 15];
target = 9;
// function twoSumBruteForce(arr, target) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[i] + arr[j] === target) {
//         return [i, j];
//       }
//     }
//   }
//   return [i, j];
// }
// console.log(twoSumBruteForce(arr, target));

// Time Complexity:
// 𝑂
// (
// 𝑁
// 2
// )
// O(N
// 2
//  ) (nested loops)

// Optimized Approach: Hashing (O(N))

function twoSumOptimized(arr, target) {
  let map = new Map();
  for (let i = 0; i < arr.length; i++) {
    let complement = target - arr[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(arr[i], i);
  }
  return [];
}

console.log(twoSumOptimized(arr, target));
