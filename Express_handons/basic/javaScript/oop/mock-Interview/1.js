// Design a class hierarchy for vehicles (Car, Bike, Truck).
// What properties and methods would you add?
class Vehical {
  constructor(name, wheel) {
    (this.name = name), (this.wheel = wheel);
  }
  info() {
    return `Name: ${this.name} wheel: ${this.wheel}`;
  }
}

class Car extends Vehical {
  constructor(brand, model) {
    super("Car", 4);
    (this.brand = brand), (this.model = model);
  }
  info() {
    return `Name: ${this.name} wheel: ${this.wheel} brand: ${this.brand} model: ${this.model}`;
  }
}

class Bike extends Vehical {
  constructor(brand, model) {
    super("Bike", 2);
    (this.brand = brand), (this.model = model);
  }
  info() {
    return `Name: ${this.name} wheel: ${this.wheel} brand: ${this.brand} model: ${this.model}`;
  }
}

class truck extends Vehical {
  constructor(brand, capacity) {
    super("Truck", 8);
    (this.brand = brand), (this.capacity = capacity);
  }
  info() {
    return `Name: ${this.name} wheel: ${this.wheel} brand: ${this.brand} capacity: ${this.capacity}`;
  }
}

const car = new Car("BMW", "X6");
const bike = new Bike("Honda", "CBR");
const truck = new truck("Ford", 10000);

console.log(car.info());
console.log(bike.info());
console.log(truck.info());
