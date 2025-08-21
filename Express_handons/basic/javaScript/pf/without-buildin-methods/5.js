// count vowels
function countVowels(str) {
  count = 0;
  vowels = "aeiouAEIOU";
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < vowels.length; j++) {
      if (str[i] == vowels[j]) {
        count++;
        break;
      }
    }
  }
  return count;
}

console.log(countVowels("aeiou"));
