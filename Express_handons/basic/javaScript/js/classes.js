class user {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(`Name is: ${this.name}`);
  }
}
user = new user("Tayyeb");
user.sayHi();
