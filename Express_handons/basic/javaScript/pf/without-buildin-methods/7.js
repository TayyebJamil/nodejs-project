// Fibonacci
function fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let a = 0,
    b = 1;

  for (let i = 2; i <= n; i++) {
    tem = a + b;
    a = b;
    b = tem;
  }
  return b;
}
console.log(fibonacci(6));
