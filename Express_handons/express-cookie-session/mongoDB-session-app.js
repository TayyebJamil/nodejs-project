const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://tayyebjamil:123@my-cluster.d1wql.mongodb.net/?retryWrites=true&w=majority&appName=My-Cluster",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Configure express-session with MongoDB
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://tayyebjamil:123@my-cluster.d1wql.mongodb.net/?retryWrites=true&w=majority&appName=My-Cluster",
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Routes
app.get("/set-session", (req, res) => {
  req.session.user = { name: "Jane", role: "editor" };
  res.send("Session data stored in MongoDB!");
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

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
