import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar"; // ✅ MUI v4


const SignUp = () => {
  const [udata, setdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  // Snackbar state
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

  const adddata = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useHistory();

  const senddata = async (e) => {
    e.preventDefault();
    const { fname, email, mobile, password, cpassword } = udata;

    const res = await fetch("https://amazon-clone1-tye1.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fname, email, mobile, password, cpassword }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      setSnackbar({ open: true, message: "❌ " + data.error, severity: "error" });
    } else {
     
      setdata({ fname: "", email: "", mobile: "", password: "", cpassword: "" });
      navigate("/");
       setSnackbar({ open: true, message: "✅ Data Successfully Added!", severity: "success" });
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
              <h1>Create Account</h1>

              <div className="form_data">
                <label htmlFor="fname">Your Name</label>
                <input onChange={adddata} value={udata.fname} type="text" name="fname" id="fname" />
              </div>

              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input onChange={adddata} value={udata.email} type="text" name="email" id="email" />
              </div>

              <div className="form_data">
                <label htmlFor="mobile">Mobile</label>
                <input onChange={adddata} value={udata.mobile} type="text" name="mobile" id="mobile" />
              </div>

              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  onChange={adddata}
                  value={udata.password}
                  type="password"
                  placeholder="At Least 6 characters"
                  name="password"
                  id="password"
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

              <button className="signin_btn" onClick={senddata}>Continue</button>

              <div className="signin_info">
                <p>Already Have an Account?</p>
                <NavLink to="/login">Sign In</NavLink>
              </div>
            </form>
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

export default SignUp;
