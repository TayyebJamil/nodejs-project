// Generate Fibonacci Sequence

function fibonacci(n) {
  let sequence = [0, 1];
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
}

// Example
console.log(fibonacci(7)); // Output: [0, 1, 1, 2, 3, 5, 8]
