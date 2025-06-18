import React, { useState, useEffect, useContext } from "react";
import "./navbar.css";
import SearchIcon from "@material-ui/icons/Search";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Avatar from "@material-ui/core/Avatar";
import { NavLink, useHistory } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import RightHeader from "./RightHeader";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import Snackbar from "@material-ui/core/Snackbar";
import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const [dropen, setDropen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [text, setText] = useState("");
  const [liopen, setLiOpen] = useState(true);

  const { products } = useSelector((state) => state.getproductsdata);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => setDropen(true);
  const handleDrawerClose = () => setDropen(false);

  const getText = (items) => {
    setText(items);
    setLiOpen(false);
  };

  const getvaliduserdetail = async () => {
    try {
      const res = await fetch("https://amazon-clone1-tye1.onrender.com/validuser", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 201) {
        const data = await res.json();
        setAccount(data);
      } else {
        console.warn("User not valid or session expired");
      }
    } catch (err) {
      console.error("Error validating user:", err);
    }
  };

  const logoutuser = async () => {
    try {
      const res = await fetch("https://amazon-clone1-tye1.onrender.com/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 201) {
        setAccount(false);
        setOpenSnackbar(true);
        history.push("/");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    getvaliduserdetail();
  }, []);

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handleDrawerOpen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>

          <Drawer open={dropen} onClose={handleDrawerClose}>
            <RightHeader Logclose={handleDrawerClose} logoutuser={logoutuser} />
          </Drawer>

          <div className="navlogo">
            <NavLink to="/">
              <img src="/amazon_PNG25.png" alt="navlogo" />
            </NavLink>
          </div>

          <div className="nav_searchbaar">
            <input
              type="text"
              onChange={(e) => getText(e.target.value)}
              placeholder="Search Products"
            />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>

            {text && (
              <List className="extrasearch" hidden={liopen}>
                {products
                  .filter((product) =>
                    product.title.longTitle.toLowerCase().includes(text.toLowerCase())
                  )
                  .map((product) => (
                    <ListItem key={product.id} onClick={() => setLiOpen(true)}>
                      <NavLink to={`/getproductsone/${product.id}`}>
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>

        <div className="right">
          {!account && (
            <div className="nav_btn">
              <NavLink to="/login">Signin</NavLink>
            </div>
          )}

          <div className="cart_btn">
            <NavLink to={account ? "/buynow" : "/login"}>
              <Badge badgeContent={account?.carts?.length || 0} color="primary">
                <ShoppingCartIcon id="icon" />
              </Badge>
            </NavLink>
            <p>Cart</p>
          </div>

          <Avatar
            className={account ? "avtar2" : "avtar"}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {account?.fname ? account.fname[0].toUpperCase() : ""}
          </Avatar>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {account && (
              <MenuItem
                onClick={() => {
                  logoutuser();
                  handleClose();
                }}
              >
                Logout <LogoutIcon style={{ marginLeft: 8 }} />
              </MenuItem>
            )}
          </Menu>
        </div>
      </nav>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="You have logged out successfully!"
      />
    </header>
  );
};

export default Navbar;
