import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./router";
// import { Provider as ReduxProvider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import reduxStore from "./redux/store";
// import { persistor } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ReduxProvider store={reduxStore}> */}
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <RouterProvider router={router} />
    {/* </PersistGate> */}
    {/* </ReduxProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
