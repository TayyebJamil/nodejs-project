// sum of all Elements
function sumALL(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
  }
  return sum;
}
console.log(sumALL([3, 2, 1]));
