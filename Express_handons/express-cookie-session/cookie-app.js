const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

app.use(cookieParser());

app.get("/set-cookie", (req, res) => {
  res.cookie("username", "tayyeb", { httpOnly: true, maxAge: 60000 });
  res.send("Cookie set: username=tayyeb");
});

app.get("/get-cookie", (req, res) => {
  const username = req.cookies.username;
  if (username) {
    res.send(`Cookie value: ${username}`);
  } else {
    res.send("No cookies found.");
  }
});

app.get("/clear-cookie", (req, res) => {
  res.clearCookie("username");
  res.send("Cookie cleared.");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
