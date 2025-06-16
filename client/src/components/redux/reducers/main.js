import { getProductsreducer } from "./productsreducer";
import { combineReducers} from "redux"

const rootReducers = combineReducers({
    getproductsdata : getProductsreducer
})

export default rootReducers;