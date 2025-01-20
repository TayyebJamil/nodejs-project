const { add, subtract } = require("./math");

describe("Math functions", () => {
  test("Add 2 + 3 equal to 5", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("throws error if inputs are not numbers", () => {
    expect(() => add(2, "a")).toThrow("Inputs must be number");
  });

  test("subtracts 5 - 3 to equal 2", () => {
    expect(subtract(5, 3)).toBe(2);
  });
});
