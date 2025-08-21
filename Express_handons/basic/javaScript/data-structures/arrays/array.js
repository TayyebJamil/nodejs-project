class customArray {
  constructor() {
    this.data = {};
    this.length = 0;
  }
  push(value) {
    this.data[this.length] = value;
    this.length++;
    return this.length;
  }
  pop() {
    if (this.length === 0) return undefined;
    const lastitems = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastitems;
  }
}
const arr = new customArray();
arr.push(1);
arr.push(2);
arr.pop();
console.log(arr);
