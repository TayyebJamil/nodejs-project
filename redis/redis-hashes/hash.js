// const redis = require("redis");

// const client = redis.createClient();

// client
//   .connect()
//   .then(() => console.log("Connected to Redis"))
//   .catch(console.error);

// const data = {
//   socketId: 123,
//   businessId: 1,
//   providerIds: [1, 2, 3, 4, 5, 6, 7, 8],
//   date: "2025-22-01",
// };

// async function storeData(key, data) {
//   try {
//     const { providerIds, ...hashData } = data;
//     await client.hSet(key, {
//       ...hashData,
//       providerIds: providerIds.join(","), // Save array as a comma-separated string
//     });
//     console.log(`Data stored under key: ${key}`);
//   } catch (error) {
//     console.error("Error storing data:", error);
//   }
// }

// // Function to retrieve and parse the object from Redis
// async function getData(key) {
//   try {
//     const result = await client.hGetAll(key);
//     if (Object.keys(result).length === 0) {
//       console.log("No data found for the key:", key);
//       return null;
//     }

//     // Parse providerIds back into an array
//     result.providerIds = result.providerIds.split(",").map(Number);
//     result.socketId = parseInt(result.socketId, 10);
//     result.businessId = parseInt(result.businessId, 10);
//     console.log("Retrieved data:", result);
//     return result;
//   } catch (error) {
//     console.error("Error retrieving data:", error);
//   }
// }

// // Key for Redis hash
// const redisKey = "object:123";

// // Store and retrieve the data
// (async () => {
//   await storeData(redisKey, data);
//   await getData(redisKey);

//   // Disconnect from Redis
//   await client.quit();
// })();

const redis = require("redis");

const client = redis.createClient();

client
  .connect()
  .then(() => console.log("Connected to Redis"))
  .catch(console.error);

const data = {
  socketId: 123,
  businessId: 1,
  providerIds: [1, 2, 3, 4, 5, 6, 7, 8],
  date: "2025-22-01",
};

async function storeData(key, data) {
  try {
    await client.set(key, JSON.stringify(data)); // Store as JSON
    console.log(`Data stored under key: ${key}`);
  } catch (error) {
    console.error(`Error storing data under key ${key}:`, error);
  }
}

async function getData(key) {
  try {
    const result = await client.get(key);
    if (!result) {
      console.log("No data found for the key:", key);
      return null;
    }

    const parsedData = JSON.parse(result); // Parse JSON back into an object
    console.log("Retrieved data:", parsedData);
    return parsedData;
  } catch (error) {
    console.error(`Error retrieving data from key ${key}:`, error);
  }
}

const redisKey = "object:123";

(async () => {
  await storeData(redisKey, data);
  await getData(redisKey);

  await client.quit();
})();
