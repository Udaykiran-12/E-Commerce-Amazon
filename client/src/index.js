import React from "react";
import ReactDOM from "react-dom"; // ✅ no "/client"
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import ContextProvider from "./components/context/ContextProvider";

// ✅ React 17 way: use ReactDOM.render instead of createRoot
ReactDOM.render(
  <ContextProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ContextProvider>,
  document.getElementById("root")
);

// Optional analytics
reportWebVitals();
