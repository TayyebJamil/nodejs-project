const express = require("express");
const { createClient } = require("redis");
const app = express();
const client = createClient(); // Redis client for connecting

app.use(express.json());

client.on("error", (err) => console.log("Redis error: " + err));

// Connect Redis
client.connect();

// Create and Store Products in Redis (Database)
app.post("/product", async (req, res) => {
  const { id, name, price } = req.body;

  try {
    // Store product in Redis hash (database)
    await client.hSet(
      "hash-products",
      `hash-product:${id}`,
      JSON.stringify({ id, name, price })
    );
    res.status(201).send("Product added.");
  } catch (err) {
    res.status(500).send("Error storing product.");
  }
});

// Cache Product Data in Redis
app.get("/product/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    // Check cache first
    const cacheData = await client.get(`cache-product:${productId}`);
    if (cacheData) {
      console.log("Cache hit");
      return res.json(JSON.parse(cacheData));
    }

    // If not in cache, fetch from "database" (Redis Hash)
    const product = await client.hGet(
      "hash-products",
      `hash-product:${productId}`
    );
    if (!product) {
      return res.status(404).send("Product not found.");
    }

    // Cache the product for future requests
    await client.setEx(`cache-product:${productId}`, 3600, product); // Cache for 1 hour
    // await client.hSet("cache-products", `cache-product:${productId}`, product);
    console.log("Cache miss");
    res.json(JSON.parse(product));
  } catch (err) {
    res.status(500).send("Error retrieving product.");
  }
});

// Delete Product from Catalog (Redis DB and Cache)
app.delete("/product/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    // Delete from Redis hash (database)
    await client.hDel("hash-products", `hash-product:${productId}`);

    // Also delete from cache
    await client.del(`cache-product:${productId}`);

    res.send("Product deleted.");
  } catch (err) {
    res.status(500).send("Error deleting product.");
  }
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
