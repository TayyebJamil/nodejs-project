// Find the Factorial of a Number

function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

// Example
console.log(factorial(5)); // Output: 120
