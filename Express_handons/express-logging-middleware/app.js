const express = require("express");
const app = express();

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url} ooo`);
//   next();
// });

// app.get("/", (req, res) => {
//   res.send("Home Page");
// });

// app.use((req, res, next) => {
//   console.log("Middleware 2");
//   next();
// });
// app.use((req, res, next) => {
//   console.log("Middleware 1");
//   next();
// });

// app.use((req, res, next) => {
//   next(new Error("Something went wrong!")); // Pass an error
// });

// Error-handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.message);
//   res.status(500).send("Server Error!");
//   // next();
// });

// app.get("/", (req, res) => {
//   console.log("Route Handler");
//   res.send("Hello, World!");
// });

app.use("/user", (req, res, next) => {
  console.log("Middleware at user level /user");
  next();
});

app.get("/user/profile", (req, res) => {
  res.send("User profile");
});
app.listen(3000);
