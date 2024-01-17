import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import UserList from './UserList';
import UserDetails from './UserDetails';
import UserNew from './UserNew';
import '../styles/AdminPage.css';

const AdminPage = () => {
  const navigate = useNavigate();

  // Sample user data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  const handleAddUser = (newUser: { name: string; email: string }) => {
    const newUserWithId = { ...newUser, id: users.length + 1 };
    users.push(newUserWithId);
    navigate('/admin/users'); 
  };

  return (
    <div className='dark-background'>
      <h1>Admin Page</h1>
      <div>
        <button onClick={() => navigate('/admin/users')}>User List</button>
        <button onClick={() => navigate('/admin/users/new')}>Add User</button>
      </div>
      <Routes>
        <Route path="/" element={<UserList users={users} />} />
        <Route path=":id" element={<UserDetails users={users} />} />
        <Route path="new" element={<UserNew onAddUser={handleAddUser} />} />
      </Routes>
    </div>
  );
};

export default AdminPage;
