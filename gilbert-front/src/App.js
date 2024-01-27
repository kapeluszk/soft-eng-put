import Navbar from "./components/navbar/Navbar"
import Login from "./components/Login/Login"
import { Route, Routes } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "./context/UserContext"
import UserPage from "./components/pages/UserPage"
import AddTicketPage from "./components/pages/AddTicketPage"
import TicketDetailsPage from "./components/pages/TicketDetailsPage"
import AgentPage from "./components/pages/AgentPage"
import AgentLeaderPage from "./components/pages/AgentLeaderPage"
import AdminPage from "./components/pages/AdminPage"

function App() {
  const { userInfo } = useContext(UserContext);

  const isUser = userInfo && userInfo.permissions === 'user';
  const isAgent = userInfo && userInfo.permissions === 'agent';
  const isAdmin = userInfo && userInfo.permissions === 'admin';
  const isAgentLeader = userInfo && userInfo.permissions === 'agent-leader';
  const mainView = isUser ? <UserPage /> :
    isAgent ? <AgentPage /> :
      isAgentLeader ? <AgentLeaderPage /> :
        isAdmin ? <AdminPage /> :
          <Login />;


  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={mainView} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/agent" element={<AgentPage />} />
          <Route path="/agent-leader" element={<AgentLeaderPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/add-ticket" element={<AddTicketPage />} />
          <Route path="/ticket/:id" element={<TicketDetailsPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App