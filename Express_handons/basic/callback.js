function calculate(a, b, callback) {
  return callback(a, b);
}

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

console.log(`Youe calculate is : ${calculate(2, 3, add)}`);
