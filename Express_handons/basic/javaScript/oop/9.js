const canBark = (state) => ({
  bark: () => console.log(`${state.name} barks!`),
});

const canRun = (state) => ({
  run: () => console.log(`${state.name} runs!`),
});

function Dog(name) {
  const state = { name };
  return Object.assign({}, canBark(state), canRun(state));
}

const dog = Dog("Buddy");
dog.bark(); // Buddy barks!
dog.run(); // Buddy runs!
