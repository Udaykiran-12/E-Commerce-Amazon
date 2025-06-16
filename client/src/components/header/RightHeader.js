import React, { useContext, useEffect, useState } from "react";
import "./rightheader.css";
import Avatar from "@material-ui/core/Avatar";
import { LoginContext } from "../context/ContextProvider";
import { NavLink } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import LogoutIcon from "@material-ui/icons/ExitToApp";


const RightHeader = ({Logclose , logoutuser}) => {
  const { account, setAccount } = useContext(LoginContext);

  return (
    <>
      <div className="rightheader">

        <div className="right_nav">
          {account ? (
            <Avatar className="avtar2">{account.fname[0].toUpperCase()}</Avatar>
          ) : (
            <Avatar className="avtar"></Avatar>
          )}

          {
            account ? <h3>Hello , {account.fname.toUpperCase()}</h3> : ""
          }
          
        </div>

        <div className="nav_btn" onClick={Logclose}>
            <NavLink to="/">Home</NavLink>
             <NavLink to="/">Shop By Category</NavLink>

             <Divider style={{width : "100%" , marginLeft : "-20px"}} />

              <NavLink to="/">Today's Deal </NavLink>
              {
                account ? <NavLink to="/buynow">Your Orders</NavLink> :
                          <NavLink to="/login">Your Orders</NavLink>
              }

              <Divider  style={{width : "100%" , marginLeft : "-20px"}} />
              <div className="flag">
                 <NavLink to="/">Settings
                   <img src="/india.png" style={{width : 35 , marginLeft : 10 , marginBottom : "-15px"}} alt="india flag" />
                 </NavLink>
              </div>

              {
                account ?
                 <div className="flag">
                   <LogoutIcon  style={{fontSize : 18 , marginRight : 6}}/>
                   <h3 onClick ={() => logoutuser()} style={{cursor : "pointer", fontWeight : 500}}>Logout</h3>
                  </div> : 
                  <NavLink to="/login">
                    Sign In
                  </NavLink>
              }
           

        </div>

      </div>
    </>
  );
};

export default RightHeader;
