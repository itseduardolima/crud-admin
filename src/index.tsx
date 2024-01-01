import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";


import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { App } from "./App";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <App />
      <ToastContainer />

    </BrowserRouter>
  </React.StrictMode>
);