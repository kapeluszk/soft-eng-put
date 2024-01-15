import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Ticket from '../interfaces/TicketUser';
import '../styles/TicketsPageUser.css';

interface TicketListProps {
  tickets: Ticket[];
}


const TicketPageUser: React.FC<TicketListProps> = ({ tickets }) => {
    
    const navigate = useNavigate();

    const handleAddTicketClick = () => {
        navigate('/tickets/new');
    };

    return (
    <div className="ticket-list">
      <h2>Ticket List</h2>
      <button className="add-ticket-button" onClick={handleAddTicketClick}>
        Add Ticket
      </button>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id} className="ticket-item">
            <Link to={`/tickets/user/${ticket.id}`}>
              <strong>{ticket.title}</strong>
            </Link>
            <p>ID: {ticket.id}</p>
            <p>Date Created: {ticket.dateCreated}</p>
            <p>Assigned Agent: {ticket.assignedAgent}</p>
            <p>Status: {ticket.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketPageUser;