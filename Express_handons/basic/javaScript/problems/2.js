// #  Problem 4: Valid Parentheses (Easy)
// # 📌 Problem Statement:
// # Check if a string of brackets is valid.

// # Input: "()[]{}"
// # Output: true

// # Input: "(]"
// # Output: false

// # Step 1: Choose the Best Technique
// # We need to track open brackets and match them correctly.
// # Best technique: Stack (LIFO) → O(N) time

function isValid(s) {
  let stack = [];
  let map = { ")": "(", "}": "{", "]": "[" };

  for (let char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}

console.log(isValid("()[]{}")); // true
console.log(isValid("(]")); // false
