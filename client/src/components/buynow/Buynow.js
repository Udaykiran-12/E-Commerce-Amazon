import React, { useState } from "react";
import "./buynow.css";
import { Divider } from "@mui/material";
import Option from "./Option";
import Right from "./Right";
import Subtotal from "./Subtotal";
import { useEffect } from "react";

const Buynow = () => {
  const [cartdata, setdata] = useState("");
  

  const buydata = async () => {
    const res = await fetch("/cartdetails", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      credentials: "include",
    });

    const data = await res.json();

    if (res.status !== 201) {
      console.log("Error");
    } else {
     
        setdata(data.carts);
      
    }
  };

  useEffect(() => {
    buydata();
  }, []);

  return (
    <>
      {cartdata.length ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping Cart</h1>
              <p>Select all items</p>
              <span className="leftbuypirce">Price</span>
              <Divider />

              {cartdata.map((e, k) => {
                return (
                  <>
                    <div className="item_container">
                      <img src={e.url} alt="randomamul" />

                      <div className="item_details">
                        <h3>
                        {e.title.longTitle}
                        </h3>
                        <h3>{e.title.shortTitle}</h3>
                        <h3 className="diffrentprice">₹{e.price.cost}.00</h3>
                        <p className="unusuall">
                          Usually Dispachted in 8 days.{" "}
                        </p>
                        <p>Eligibile for FREE Shipping</p>
                        <img
                          src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
                          alt="logo"
                        />
                        <Option deleteData = {e.id} get={buydata}/>
                      </div>

                      <div className="item_price">₹{e.price.cost}.00</div>
                     
                    </div>
                       <Divider />
                  </>
                );
              })}

            
              <Subtotal items={cartdata} />
            </div>

            <Right items={cartdata} />
          </div>
        </div>
      ) : (
        "Empty Cart"
      )}
    </>
  );
};

export default Buynow;
