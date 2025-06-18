import React, { useState, useEffect } from "react";
import "./buynow.css";
import Divider from "@material-ui/core/Divider";
import Option from "./Option";
import Right from "./Right";
import Subtotal from "./Subtotal";

const Buynow = () => {
  const [cartdata, setdata] = useState(null); // null = loading, [] = empty cart

  const buydata = async () => {
    try {
      const res = await fetch("https://amazon-clone1-tye1.onrender.com/cartdetails", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include", // important for auth cookie
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Failed to fetch cart data:", data?.error || res.statusText);
        setdata([]); // treat as empty
      } else {
        setdata(data?.carts || []);
      }
    } catch (error) {
      console.error("❌ Error fetching cart data:", error);
      setdata([]); // fallback
    }
  };

  useEffect(() => {
    buydata();
  }, []);

  if (cartdata === null) return <p>Loading your cart...</p>; // while loading

  return (
    <>
      {cartdata.length > 0 ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping Cart</h1>
              <p>Select all items</p>
              <span className="leftbuypirce">Price</span>
              <Divider />

              {cartdata.map((e, k) => (
                <div className="item_container" key={e._id || k}>
                  <img src={e.url} alt={e.title?.shortTitle || "product"} />

                  <div className="item_details">
                    <h3>{e.title?.longTitle}</h3>
                    <h3>{e.title?.shortTitle}</h3>
                    <h3 className="diffrentprice">₹{e.price?.cost || 0}.00</h3>
                    <p className="unusuall">Usually dispatched in 8 days.</p>
                    <p>Eligible for FREE Shipping</p>
                    <img
                      src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
                      alt="FBA Badge"
                    />
                    <Option deleteData={e.id} get={buydata} />
                  </div>

                  <div className="item_price">₹{e.price?.cost || 0}.00</div>
                  <Divider />
                </div>
              ))}

              <Subtotal items={cartdata} />
            </div>

            <Right items={cartdata} />
          </div>
        </div>
      ) : (
        <h2 style={{ textAlign: "center", marginTop: "2rem" }}>🛒 Your cart is empty</h2>
      )}
    </>
  );
};

export default Buynow;
