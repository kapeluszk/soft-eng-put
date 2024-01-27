import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter } from "react-router-dom"
import { UserProvider } from "./context/UserContext"
import { TicketProvider } from "./context/TicketContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TicketProvider>
          <App />
        </TicketProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)