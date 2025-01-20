const express = require("express");
const app = express();
const port = 3000;
const router = express.Router();
let a = 10;
// predicate the router with a check and bail out when needed
router.use((req, res, next) => {
  if (req.headers["x-auth"] !== "my-static-token") return next("router");
  next();
});

router.get("/user/:id", (req, res) => {
  res.send("hello, user!");
});

// use the router and 401 anything falling through
app.use("/admin", router, (req, res) => {
  res.sendStatus(401);
});
app.listen(port);
