const { error } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const faultyLibrary = require("non-existent-library");

// app.get("/", (req, res) => {
//   throw new Error("Something wrong happen");
// });

// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ error: err.message });
// });

// app.get("/", async (req, res, next) => {
//   try {
//     throw new Error("Async Error Occured");
//   } catch (error) {
//     next(error);
//   }
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send({ error: "Internal server Error" });
// });

// app.get("/", (req, res) => {
//   // Simulate an uncaught exception
//   throw new Error("Synchronous error occurred!");
// });

// process.on("uncaughtException", (err) => {
//   console.error("Uncaught Exception:", err.message);
//   process.exit(1); // Exit the process after logging the error
// });

// app.get("/", async (req, res) => {
//   const data = await Promise.reject("Async Error Occured !");
//   res.send(data);
// });

// process.on("unhandledRejection", (reason, promise) => {
//   console.error("Unhandeled Rejection :", reason.message || reason);
//   process.exit(1);
// });

// mongoose.connect("mongodb://invalid-url", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }); // This will fail

// app.get("/", (req, res) => {
//   res.send("App is running...");
// });

// process.on("unhandledRejection", (reason, promise) => {
//   console.error("Unhandled Rejection:", reason.message || reason);
//   process.exit(1);
// });

app.get("/", (req, res) => {
  res.send("This will not run because the app already crashed!");
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1); // Log the error and exit
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
