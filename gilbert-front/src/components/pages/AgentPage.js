import React, { useContext, useEffect } from 'react';
import { useTickets } from '../../context/TicketContext';
import { Table, Button } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const AgentPage = () => {
    const { tickets, assignTicketToAgent } = useTickets(); // Assuming you have a method to assign tickets
    const currentAgentId = 'Kacper Grzelak';
    const { userInfo } = useContext(UserContext); // Use the user context
    const navigate = useNavigate();
    // Filter tickets for "My Tickets" and "Unassigned Tickets"
    const myTickets = tickets.filter(ticket => ticket.assignedAgent === currentAgentId);
    const unassignedTickets = tickets.filter(ticket => ticket.assignedAgent === null);

    const handleAssignTicket = (ticketId) => {
        assignTicketToAgent(ticketId, currentAgentId);
        // Implement this function in your context to update the ticket's assignedTo field
    };
    // New function to handle row click
    const handleRowClick = (ticketId) => {
        navigate(`/ticket/${ticketId}`); // Navigate to ticket details
    };
    useEffect(() => {
        if (userInfo == null || (userInfo.permissions !== 'agent' && userInfo.permissions !== 'agent-leader')) {
            navigate('/login');
        }
    }, [userInfo]);
    return (
        <div className="container mt-4">
            <h2>Moje Tickety</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tytuł taska</th>
                        <th>Data ostatniej zmiany</th>
                        <th>Założyciel taska</th>
                        <th>Obecny status</th>
                    </tr>
                </thead>
                <tbody>
                    {myTickets.map(ticket => (
                        <tr key={ticket.id} onClick={() => handleRowClick(ticket.id)} style={{ cursor: 'pointer' }}>
                            <td>{ticket.id}</td>
                            <td>{ticket.title}</td>
                            <td>{new Date(ticket.lastChanged).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                            <td>Marcin Marciniak</td>
                            <td>
                                <span className={ticket.status === 'Nowy' ? 'text-warning' : ticket.status === 'Zakończony' ? 'text-success' : 'text-muted'}>
                                    {ticket.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h2>Nieprzypisane Tickety</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tytuł taska</th>
                        <th>Data założenia</th>
                        <th>Założyciel taska</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {unassignedTickets.map(ticket => (
                        <tr key={ticket.id}>
                            <td>{ticket.id}</td>
                            <td>{ticket.title}</td>
                            <td>{new Date(ticket.createdDate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                            <td>Marcin Marciniak</td>
                            <td><Button variant="primary" onClick={() => handleAssignTicket(ticket.id)}>Przypisz mnie</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AgentPage;
