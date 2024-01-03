import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    body{
        background-color: #323334;
        color: white;
        min-height: 100vh;
    }
`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <GlobalStyle />
    <App />
  </>
);
