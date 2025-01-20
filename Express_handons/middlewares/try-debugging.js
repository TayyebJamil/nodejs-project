const express = require("express");
const app = express();

app.use(express.json()); // Middleware to parse JSON

// Route to get all items
app.get("/items", (req, res) => {
  res.json({ message: "List of items" });
});

// Route to create an item
app.post("/items", (req, res) => {
  const newItem = req.body;
  console.log("New Item:", newItem); // Debugging output
  res.status(201).json({ message: "Item created", data: newItem });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
