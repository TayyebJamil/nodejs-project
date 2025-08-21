// Problem 1: Find First Non-Repeating Character (Easy)
// 📌 Problem Statement:
// Given a string, return the first non-repeating character. If all characters repeat, return null.

// 🔹 Example:
// Edit
// Input: "aabbcde"
// Output: "c"
// Edit
// Input: "aabb"
// Output: null

// ✅ Step 1: Choose the Best Technique
// We need to count character occurrences and find the first one that appears once.
// Best technique: Hashing (HashMap) → O(N) time
s = "abbcde";
function firstNonRepeating(s) {
  let freq = new Map();
  for (let char of s) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }
  for (let char of s) {
    if (freq.get(char) === 1) return char;
  }
  return false;
}
console.log(firstNonRepeating(s));
