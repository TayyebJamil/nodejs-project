// Check If a Number Is Prime
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// Example
console.log(isPrime(7)); // Output: true
console.log(isPrime(10)); // Output: false
