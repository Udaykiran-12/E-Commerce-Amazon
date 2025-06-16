const Products = require("./models/productsSchema");
const productsdata = require("./constant/productsdata");

const Defaultdata = async() =>{
    try {

         await Products.deleteMany({});

        const data = await Products.insertMany(productsdata);
        
        
    } catch (error) {
        console.log("error" + error.message);
    }
    
}

module.exports = Defaultdata;