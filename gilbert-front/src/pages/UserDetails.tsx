import React from 'react';
import { useParams } from 'react-router-dom';
import User from '../interfaces/User';

interface UserDetailsProps {
  users: User[];
}

const UserDetails: React.FC<UserDetailsProps> = ({ users }) => {
  const { id } = useParams<{ id: string }>();
  const user = users.find((u) => u.id === parseInt(id as string, 10));

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserDetails;
