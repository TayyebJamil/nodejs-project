// How would you add reusable behavior to unrelated classes? (Mixin pattern)
const canEat = {
  eat() {
    return `${this.name} is eating`;
  },
};

const canWalk = {
  walk() {
    return `${this.name} is walking`;
  },
};

class Person {
  constructor(name) {
    this.name = name;
  }
}
Object.assign(Person.prototype, canEat, canWalk);
const person = new Person("Ali");
console.log(person.eat());
console.log(person.walk());
