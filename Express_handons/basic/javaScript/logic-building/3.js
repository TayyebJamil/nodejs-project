function isPalindrome(num) {
  const original = num.toString();
  const reversed = original.split("").reverse().join("");
  return original === reversed;
}
console.log(isPalindrome(121));
