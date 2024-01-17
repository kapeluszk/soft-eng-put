import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TicketsPage from './pages/TicketsPage';
import TicketsPageUser from './pages/TicketsPageUser';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import Ticket from './interfaces/TicketUser';
import TicketDetails from './pages/TicketDetails';
import UserDetails from './pages/UserDetails';
import UserList from './pages/UserList';
import UserNew from './pages/UserNew';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const login = () => {
    setAuthenticated(true);
  };

  const logout = () => {
    setAuthenticated(false);
  };

  const tickets: Ticket[] = [
    {
      id: 1,
      title: 'Sample Ticket 1',
      dateCreated: '2024-01-15',
      assignedAgent: 'Agent Smith',
      status: 'Open',
    },
    {
      id: 2,
      title: 'Sample Ticket 2',
      dateCreated: '2024-01-16',
      assignedAgent: 'Agent Grzdylak',
      status: 'Closed',
    },
    {
      id: 3,
      title: 'Sample Ticket 3',
      dateCreated: '2024-01-17',
      assignedAgent: 'Agent Pogo',
      status: 'New',
    }
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute isAuthenticated={authenticated} />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/tickets/user" element={<TicketsPageUser tickets={tickets} />} />
          <Route path="/tickets/user/:id" element={<TicketDetails tickets={tickets} />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <div>{authenticated ? 'You are logged in' : 'You are logged out'}</div>
          <button onClick={login}>Login</button>
          <button onClick={logout}>Logout</button>
          
          <Link to="/login" state={{ isAuthenticated: authenticated }}>Login</Link>
          <Link to="/dashboard" state={{ isAuthenticated: authenticated }}>Dashboard</Link>
          <Link to="/tickets" state={{ isAuthenticated: authenticated }}>Tickets</Link>
          <Link to="/tickets/user" state={{ isAuthenticated: authenticated }}>Tickets User</Link>
          <Link to="/admin" state={{ isAuthenticated: authenticated }}>Admin</Link>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
