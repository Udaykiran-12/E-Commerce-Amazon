import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar"; // MUI v4

const SignUp = () => {
  const [udata, setdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const navigate = useHistory();

  const adddata = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const senddata = async (e) => {
    e.preventDefault();
    const { fname, email, mobile, password, cpassword } = udata;

    try {
      const res = await fetch("https://amazon-clone1-tye1.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 👈 for cookies/auth
        body: JSON.stringify({ fname, email, mobile, password, cpassword }),
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
          message: "❌ " + (data?.error || "Registration failed"),
          severity: "error",
        });
      } else {
        setdata({
          fname: "",
          email: "",
          mobile: "",
          password: "",
          cpassword: "",
        });
        setSnackbar({
          open: true,
          message: "✅ Account Created Successfully!",
          severity: "success",
        });
        navigate.push("/login"); // ⬅️ redirect to login
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
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="amazon logo" />
        </div>

        <div className="sign_form">
          <form method="POST">
            <h1>Create Account</h1>

            <div className="form_data">
              <label htmlFor="fname">Your Name</label>
              <input
                onChange={adddata}
                value={udata.fname}
                type="text"
                name="fname"
                id="fname"
              />
            </div>

            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                onChange={adddata}
                value={udata.email}
                type="email"
                name="email"
                id="email"
              />
            </div>

            <div className="form_data">
              <label htmlFor="mobile">Mobile</label>
              <input
                onChange={adddata}
                value={udata.mobile}
                type="text"
                name="mobile"
                id="mobile"
              />
            </div>

            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                onChange={adddata}
                value={udata.password}
                type="password"
                name="password"
                id="password"
                placeholder="At least 6 characters"
              />
            </div>

            <div className="form_data">
              <label htmlFor="cpassword">Password Again</label>
              <input
                onChange={adddata}
                value={udata.cpassword}
                type="password"
                name="cpassword"
                id="cpassword"
              />
            </div>

            <button className="signin_btn" onClick={senddata}>
              Continue
            </button>

            <div className="signin_info">
              <p>Already Have an Account?</p>
              <NavLink to="/login">Sign In</NavLink>
            </div>
          </form>
        </div>

        <Snackbar
          open={snackbar.open}
          message={snackbar.message}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      </div>
    </section>
  );
};

export default SignUp;
