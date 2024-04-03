import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import { Container } from "react-bootstrap"



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
 
      <App />
     
    </BrowserRouter>
  </React.StrictMode>
)
