import React, { useEffect, useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../context/UserContext';
import { useTickets } from '../../context/TicketContext';
import { useNavigate } from 'react-router-dom';

const AddTicketPage = () => {
    const { addTicket } = useTickets();
    const [ticket, setTicket] = useState({
        title: '',
        description: '',
        type: '',
    });
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTicket(ticket);
        navigate('/user');
    };

    useEffect(() => {
        if (userInfo == null || userInfo.permissions !== 'user') {
            navigate('/login');
        }
    }, [userInfo]);


    return (
        <div className="container mt-4">
            <h2>Dodaj Ticket</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="ticketTitle">
                    <Form.Label>Tytuł ticketu</Form.Label>
                    <Form.Control type="text" placeholder="Wpisz tytuł" value={ticket.title} onChange={(e) => setTicket({ ...ticket, title: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="ticketDescription">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Opis zgłoszenia" value={ticket.description} onChange={(e) => setTicket({ ...ticket, description: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="ticketType">
                    <Form.Label>Typ Ticketu</Form.Label>
                    <Form.Select value={ticket.type} onChange={(e) => setTicket({ ...ticket, type: e.target.value })}>
                        <option value="">Wybierz typ ticketu</option>
                        <option value="Incydent">Incydent</option>
                        <option value="Wniosek">Wniosek</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Wyślij ticket
                </Button>
            </Form>
        </div>
    );
};

export default AddTicketPage;
