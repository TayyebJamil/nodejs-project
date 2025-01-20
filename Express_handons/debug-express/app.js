const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url} ${JSON.stringify(
      req.body
    )}`
  );
  next();
});

// Sample in-memory database
const users = [];

// Routes
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// app.post("/users", (req, res) => {
//   const { name, age } = req.body;
//   if (!name || !age) {
//     return res.status(400).json({ error: "Name and age are required!" });
//   }
//   const newUser = { id: users.length + 1, name, age };
//   users.push(newUser);
//   res.status(201).json(newUser);
// });

app.post("/users", async (req, res) => {
  const { name, age } = req.body;
  const newUser = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: users.length + 1, name, age });
    }, 10000);
  });
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/error", (req, res) => {
  console.log("error<<<");
  // try {
  //   throw new Error("Simulated error!");
  // } catch (error) {
  //   console.error("Caught Error by try catch", error.message);
  //   throw error;
  debugger;
  throw new Error("Simulated error!");
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
