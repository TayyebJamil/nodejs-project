// Question 1: Group Anagrams
// Problem:
// Given an array of strings strs, group the anagrams together.

// Example:

// js
// Copy
// Edit
// Input: ["eat", "tea", "tan", "ate", "nat", "bat"]
// Output: [["eat","tea","ate"],["tan","nat"],["bat"]]

function removeDp(str) {
  let result = "";
  for (let i = 0; i <= str.length; i++) {
    let isDuplicate = false;
    for (let j = 0; j <= result.length; j++) {
      if (str[i] === result[j]) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      result += str[i];
    }
  }
  return result;
}

console.log(removeDp("Tayyebb"));
