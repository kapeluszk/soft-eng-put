import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Ticket from '../interfaces/TicketUser';
import '../styles/TicketDetails.css';

const TicketDetails: React.FC<{ tickets: Ticket[] }> = ({ tickets }) => {
    const { id } = useParams<{ id: string }>();
    const ticket = tickets.find((t) => t.id === parseInt(id as string, 10));

    if (!ticket) {
        return <div>Ticket not found.</div>;
    }

    return (
        <div className="ticket-details">
        <h2>Ticket Details</h2>
        <div className="ticket-details-info">
            <p>ID: {ticket.id}</p>
            <p>Title: {ticket.title}</p>
            <p>Date Created: {ticket.dateCreated}</p>
            <p>Assigned Agent: {ticket.assignedAgent}</p>
            <p>Status: {ticket.status}</p>
            <p>Description: </p>
        </div>
    </div>
    );
};

export default TicketDetails;
