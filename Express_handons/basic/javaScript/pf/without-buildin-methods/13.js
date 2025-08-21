
// 22. Find second largest number
function secondLargest(arr) {
    let max = -Infinity, second = -Infinity;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > max) {
        second = max;
        max = arr[i];
      } else if (arr[i] > second && arr[i] < max) {
        second = arr[i];
      }
    }
    return second;
  }
  
  // 23. Left rotate array by 1
  function leftRotateByOne(arr) {
    let first = arr[0];
    for (let i = 0; i < arr.length - 1; i++) {
      arr[i] = arr[i + 1];
    }
    arr[arr.length - 1] = first;
    return arr;
  }
  
  // 24. Right rotate array by 1
  function rightRotateByOne(arr) {
    let last = arr[arr.length - 1];
    for (let i = arr.length - 1; i > 0; i--) {
      arr[i] = arr[i - 1];
    }
    arr[0] = last;
    return arr;
  }
  
  // 25. Insert element at index
  function insertAt(arr, index, value) {
    for (let i = arr.length; i > index; i--) {
      arr[i] = arr[i - 1];
    }
    arr[index] = value;
    return arr;
  }
  