// src/app.js
const express = require("express");
const app = express();
app.use(express.json());

const users = [{ id: 1, name: "John" }];

// GET /users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// POST /users
app.post("/users", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = app;
