// How can you simulate abstract classes in JavaScript?
class AbstractClass {
  constructor() {
    if (new.target === AbstractClass) {
      throw new Error("Can't instantiate abstract class.");
    }
  }
  area() {
    throw new Error("Method 'area' must be implemented.");
  }
}
class square extends AbstractClass {
  constructor(length) {
    super();
    this.length = length;
  }
  area() {
    return this.length * this.length;
  }
}
const square1 = new square(5);
console.log(square1.area());
