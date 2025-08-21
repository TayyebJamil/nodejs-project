// Getters and setters (accessors and mutators).
class Person {
  constructor(name, age) {
    this._name = name; // Use _name to indicate it's a "private" variable
    this._age = age;
  }

  // Getter for name (accessor)
  get name() {
    return this._name;
  }

  // Setter for name (mutator)
  set name(newName) {
    if (typeof newName === "string" && newName.length > 0) {
      this._name = newName;
    } else {
      console.log("Invalid name!");
    }
  }

  // Getter for age (accessor)
  get age() {
    return this._age;
  }

  // Setter for age (mutator)
  set age(newAge) {
    if (typeof newAge === "number" && newAge > 0) {
      this._age = newAge;
    } else {
      console.log("Invalid age!");
    }
  }
}

// Usage
const person = new Person("Alice", 25);

console.log(person.name); // Gets the name (Alice)
person.name = "Bob"; // Sets the name to Bob
console.log(person.name); // Bob

console.log(person.age); // 25
person.age = 30; // Valid age
console.log(person.age); // 30

person.age = -5; // Invalid age!
