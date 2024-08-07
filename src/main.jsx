import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import { TaleProvider } from "./TaleContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TaleProvider>
      <App />
    </TaleProvider>
  </React.StrictMode>
);
