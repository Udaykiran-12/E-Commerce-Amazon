require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");

const Products = require("./models/productsSchema");
const Defaultdata = require("./defualtData");
const cors = require("cors");
const router = require("./routes/router");
const cookieParser = require("cookie-parser");

// ✅ Enable cookie parsing and JSON
app.use(cookieParser());
app.use(express.json());

// ✅ Fix CORS headers completely
app.use(
  cors({
    origin: "https://e-commerce-amazon1.onrender.com", // your frontend URL
    credentials: true,
  })
);

// ✅ Add CORS headers to all responses (important for Render sometimes)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://e-commerce-amazon1.onrender.com");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ✅ Use your routes
app.use(router);

// ✅ Default API route
app.get("/", (req, res) => {
  res.send("✅ API is working!");
});

// ✅ Start server
const port = process.env.PORT || 8005;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

// ✅ DB seeding
Defaultdata().catch((err) => console.error("Error in Defaultdata:", err));
