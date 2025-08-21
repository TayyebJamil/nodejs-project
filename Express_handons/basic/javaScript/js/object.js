let obj = { name: "Tayyeb", age: 25 };
// delete obj.city;
// console.log(obj.name, obj.city);

const { name, age, city = "Default" } = obj;
console.log(name, age, city);

// let users = [
//   { id: 1, name: "TJ", skills: ["Js", "Py"] },
//   { id: 2, name: "DJ", skills: ["music"] },
// ];

// const [{ name: firstname }, secondUser] = users;
// console.log(firstname, secondUser);
