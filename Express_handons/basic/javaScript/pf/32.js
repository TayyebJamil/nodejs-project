// Multiplication table

// Iterative approach
function printTable(n) {
  for (let i = 1; i <= 10; i++) {
    console.log(`${n} x ${i} = ${n * i}`);
  }
}
let number = 7;
// printTable(number);

//recursive approach
function printTableRecursive(n, i) {
  if(i==11)
    return
  console.log(`${n} x ${i} = ${n * i}`);
  i++;
  printTableRecursive(n, i);
}
printTableRecursive(number, 1);