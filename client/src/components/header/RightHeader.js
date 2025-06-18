import React, { useContext } from "react";
import "./rightheader.css";
import Avatar from "@material-ui/core/Avatar";
import { LoginContext } from "../context/ContextProvider";
import { NavLink } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import LogoutIcon from "@material-ui/icons/ExitToApp";

const RightHeader = ({ Logclose, logoutuser }) => {
  const { account } = useContext(LoginContext);

  return (
    <div className="rightheader">
      <div className="right_nav">
        <Avatar className={account ? "avtar2" : "avtar"}>
          {account?.fname?.[0]?.toUpperCase()}
        </Avatar>
        {account && <h3>Hello, {account.fname.toUpperCase()}</h3>}
      </div>

      <div className="nav_btn" onClick={Logclose}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">Shop By Category</NavLink>

        <Divider className="nav_divider" />

        <NavLink to="/">Today's Deal</NavLink>
        <NavLink to={account ? "/buynow" : "/login"}>Your Orders</NavLink>

        <Divider className="nav_divider" />

        <div className="flag">
          <NavLink to="/" className="flag_link">
            Settings
            <img
              src="/india.png"
              alt="india flag"
              style={{
                width: 35,
                marginLeft: 10,
                verticalAlign: "middle",
              }}
            />
          </NavLink>
        </div>

        {account ? (
          <div className="flag logout_section" onClick={logoutuser} style={{ cursor: "pointer" }}>
            <LogoutIcon style={{ fontSize: 18, marginRight: 6 }} />
            <h3 style={{ fontWeight: 500 }}>Logout</h3>
          </div>
        ) : (
          <NavLink to="/login">Sign In</NavLink>
        )}
      </div>
    </div>
  );
};

export default RightHeader;
