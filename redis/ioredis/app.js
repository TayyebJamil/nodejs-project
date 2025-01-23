const Redis = require("ioredis");
const redis = new Redis(); // Default connects to localhost:6379

(async () => {
  try {
    await redis.set("firstname", "Tayyeb");

    const value = await redis.get("firstname");
    console.log("Value:", value); // Output: exampleValue

    // await redis.del("firstname");

    // console.log("Key deleted");
  } catch (error) {
    console.error("Redis error:", error);
  } finally {
    redis.disconnect();
  }
})();
