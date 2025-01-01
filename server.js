const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

dotenv.config();

connectDB();

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send(
    "Welcome to the Role-Based Authentication and Product Management System API"
  );
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("uncaughtException", (error) => {
  console.log("error", error);
});

console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
