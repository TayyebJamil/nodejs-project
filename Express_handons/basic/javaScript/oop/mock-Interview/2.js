// How would you implement encapsulation in JavaScript?
// Show an example of polymorphism in JS.
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a noise`;
  }
}
class Dog extends Animal {
  speak() {
    return `${this.name} barks`;
  }
}

class Cat extends Animal {
  speak() {
    return `${this.name} meows`;
  }
}
const animals = [new Dog('dog'), new Cat('cat')];
animals.forEach((animal) => console.log(animal.speak())); // Output: dog barks, cat meows