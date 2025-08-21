// constructor function
function PersonFunc(name) {
  this.name = name;
}
PersonFunc.prototype.sayHello = function () {
  console.log("Hello, " + this.name);
};
var person1 = new PersonFunc("John");
person1.sayHello();

// Es6 class
class Person {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    console.log("Hello, " + this.name);
  }
}
var person2 = new Person("John");
person2.sayHello();
