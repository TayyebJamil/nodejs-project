//structuring
let arr = [1, 2, 3, 4, 5];
// arr.push(6);
// arr.pop();
// arr.unshift(0);
// arr.shift();

//destructuring
const [first, second, ...rest] = arr;

console.log(first, second, rest);
