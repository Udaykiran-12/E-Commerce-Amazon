import "./App.css";
import Navbar from "./components/header/Navbar";
import Newnav from "./components/newnav/Newnav";
import Maincomp from "./components/home/Maincomp";
import Footer from "./components/footer/footer";
import SignIn from "./components/signup_sign/SignIn";
import SignUp from "./components/signup_sign/SignUp";
import Cart from "./components/cart/Cart";
import Buynow from "./components/buynow/Buynow";
import { Routes, Route } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";

function App() {
  const [data, setdata] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setdata(true);
    }, 3000);
  });

  return (
    <>
      {data ? (
        <>
          <Navbar />
          <Newnav />
          <Routes>
            <Route path="/" element={<Maincomp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/getproductsone/:id" element={<Cart />} />
            <Route path="/buynow" element={<Buynow />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <div className="circle">
          <CircularProgress />
          <h2>Loading...</h2>
        </div>
      )}
    </>
  );
}

export default App;
