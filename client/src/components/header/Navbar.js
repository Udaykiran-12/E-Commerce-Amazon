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
import LogoutIcon from "@material-ui/icons/ExitToApp"; // or remove if unused
import Snackbar from "@material-ui/core/Snackbar";
// Remove MuiAlert — not available in MUI v4
import { useSelector, useDispatch } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";


const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //For Search Feature
  const [text, setText] = useState("");
  console.log(text);
  const [liopen, setLiOpen] = useState(true);
  const { products } = useSelector((state) => state.getproductsdata);

  const [dropen, setDropen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state

  const getvaliduserdetail = async () => {
    const res = await fetch("https://amazon-clone1-tye1.onrender.com/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    if (res.status !== 201) {
      console.log("error");
    } else {
      console.log("validdata");
      setAccount(data);
    }
  };

  const handleopen = () => {
    setDropen(true);
  };

  const handledrclose = () => {
    setDropen(false);
  };

  // Logout function with Snackbar integration
  const logoutuser = async () => {
    const res = await fetch("https://amazon-clone1-tye1.onrender.com/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.status !== 201) {
      console.log("Can't Logout User Due to Some Error");
    } else {
      console.log("User logged out successfully");
      setAccount(false);
      setOpenSnackbar(true); // Show snackbar
      history("/");
    }
  };

  const getText = (items) => {
    setText(items);
    setLiOpen(false);
  };

  useEffect(() => {
    getvaliduserdetail();
  }, []);

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handleopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>

          <Drawer open={dropen}>
            <RightHeader Logclose={handledrclose} logoutuser={logoutuser} />
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
              name=""
              id=""
            />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>

            {/* Search Filter */}
            {text && (
              <List className="extrasearch" hidden={liopen}>
                {products
                  .filter((product) =>
                    product.title.longTitle
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map((product) => (
                    <div className="listitem">
                      <ListItem>
                        <NavLink
                          to={`/getproductsone/${product.id}`}
                          onClick={() => setLiOpen(true)}
                        >
                          {product.title.longTitle}
                        </NavLink>
                      </ListItem>
                    </div>
                  ))}
              </List>
            )}
          </div>
        </div>

        <div className="right">
          {!account ? (
            <div className="nav_btn">
              <NavLink to="/login">Signin</NavLink>
            </div>
          ) : (
            ""
          )}

          <div className="cart_btn">
            {account ? (
              <NavLink to="/buynow">
                <Badge
                  badgeContent={account?.carts?.length || 0}
                  color="primary"
                >
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}

            <p>Cart</p>
          </div>
          {account ? (
            <Avatar
              className="avtar2"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              className="avtar"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{ list: { "aria-labelledby": "basic-button" } }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {account && (
              <MenuItem
                onClick={() => {
                  logoutuser();
                  handleClose();
                }}
              >
                Logout&nbsp;
                <LogoutIcon />
              </MenuItem>
            )}
          </Menu>
        </div>
      </nav>

      {/* Snackbar Component */}
     <Snackbar open={open} autoHideDuration={3000} message="Successfully logged in!" />

    </header>
  );
};

export default Navbar;
