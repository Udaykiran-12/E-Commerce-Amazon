import "./App.css";
import Navbar from "./components/header/Navbar";
import Newnav from "./components/newnav/Newnav";
import Maincomp from "./components/home/Maincomp";
import Footer from "./components/footer/footer";
import SignIn from "./components/signup_sign/SignIn";
import SignUp from "./components/signup_sign/SignUp";
import Cart from "./components/cart/Cart";
import Buynow from "./components/buynow/Buynow";
import { Switch, Route } from "react-router-dom"; // ✅ FIXED
import CircularProgress from "@material-ui/core/CircularProgress";

import { useEffect, useState } from "react";

function App() {
  const [data, setdata] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setdata(true);
    }, 3000);
  }, []); // ✅ add dependency array to avoid infinite re-renders

  return (
    <>
      {data ? (
        <>
          <Navbar />
          <Newnav />
          <Switch>
            <Route exact path="/" component={Maincomp} />
            <Route path="/login" component={SignIn} />
            <Route path="/register" component={SignUp} />
            <Route path="/getproductsone/:id" component={Cart} />
            <Route path="/buynow" component={Buynow} />
          </Switch>
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
