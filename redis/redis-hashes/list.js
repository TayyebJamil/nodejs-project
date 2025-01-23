const redis = require("redis");
const client = redis.createClient();

client
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch(console.error);

const providerIds = [1, 2, 3, 4, 5, 6, 7, 8];

async function storeProviderIds(key, providerIds) {
  try {
    // Push all elements to the list

    for (const id of providerIds) {
      await client.rPush(key, id.toString());
    }
    console.log(`Provider IDs stored under key: ${key}`);
  } catch (error) {
    console.error("Error storing provider IDs:", error);
  }
}

async function getProviderIds(key) {
  try {
    const result = await client.lRange(key, 0, -1);
    console.log("Retrieved provider IDs:", result);
    return result.map(Number); // Convert strings back to numbers
  } catch (error) {
    console.error("Error retrieving provider IDs:", error);
  }
}

const redisKey = "providerIds:list";
(async () => {
  await storeProviderIds(redisKey, providerIds);
  await getProviderIds(redisKey);

  await client.quit();
})();
