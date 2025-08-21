// 8. GCD of two numbers
function gcd(a, b) {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
  
  // 9. LCM using GCD
  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }