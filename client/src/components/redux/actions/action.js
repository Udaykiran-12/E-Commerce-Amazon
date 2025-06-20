export const getProducts = () => async(dispatch) =>{
    try {
        const data = await fetch("https://amazon-clone1-tye1.onrender.com/getproducts" , {
            method : "GET",
            headers : {
                "Content-type" : "application/json"
            }
        });

        const res = await data.json()
        
        dispatch({
            type : "SUCCESS_GET_PRODUCTS",
            payload : res
        })
    } catch (error) {
              dispatch({
                type : "FAIL_GET_PRODUCTS",
                payload : error.response
        })
               
    }
}
