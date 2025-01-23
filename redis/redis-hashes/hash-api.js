const express = require("express");
const bodyParser = require("body-parser");
const { createClient } = require("redis");

const app = express();
app.use(bodyParser.json());

const redisClient = createClient();
redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await redisClient.connect();
  console.log("Connected to Redis");
})();

const CACHE_EXPIRATION = 60;

app.post("/api/store", async (req, res) => {
  try {
    const { socketId, businessId, providerIds, date } = req.body;

    if (!socketId || !businessId || !providerIds || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Prepare data for Redis hash
    const redisKey = `business:${businessId}`;
    await redisClient.hSet(redisKey, {
      socketId: socketId.toString(),
      businessId: businessId.toString(),
      providerIds: JSON.stringify(providerIds),
      date,
    });
    res
      .status(200)
      .json({ message: "Data stored successfully", key: redisKey });
    console.log("Data stored successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/retrieve/:businessId", async (req, res) => {
  try {
    const { businessId } = req.params;
    const redisKey = `business:${businessId}`;
    const cacheKey = `cache:${redisKey}`;

    // Check cache first
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit");
      return res.status(200).json({ data: JSON.parse(cachedData) });
    }

    console.log("Cache miss");

    // If not in cache, fetch from "database" (Redis Hash)
    const data = await redisClient.hGetAll(redisKey);
    if (!data || Object.keys(data).length === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    // Parse providerIds back to an array
    data.providerIds = JSON.parse(data.providerIds);

    // Cache the data with expiration
    await redisClient.setEx(cacheKey, CACHE_EXPIRATION, JSON.stringify(data));

    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/delete/:businessId", async (req, res) => {
  try {
    const { businessId } = req.params;
    const redisKey = `business:${businessId}`;
    const cacheKey = `cache:${redisKey}`;

    // Check if the key exists
    const exists = await redisClient.exists(redisKey);
    if (exists === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    // Delete from Redis hash (entire key)
    await redisClient.del(redisKey);

    // Delete from cache
    await redisClient.del(cacheKey);

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
