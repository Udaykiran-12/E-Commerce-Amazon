const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenicate = require("../middleware/authenticate");

// Get All Products
router.get("/getproducts", async (req, res) => {
  try {
    const data = await Products.find();
    res.status(201).json(data);
  } catch (error) {
    res.status(422).json({ error: "Something went wrong" });
  }
});

// Get Individual Product
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Products.findOne({ id });
    res.status(201).json(data);
  } catch (error) {
    res.status(422).json({ error: "Something went wrong" });
  }
});

// User Registration
router.post("/register", async (req, res) => {
  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    return res.status(422).json({ error: "Fill all the data" });
  }

  try {
    const preUser = await User.findOne({ email });
    const mob = await User.findOne({ mobile });

    if (preUser || mob) {
      return res.status(422).json({ error: "User already present" });
    }

    if (password !== cpassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    }

    const finalUser = new User({ fname, email, mobile, password, cpassword });
    const storedata = await finalUser.save();

    res.status(201).json(storedata);
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Fill all the details" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).json({ error: "No user Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).json({ error: "Invalid Details" });
    }

    const token = await user.generateAuthToken();

    res.cookie("Amazonweb", token, {
      expires: new Date(Date.now() + 9900000),
      httpOnly: true,
      secure: true,
      sameSite: "None"
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Add to cart (Protected)
router.post("/addcart/:id", authenicate, async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Products.findOne({ id });

    const userContact = await User.findById(req.userID);

    if (!userContact) {
      return res.status(401).json({ error: "Invalid User" });
    }

    await userContact.addcart(cart);
    await userContact.save();

    res.status(201).json(userContact);
  } catch (error) {
    res.status(401).json({ error: "Invalid User" });
  }
});

// Get Cart Details (Protected)
router.get("/cartdetails", authenicate, async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    res.status(201).json(user);
  } catch (error) {
    res.status(401).json({ error: "Invalid User" });
  }
});

// Get Valid User (Protected)
router.get("/validuser", authenicate, async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    res.status(201).json(user);
  } catch (error) {
    res.status(401).json({ error: "Invalid User" });
  }
});

// Remove Item from Cart (Protected)
router.delete("/remove/:id", authenicate, async (req, res) => {
  try {
    const { id } = req.params;

    req.rootUser.carts = req.rootUser.carts.filter((item) => item.id !== id);
    await req.rootUser.save();

    res.status(200).json(req.rootUser);
  } catch (error) {
    res.status(400).json({ error: "Item cannot be deleted from cart" });
  }
});

// Logout (Protected)
router.get("/logout", authenicate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curr) => curr.token !== req.token);
    res.clearCookie("Amazonweb", { path: "/", sameSite: "None", secure: true });

    await req.rootUser.save();

    res.status(201).json({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json({ error: "Logout failed" });
  }
});

module.exports = router;
