import React, { useEffect, useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTickets } from '../../context/TicketContext';
import { UserContext } from '../../context/UserContext';

const UserPage = () => {
    const navigate = useNavigate();
    const { tickets } = useTickets();
    const { userInfo } = useContext(UserContext);

    const handleRaiseTicket = () => {
        navigate('/add-ticket');
    };


    useEffect(() => {
        if (userInfo == null || userInfo.permissions !== 'user') {
            navigate('/login');
        }
    }, [userInfo]);

    return (
        <div className="container mt-4">
            <Button variant="primary" size="lg" onClick={handleRaiseTicket}>Zgłoś ticket</Button>

            <div className="mt-3">
                <h3>Twoje Tickety</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tytuł taska</th>
                            <th>Data założenia</th>
                            <th>Przypisany agent</th>
                            <th>Obecny status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id} onClick={() => navigate(`/ticket/${ticket.id}`)} style={{ cursor: 'pointer' }}>
                                <td>{ticket.id}</td>
                                <td>{ticket.title}</td>
                                <td>{new Date(ticket.createdDate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                                <td>{ticket.assignedAgent}</td>
                                <td>
                                    <span className={ticket.status === 'Nowy' ? 'text-warning' : ticket.status === 'Zakończony' ? 'text-success' : 'text-muted'}>
                                        {ticket.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default UserPage;
