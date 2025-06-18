import React, { useContext, useState } from "react";
import { LoginContext } from "../context/ContextProvider";
import Snackbar from "@material-ui/core/Snackbar"; // ✅ MUI v4

const Option = ({ deleteData, get }) => {
  const { setAccount } = useContext(LoginContext); // ✅ Only need setAccount
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

  const removedata = async () => {
    try {
      const res = await fetch(`https://amazon-clone1-tye1.onrender.com/remove/${deleteData}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ For cookie-based auth
      });

      const data = await res.json();

      if (!res.ok || !data) {
        console.error("❌ Item not deleted:", data?.error || res.statusText);
        setSnackbar({ open: true, message: "❌ Could not delete item", severity: "error" });
      } else {
        setAccount(data); // ✅ Update global user/cart context
        get(); // ✅ Refresh cart view
        setSnackbar({ open: true, message: "✅ Item deleted successfully", severity: "success" });
      }
    } catch (error) {
      console.error("❌ Error deleting item from cart:", error);
      setSnackbar({ open: true, message: "❌ Unexpected error", severity: "error" });
    }
  };

  return (
    <div className="add_remove_select">
      <select defaultValue="1">
        {[1, 2, 3, 4].map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>

      <p style={{ cursor: "pointer" }} onClick={removedata}>Delete</p>
      <span> | </span>
      <p className="forremovemedia">Save for Later</p>
      <span> | </span>
      <p className="forremovemedia">See More Like This</p>

      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
};

export default Option;
