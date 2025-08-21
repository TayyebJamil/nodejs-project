console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");
}, 0);

setImmediate(() => {
  console.log("Immediate 1");
});

Promise.resolve().then(() => {
  console.log("Promise 1");
});

process.nextTick(() => {
  console.log("Next Tick 1");
});

console.log("End");
