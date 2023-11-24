import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TicketsPage from './pages/TicketsPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const login = () => {
    setAuthenticated(true);
  };

  const logout = () => {
    setAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute isAuthenticated={authenticated} />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
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
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Link to="/login" state={{ isAuthenticated: authenticated }}>Login</Link>
          <Link to="/tickets" state={{ isAuthenticated: authenticated }}>Tickets</Link>
          <Link to="/dashboard" state={{ isAuthenticated: authenticated }}>Dashboard</Link>
          <Link to="/admin" state={{ isAuthenticated: authenticated }}>Admin</Link>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
