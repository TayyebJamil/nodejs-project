// Implement a singleton pattern in JavaScript.
class Singleton {
    static #instance;
    constructor() {
      if (Singleton.#instance) return Singleton.#instance;
      Singleton.#instance = this;
      this.value = Math.random();
    }
  }
  const s1 = new Singleton();
  const s2 = new Singleton();
  console.log(s1 === s2); // true
  console.log(s1.value === s2.value); // true