const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const secretKey = process.env.KEY;

const authenicate = async (req, res, next) => {

  try {
    const token = req.cookies.Amazonweb;
    const verifyToken = jwt.verify(token, secretKey);
  
    
    const user = await User.findOne({_id : verifyToken._id , "tokens.token" : token});
    

    if(!user){
        throw new Error("User Not Found")
    }

    req.token = token;
    req.rootUser = user;
    req.userID = user._id;

    next();

  } catch (error) {
   
    res.status(401).send("Unauthorized token access");
    console.log(error)
  }
};

module.exports = authenicate;
