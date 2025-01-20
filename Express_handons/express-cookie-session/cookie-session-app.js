const express = require("express");
const cookieSession = require("cookie-session");

const app = express();
const port = 3000;
app.use(
  cookieSession({
    name: "session",
    keys: ["secretKey1", "secretKey2"], // Encryption keys
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })
);

app.get("/set-cookie-session", (req, res) => {
  req.session.user = { name: "John", role: "admin" };
  res.send("Session data stored in cookie!");
});

app.get("/get-cookie-session", (req, res) => {
  if (req.session.user) {
    res.send(`Session Data: ${JSON.stringify(req.session.user)}`);
  } else {
    res.send("No session data found.");
  }
});

app.get("/clear-cookie-session", (req, res) => {
  req.session = null;
  res.send("Session cleared.");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
