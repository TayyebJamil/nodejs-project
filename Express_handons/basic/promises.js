function fetchData() {
  return new Promise((resolve, reject) => {
    console.log("processing starts ...");

    setTimeout(() => {
      resolve("userData: ...");
    }, 2000);
  });
}

fetchData()
  .then((data) => {
    console.log(`User data fetched : ${data}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`Proceseed User ... `);
      }, 2000);
    });
  })
  .then((message) => {
    console.log(message);
    console.log("processing Complete . ");
  });
