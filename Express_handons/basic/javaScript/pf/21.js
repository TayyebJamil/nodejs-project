// Reverse a string
function ReverseString(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

console.log(ReverseString("Hello World"));
// const str = "Hello World";
// const reversed = str.split("").reverse().join("");
// console.log(reversed);
