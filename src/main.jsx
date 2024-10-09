import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const currentUrl = window.location.href;

if (currentUrl !== window.location.origin + "/") {
  window.location.replace("/index.html");
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
