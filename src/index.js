import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { store, persistor } from "./rtk/store";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./styles/style";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "cropperjs/dist/cropper.css";
import "react-toastify/dist/ReactToastify.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CssBaseline />
          <Router>
            <App />
          </Router>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
