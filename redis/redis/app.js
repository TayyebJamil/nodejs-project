// const { createClient } = require("redis");
// const client = createClient();

// client.on("error", (err) => console.error("Redis Client Error", err));

// (async () => {
//   try {
//     await client.connect();

//     // Set a key-value pair
//     await client.set("lastname", "jamil");

//     // Retrieve the value
//     const value = await client.get("lastname");
//     console.log("Value:", value); // Output: exampleValue

//     // Delete the key
//     // await client.del("lastname");

//     // console.log("Key deleted");
//   } catch (error) {
//     console.error("Redis error:", error);
//   } finally {
//     await client.disconnect();
//   }
// })();

const { createClient } = require("redis");

// Create a Redis client
const client = createClient({
  username: "default",
  password: "8uvFITbKiPfakgRNUPLa3ACnOU70cvCw",
  socket: {
    host: "redis-11447.c251.east-us-mz.azure.redns.redis-cloud.com",
    port: 11447,
  },
});

// Handle Redis client errors
client.on("error", (err) => {
  console.log("Redis Client Error:", err);
});

// Connect to Redis
async function connectRedis() {
  try {
    await client.connect();
    console.log("Connected to Redis");

    // Set a key-value pair in Redis
    await client.set("greet", "Hello, Tayyeb!");
    console.log("Data added: greet = Hello, Tayyeb!");

    // Retrieve the value of the key
    const value = await client.get("greet");
    console.log("Retrieved value:", value); // Expected output: Hello, Redis!

    // Optionally, close the connection after operations
    await client.quit();
    console.log("Connection closed");
  } catch (err) {
    console.error("Error while connecting to Redis:", err);
  }
}

// Run the Redis operations
connectRedis();
