function removeVowels(str) {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  let result = '';

  for (let i = 0; i < str.length; i++) {
    let isVowel = false;

    // Check if str[i] is a vowel by comparing manually
    for (let j = 0; j < vowels.length; j++) {
      if (str[i] === vowels[j]) {
        isVowel = true;
        break;
      }
    }

    if (!isVowel) {
      result += str[i];
    }
  }

  return result;
}
