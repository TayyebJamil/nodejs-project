let target = { a: 1, b: 2 };
let source = { b: 3, c: 4 };
let mergedObject = Object.assign({}, target, source);
console.log(mergedObject);
