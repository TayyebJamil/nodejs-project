// Factorial
function factorial(num) {
  result = 1;
  for (let i = 2; i <= num; i++) result *= i;
  return result;
}
console.log(factorial(3));
