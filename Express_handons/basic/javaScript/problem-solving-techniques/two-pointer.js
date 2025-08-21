// 2️⃣ Two Pointers Approach
// 🔹 Concept:
// Use two pointers to traverse the array efficiently.
// One pointer starts from the left, the other from the right.
// 📌 When to Use?
// When the array is sorted.
// When you need to find pairs, triplets, or closest values.
// Works well for binary search-like problems.
// ⏳ Time Complexity: O(N)

// Example Problem:
// Find two numbers that sum up to a given target in a sorted array.
arr = [2, 11, 7, 15];
target = 9;
function twoSumTwoPointer(arr, target) {
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    else if (sum < target) left++;
    else right--;
  }
}
console.log(twoSumTwoPointer(arr, target));
