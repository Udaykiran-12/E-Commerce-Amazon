require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");

const Products = require("./models/productsSchema");
const Defaultdata = require("./defualtData");
const cors = require("cors");
const router = require("./routes/router")
const cookieParser = require("cookie-parser");

app.use(express.json())
app.use(cookieParser(""))
app.use(cors());
app.use(router);

const port = process.env.PORT || 8005;

app.listen(port , () =>{
    console.log(`Server is running at port ${port}`);
});

Defaultdata();