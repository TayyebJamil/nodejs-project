// Divide & Conquer
// Concept: Break the problem into smaller subproblems and merge results.
// Example Problem: Merge Sort
// 🟢 Merge Sort (O(N log N))
//

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let sorted = [],
    i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    sorted.push(left[i] < right[j] ? left[i++] : right[j++]);
  }
  return [...sorted, ...left.slice(i), ...right.slice(j)];
}

console.log(mergeSort([3, 1, 4, 1, 5, 9, 2, 6]));
// Output: [1, 1, 2, 3, 4, 5, 6, 9]
