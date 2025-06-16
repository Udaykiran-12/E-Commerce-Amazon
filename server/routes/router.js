const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenicate = require("../middleware/authenticate")

//Get All Products Details APi
router.get("/getproducts", async (req, res) => {
  try {
    const data = await Products.find();
    res.status(201).json(data);
  } catch (error) {
    res.status(422).json({ error: "Something went wrong" });
    console.log("error" + error.message);
  }
});

//Get Individual Products Details
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Products.findOne({ id: id });
    res.status(201).json(data);
  } catch (error) {
    res.status(422).json({ error: "Something went wrong" });
    console.log("error" + error.message);
  }
});

//Signup route or register route
router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(422).json({ error: "Fill all the data" });
    console.log("No data avilable");
  }

  try {
    const preUser = await User.findOne({ email: email });
    const mob = await User.findOne({ mobile: mobile });

    if (preUser || mob) {
      res.status(422).json({ error: "User already present" });
    } else if (password !== cpassword) {
      res
        .status(422)
        .json({ error: "password and cpasswors are not matching" });
    } else {
      const finalUser = await User({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });

      const storedata = await finalUser.save();
      

      res.status(201).json(storedata);
    }
  } catch (error) {
    res.status(422).json({ error: "Something went wrong" });
    console.log(error);
  }
});

//Login User route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({ error: "Fill all the details" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
    //   console.log(isMatch);

    //token generate
    const token = await user.generateAuthToken();
    // console.log(token)

    //Cookies

    res.cookie("Amazonweb" , token , {
        expires: new Date(Date.now() + 9900000),
        httpOnly : true
    })

      if (!isMatch) {
        res.status(422).json({ error: "Invalid Details" });
      } else {
        res.status(201).json(user);
       
      }
    }else{
         res.status(422).json({ error: "No user Found" });
    }

  } catch (error) {
    res.status(422).json({ error: "Invalid Details" });
  }
});



//Add cart to logined user
router.post("/addcart/:id" , authenicate , async(req , res) =>{
 

  try {
     const { id } = req.params;
     const cart = await Products.findOne({id : id});
     

     const UserContact = await User.findOne({_id:req.userID});
    

     if(UserContact){
      const cartdata = await UserContact.addcart(cart);
      await UserContact.save();
      
      res.status(201).json(UserContact);

     }else{
        res.status(401).json({error : "Invalid User"});
     }

  } catch (error) {
       res.status(401).json({error : "Invalid User"});
  }
})


//Get Cart Details
router.get("/cartdetails" , authenicate , async(req,res) =>{
   try {
     const buyuser = await User.findOne({_id : req.userID});
     res.status(201).json(buyuser);

   } catch (error) {
     console.log(error);
     res.status(401).json({error : "Invalid User"});
   }
})


//Get Valid User

router.get("/validuser" , authenicate , async(req,res) =>{
   try {
     const validuser = await User.findOne({_id : req.userID});
     res.status(201).json(validuser);

   } catch (error) {
     console.log(error);
     res.status(401).json({error : "Invalid User"});
   }
})


//Remove carts
router.delete("/remove/:id" , authenicate , async(req , res) =>{
  try {
     const { id } = req.params;

     req.rootUser.carts = req.rootUser.carts.filter((currval) =>{
        return currval.id != id;
     });

     await req.rootUser.save();
     res.status(200).json(req.rootUser);
     console.log("Item Removed from cart");

  } catch (error) {
    console.log(error)
     res.status(400).json({error : "Item cannot be deleted from cart"})
  }
});



//For Logout User Api
router.get("/logout" , authenicate , async(req, res) =>{
  try {
     req.rootUser.tokens = req.rootUser.tokens.filter((curr) =>{
        return curr.token !== req.token;
     })

     res.clearCookie("Amazonweb" , { path : "/"});
     await req.rootUser.save();

     res.status(201).json(req.rootUser.tokens);
     console.log("User Logout Successfully")
  } catch (error) {
     res.status(400).json({error : "User Cannot be Logouted"});
     console.log(error)
  }
})

module.exports = router;
