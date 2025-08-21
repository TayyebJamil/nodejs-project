// Merge Two Sorted Lists

function mergeSortedLists(arr1, arr2) {
  let merged = [],
    i = 0,
    j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      merged.push(arr1[i++]);
    } else {
      merged.push(arr2[j++]);
    }
  }
  return merged.concat(arr1.slice(i), arr2.slice(j));
}

// Example
console.log(mergeSortedLists([1, 3, 5], [2, 4, 6])); // Output: [1, 2, 3, 4, 5, 6]
