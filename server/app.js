require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("./db/conn");
const Products = require("./models/productsSchema");
const Defaultdata = require("./defualtData");
const router = require("./routes/router");

const app = express();
const PORT = process.env.PORT || 8005;

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Setup
app.use(cors({
  origin: "https://e-commerce-amazon1.onrender.com", // your frontend domain
  credentials: true
}));

// Manually set headers for all responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://e-commerce-amazon1.onrender.com");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});



// Routes
app.use(router);

// Root route
app.get("/", (req, res) => {
  res.send("✅ API is working!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at port ${PORT}`);
});

// Seed initial data
Defaultdata().catch((err) => console.error("Error in Defaultdata:", err));
