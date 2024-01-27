import React, { useContext, useEffect } from 'react';
import { useTickets } from '../../context/TicketContext';
import { Table, Button } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const AgentLeaderPage = () => {
    const { tickets } = useTickets();
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const handleGenerateReport = () => {
        alert('Report generation logic to be implemented.');
    };

    useEffect(() => {
        if (userInfo == null || (userInfo.permissions !== 'agent-leader' && userInfo.permissions !== 'admin')) {
            navigate('/login');
        }
    }, [userInfo]);

    return (
        <div className="container mt-4">
            <h2>Wszystkie Tickety</h2>
            <Button variant="primary" onClick={handleGenerateReport} className="mb-3">
                Wygeneruj raport
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tytuł taska</th>
                        <th>Data założenia</th>
                        <th>Założyciel taska</th>
                        <th>Obecny status</th>
                        <th>Przypisany agent</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.id}>
                            <td>{ticket.id}</td>
                            <td>{ticket.title}</td>
                            <td>{new Date(ticket.createdDate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                            <td>Marcin Marciniak</td>
                            <td>
                                <span className={ticket.status === 'Nowy' ? 'text-warning' : ticket.status === 'Zakończony' ? 'text-success' : 'text-muted'}>
                                    {ticket.status}
                                </span>
                            </td>
                            <td>
                                <span className={ticket.assignedAgent ? 'text-muted' : 'text-warning'}>
                                    {ticket.assignedAgent || 'Nieprzypisany'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AgentLeaderPage;
