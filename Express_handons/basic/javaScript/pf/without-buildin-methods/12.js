// find max in array
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i <= arr.length - 1; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}
// console.log(findMax([1, 2, 3, 7]));

function reverseArray(arr) {
  let rev = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    rev.push(arr[i]);
  }
  return rev;
}
console.log(reverseArray([1, 2, 3, 4]));
