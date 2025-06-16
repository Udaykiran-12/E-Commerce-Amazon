import React, { useState } from "react";
import "./signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import { LoginContext } from "../context/ContextProvider";
import { useContext } from "react";

const SignIn = () => {
  const [logdata, setdata] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { account, setAccount } = useContext(LoginContext);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

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

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      setSnackbar({ open: true, message: "❌ " + data.error, severity: "error" });
    } else {
      setAccount(data);
     
      setdata({ email: "", password: "" });
      navigate("/");
      setSnackbar({ open: true, message: "✅ Login Successfully!", severity: "success" });
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
                  placeholder="At Least 6 characters"
                  name="password"
                  id="password"
                />
              </div>

              <button className="signin_btn" onClick={senddata}>Continue</button>
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
            autoHideDuration={2000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          />
        </div>
      </section>
    </>
  );
};

export default SignIn;
