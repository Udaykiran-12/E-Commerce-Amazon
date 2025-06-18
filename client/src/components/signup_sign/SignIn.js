import React, { useState, useContext } from "react";
import "./signup.css";
import { NavLink, useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import { LoginContext } from "../context/ContextProvider";

const SignIn = () => {
  const [logdata, setdata] = useState({
    email: "",
    password: "",
  });

  const navigate = useHistory();
  const { account, setAccount } = useContext(LoginContext);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const adddata = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const senddata = async (e) => {
    e.preventDefault();
    const { email, password } = logdata;

    try {
      const res = await fetch("https://amazon-clone1-tye1.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Send cookies for authentication
        body: JSON.stringify({ email, password }),
      });

      let data;
      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text);
      }

      if (!res.ok || !data) {
        setSnackbar({
          open: true,
          message: "❌ " + (data?.error || "Login failed"),
          severity: "error",
        });
      } else {
        setAccount(data);
        setdata({ email: "", password: "" });
        navigate.push("/"); // ✅ redirect to home page
        setSnackbar({
          open: true,
          message: "✅ Login Successfully!",
          severity: "success",
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: "❌ " + err.message,
        severity: "error",
      });
    }
  };

  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="amazon logo" />
          </div>

          <div className="sign_form">
            <form method="POST">
              <h1>Sign-In</h1>

              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  onChange={adddata}
                  value={logdata.email}
                  type="text"
                  name="email"
                  id="email"
                />
              </div>

              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  onChange={adddata}
                  value={logdata.password}
                  type="password"
                  placeholder="At least 6 characters"
                  name="password"
                  id="password"
                />
              </div>

              <button className="signin_btn" onClick={senddata}>
                Continue
              </button>
            </form>
          </div>

          <div className="create_accountinfo">
            <p>New to Amazon</p>
            <NavLink to="/register">
              <button>Create your amazon account</button>
            </NavLink>
          </div>

          {/* Snackbar Notification */}
          <Snackbar
            open={snackbar.open}
            message={snackbar.message}
            autoHideDuration={3000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          />
        </div>
      </section>
    </>
  );
};

export default SignIn;
