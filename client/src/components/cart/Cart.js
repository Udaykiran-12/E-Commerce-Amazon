import React, { useEffect, useState, useContext } from "react";
import "./cart.css";
import Divider from "@material-ui/core/Divider";
import { useHistory, useParams } from "react-router-dom"; // ✅ fixed
import { LoginContext } from "../context/ContextProvider";
import CircularProgress from "@material-ui/core/CircularProgress";



const Cart = () => {
  const { id } = useParams();
  const [inddata, setdata] = useState("");
  
  
   
  const history = useHistory();
  // console.log(inddata);

  const{account , setAccount} = useContext(LoginContext)

  const getdata = async () => {
    const data = await fetch(`https://amazon-clone1-tye1.onrender.com/getproductsone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await data.json();
    // console.log(res);

    if (data.status !== 201) {
      console.log("No data Available");
    } else {
      setdata(res);
    }
  };

  useEffect(() => {
    setTimeout(getdata , 1000)
  
  }, [id]);


  const addtocart = async () => {
    const checkres = await fetch(`https://amazon-clone1-tye1.onrender.com/addcart/${id}`, {
      method: "POST",
      headers: {
        Accept : "application/json",
        "Content-Type": "application/json",
      },

      body : JSON.stringify({
        inddata
      }),

      credentials : "include"

    });

    const data1 = await checkres.json();

    if(checkres.status === 401 || !data1){
      console.log("Invalid User");
      alert("Invalid User")
    }else{
      history("/buynow")

       
          setAccount(data1)
        
    }
  };

  return (
    <div className="cart_section">
      {inddata && Object.keys(inddata).length && (
        <div className="cart_container">
          <div className="left_cart">
            <img src={inddata.url} alt="cart_img" />

            <div className="cart_btn">
              <button
                className="cart_btn1"
                onClick={() => addtocart()}
              >
                Add to Cart
              </button>
              <button className="cart_btn2">Buy Now</button>
            </div>
          </div>

          <div className="right_cart">
            <h3>{inddata.title.shortTitle}</h3>
            <h4>{inddata.title.longTitle}</h4>
            <Divider />
            <p className="mrp">M.R.P. : &#8377;{inddata.price.mrp}</p>
            <p>
              Deal of the Day :{" "}
              <span style={{ color: "#B12704" }}>
                {" "}
                &#8377;{inddata.price.cost}
              </span>
            </p>
            <p>
              You Save :{" "}
              <span style={{ color: "#B12704" }}>
                {" "}
                &#8377;{inddata.price.mrp - inddata.price.cost} (
                {inddata.price.discount})
              </span>
            </p>

            <div className="discount_box">
              <h5>
                Discount :{" "}
                <span style={{ color: "#111" }}>{inddata.discount}</span>
              </h5>
              <h4>
                Free Delivery :{" "}
                <span style={{ color: "#111", fontWeight: 600 }}>
                  Oct 8 - 21{" "}
                </span>{" "}
                &nbsp; Details
              </h4>
              <p>
                Fastest Delivert :{" "}
                <span style={{ color: "#111", fontWeight: 600 }}>
                  Tomorrow 11AM
                </span>
              </p>
            </div>

            <p className="description">
              About the Item :&nbsp;
              <span
                style={{
                  color: "#565959",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.4px",
                }}
              >
                {inddata.description}
              </span>
            </p>
          </div>
        </div>
      )}

      {
        !inddata ? 
          <div className="circle">
               <CircularProgress />
               <h2>Loading...</h2>
           </div> : ""
      }

    </div>
  );
};

export default Cart;
