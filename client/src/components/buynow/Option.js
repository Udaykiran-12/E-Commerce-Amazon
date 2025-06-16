import React from "react";
import { LoginContext } from "../context/ContextProvider";
import { useContext , useState} from "react";
import Snackbar from "@material-ui/core/Snackbar"; // ✅ MUI v4






const Option = ({ deleteData , get }) => {

  const { account, setAccount } = useContext(LoginContext);
  console.log(account)

   // Snackbar state
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });



  const removedata = async () => {
    try {
      const res = await fetch(`/remove/${deleteData}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if(res.status == 400 || !data){
          console.log("Item Not deletedd");
          setSnackbar({ open: true, message: "❌ Item Cannot be deleted", severity: "error" });


      }else{
        console.log("Item Deleted");
        setAccount(data);
          setSnackbar({ open: true, message: "✅ Item Deleted Successfully", severity: "success" });

        get();
      }

    } catch (error) {
      console.log("error in deleting data from cart")

    }

  };

  return (
    
    <div className="add_remove_select">
      
    
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>

      <p style={{ cursor: "pointer" }} onClick={removedata}>
        Delete
      </p>
      <span> |</span>
      <p className="forremovemedia">Save or Later</p> <span> |</span>
      <p className="forremovemedia">See More Like this</p>
        {/* Snackbar Notification */}
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
