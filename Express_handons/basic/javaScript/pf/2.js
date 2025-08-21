// Find Duplicate Elements

function findDuplicates(arr) {
  let seen = new Set();
  let duplicates = new Set();
  for (let num of arr) {
    if (seen.has(num)) {
      duplicates.add(num);
    } else {
      seen.add(num);
    }
  }
  return [...duplicates];
}

// Example
console.log(findDuplicates([1, 2, 3, 2, 4, 5, 6, 3, 7])); // Output: [2, 3]
