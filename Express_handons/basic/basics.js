// let name = "Tayyeb";
// const age = 25;
// const isActive = true;

// console.log(`Name : ${name},\nAge : ${age}, \nActive : ${isActive}`);

// function greet(name) {
//   return `Heloo, ${name}`;
// }

// console.log(greet("Tayyeb"));

// const greet = (name) => {
//   return `Helo ${name}`;
// };
// console.log(greet("Bhai"));

// const items = [1, `Mohsin`];
// items.forEach((item, inde) => console.log(inde, item));

// const car = {
//   make: "Toyota",
//   model: "Corolla",
//   year: "2019",
//   start() {
//     console.log(`${this.make} ${this.model} is starting .. `);
//   },
// };
// car.start();

// const fetchData = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject("Failure!.");
//     }, 2000);
//   });
// };

// async function fetchAndlog() {
//   try {
//     const result = await fetchData();
//     console.log(result);
//   } catch (error) {
//     console.error("Error", error);
//   }
// }

// fetchAndlog();

// const myPromise = new Promise((resolve, reject) => {
//   let success = true;
//   if (success) {
//     resolve("Promise Resolved");
//   } else {
//     reject("Promise Rejected");
//   }
// });
// myPromise
//   .then((result) => console.log(result))
//   .catch((result) => console.log(result));

// const fetchApicall = (SuccessData) => {
//   return new Promise((resolve, reject) => {
//     if (SuccessData) {
//       resolve({ data: `API Response Data : ${SuccessData}` });
//     } else {
//       reject("Data fetching Failure.");
//     }
//   });
// };

// async function fetchApiData() {
//   try {
//     console.log("Data Fetching .. ");
//     const response = await fetchApicall(12);
//     console.log(response.data);
//   } catch (error) {
//     console.log("Error:", error);
//   }
// }

// fetchApiData();

// const task1 = () =>
//   new Promise((resolve) => setTimeout(() => resolve("Task 1 Completed"), 1000));
// const task2 = new Promise((resolve) =>
//   setTimeout(() => resolve("Task 2 Completed"), 1000)
// );

// const runParallelTask = async () => {
//   console.log("Running Parallel Task ...");
//   const [result1, result2] = await Promise.all([task1(), task2]);
//   console.log("Data:", result1);
//   console.log("Data:", result2);
// };

// runParallelTask();
