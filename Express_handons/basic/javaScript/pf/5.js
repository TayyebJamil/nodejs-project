// Find the Second Largest Number

function secondLargest(arr) {
  let first = -Infinity,
    second = -Infinity;
  for (let num of arr) {
    if (num > first) {
      second = first;
      first = num;
    } else if (num > second && num !== first) {
      second = num;
    }
  }
  return second;
}

// Example
console.log(secondLargest([10, 20, 4, 45, 99])); // Output: 45
