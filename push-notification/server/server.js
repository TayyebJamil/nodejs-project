const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(bodyParser.json());

// Endpoint to Send Notifications
app.post("/send-notification", async (req, res) => {
  const { token, title, body } = req.body;

  // Construct the message
  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    res
      .status(200)
      .send({ message: "Notification sent successfully!", response });
  } catch (error) {
    console.error("Error sending notification:", error);
    res
      .status(500)
      .send({ error: "Failed to send notification", details: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
