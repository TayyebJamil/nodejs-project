class car {
  constructor(name, model, color) {
    this.name = name;
    this.model = model;
    this.color = color;
  }
  display() {
    console.log(
      `Car having name ${this.name} model ${this.model} and color ${this.color} `
    );
  }
}

const myCar = new car("Toyota", "2016", "Gray");
myCar.display();
