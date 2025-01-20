const express = require("express");
const session = require("express-session");

const app = express();
const port = 3000;

app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.use((req, res, next) => {
  console.log("Session Data:", req.session);
  next();
});

app.get("/set-session", (req, res) => {
  req.session.user = { name: "Jane", role: "editor" };
  res.send("Session data stored server-side!");
});

app.get("/get-session", (req, res) => {
  if (req.session.user) {
    res.send(`Session Data: ${JSON.stringify(req.session.user)}`);
  } else {
    res.send("No session data found.");
  }
});

app.get("/clear-session", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send("Error clearing session.");
    } else {
      res.send("Session cleared.");
    }
  });
});

app.listen(port);
