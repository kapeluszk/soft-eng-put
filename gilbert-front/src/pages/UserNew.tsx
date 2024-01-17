import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../interfaces/User';

interface UserNewProps {
  onAddUser: (newUser: { name: string; email: string }) => void;
}

const UserNew: React.FC<UserNewProps> = ({ onAddUser }) => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddUser = () => {
    // Validation logic here...

    onAddUser(newUser);

    navigate('/users');
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form>
        <label>
          Name:
          <input type="text" name="name" value={newUser.name} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="text" name="email" value={newUser.email} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={handleAddUser}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default UserNew;
