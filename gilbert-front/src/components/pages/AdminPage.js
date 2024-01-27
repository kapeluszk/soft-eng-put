import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const initialUsers = [
    { id: 1, name: 'Kacper Grzelak', role: 'agent', status: 'active', email: 'kacper@example.com' },
    { id: 2, name: 'Patryk Pogorzelczyk', role: 'agent', status: 'active', email: 'patryk@example.com' },
    { id: 3, name: 'Bartosz Korszun', role: 'agent', status: 'active', email: 'bartosz@example.com' },
    { id: 4, name: 'Igor Lider', role: 'agent leader', status: 'active', email: 'Igor@example.com' },
];

const AdminPage = () => {
    const [users, setUsers] = useState(initialUsers);
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChangeRole = (userId) => {
        setUsers(users.map(user => {
            if (user.id === userId) {
                return {
                    ...user,
                    role: user.role === 'agent' ? 'agent leader' : 'agent',
                };
            }
            return user;
        }));
    };

    const handleStatusChange = (userId, newStatus) => {
        setUsers(users.map(user => {
            if (user.id === userId) {
                return { ...user, status: newStatus };
            }
            return user;
        }));
    };

    useEffect(() => {
        if (userInfo == null || userInfo.permissions !== 'admin') {
            navigate('/login');
        }
    }, [userInfo]);

    return (
        <div className="container mt-4">
            <h2>Zarządzanie użytkownikami</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imię Nazwisko</th>
                        <th>Email</th>
                        <th>Rola</th>
                        <th>Status</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Form.Select aria-label="Status select" value={user.status} onChange={(e) => handleStatusChange(user.id, e.target.value)}>
                                    <option value="active">Aktywny</option>
                                    <option value="inactive">Nieaktywny</option>
                                </Form.Select>
                            </td>
                            <td>
                                <Button variant="info" onClick={() => handleChangeRole(user.id)}>Przełącz Rolę</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h3>
                Miejsce na inne opcje administracyjne
            </h3>
        </div>
    );
};

export default AdminPage;
