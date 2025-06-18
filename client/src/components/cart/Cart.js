import React, { useEffect, useState, useContext } from "react";
import "./cart.css";
import Divider from "@material-ui/core/Divider";
import { useHistory, useParams } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import CircularProgress from "@material-ui/core/CircularProgress";

const Cart = () => {
  const { id } = useParams();
  const history = useHistory();
  const { account, setAccount } = useContext(LoginContext);

  const [inddata, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getdata = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://amazon-clone1-tye1.onrender.com/getproductsone/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Error fetching product:", text);
        return;
      }

      const data = await res.json();
      setData(data);
    } catch (err) {
      console.error("❌ Error in getdata():", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, [id]);

  const addtocart = async () => {
    try {
      const res = await fetch(`https://amazon-clone1-tye1.onrender.com/addcart/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inddata }),
        credentials: "include",
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        const text = await res.text();
        console.error("❌ Non-JSON response from server:", text);
        alert("Server error: " + text);
        return;
      }

      if (res.status === 401 || !data) {
        alert("❌ Invalid user. Please login.");
      } else {
        setAccount(data);
        history.push("/buynow");
      }
    } catch (err) {
      console.error("❌ Error in addtocart():", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="cart_section">
      {loading ? (
        <div className="circle">
          <CircularProgress />
          <h2>Loading...</h2>
        </div>
      ) : inddata && Object.keys(inddata).length > 0 ? (
        <div className="cart_container">
          <div className="left_cart">
            <img src={inddata.url} alt="cart_img" />
            <div className="cart_btn">
              <button className="cart_btn1" onClick={addtocart}>
                Add to Cart
              </button>
              <button className="cart_btn2">Buy Now</button>
            </div>
          </div>

          <div className="right_cart">
            <h3>{inddata.title.shortTitle}</h3>
            <h4>{inddata.title.longTitle}</h4>
            <Divider />
            <p className="mrp">M.R.P. : ₹{inddata.price.mrp}</p>
            <p>
              Deal of the Day :
              <span style={{ color: "#B12704" }}> ₹{inddata.price.cost}</span>
            </p>
            <p>
              You Save :
              <span style={{ color: "#B12704" }}>
                ₹{inddata.price.mrp - inddata.price.cost} ({inddata.price.discount})
              </span>
            </p>

            <div className="discount_box">
              <h5>
                Discount :
                <span style={{ color: "#111" }}>{inddata.discount}</span>
              </h5>
              <h4>
                Free Delivery :
                <span style={{ fontWeight: 600 }}> Oct 8 - 21 </span> &nbsp; Details
              </h4>
              <p>
                Fastest Delivery :
                <span style={{ fontWeight: 600 }}> Tomorrow 11AM </span>
              </p>
            </div>

            <p className="description">
              About the Item:&nbsp;
              <span style={{ color: "#565959", fontSize: 14, fontWeight: 500 }}>
                {inddata.description}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <h2>No product data available</h2>
      )}
    </div>
  );
};

export default Cart;
