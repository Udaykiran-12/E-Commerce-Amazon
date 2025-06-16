import { legacy_createStore as createStore , applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducers from "./components/redux/reducers/main";

const middleware = [thunk];

const store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store;