import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTickets } from '../../context/TicketContext';
import { useUser } from '../../context/UserContext'; // Import useUser hook
import { Row, Col, ListGroup, Form, Button, Table } from 'react-bootstrap';

const TicketDetailsPage = () => {
    const { id } = useParams();
    const { getTicketById, updateMessages } = useTickets();
    const { userInfo } = useUser();
    const ticket = getTicketById(parseInt(id));
    const [newMessage, setNewMessage] = useState('');

    const [messages, setMessages] = useState(ticket.messages || []);

    const handleSendMessage = (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page
        const message = {
            id: messages.length, // Simple increment, consider using unique IDs in a real app
            sender: userInfo.permissions === 'agent' ? 'Agent' : 'User',
            text: newMessage,
        };

        setMessages([...messages, message]);
        updateMessages(ticket.id, [...messages, message]); // Update the ticket with the new message
        setNewMessage(''); // Reset the input field after sending a message
    };

    if (!ticket) return <div>Ticket not found</div>;

    return (
        <div className="container mt-4">
            <Row>
                <Col md={6}>
                    <h3>Messages</h3>
                    <ListGroup>
                        {messages.map((message, index) => (
                            <ListGroup.Item key={index} style={{
                                backgroundColor: message.sender === 'User' ? '#cce5ff' : '#e2e3e5',
                                borderColor: message.sender === 'User' ? '#b8daff' : '#d6d8db'
                            }}>
                                <strong>{message.sender}:</strong> {message.text}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Form className="mt-3">
                        <Form.Group className="mb-3" controlId="newMessage">
                            <Form.Control as="textarea" rows={2} placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                        </Form.Group>
                        {userInfo.permissions === 'user' && (
                            <>
                                <Button variant="danger" onClick={handleSendMessage}>Usuń ticket</Button>
                                <Button variant="secondary" onClick={() => alert("to be implemented.")} className="ms-2">Dodaj załącznik</Button>
                            </>
                        )}
                        {userInfo.permissions === 'agent' && (
                            <>
                                <Button variant="warning" onClick={() => alert("to be implemented.")} className="ms-2">Zarchiwizuj ticket</Button>
                                <Button variant="secondary" onClick={() => alert("to be implemented.")} className="ms-2">Zmień status</Button>
                            </>
                        )}
                        <Button variant="primary" onClick={handleSendMessage} className="ms-2">Wyślij</Button>
                    </Form>
                </Col>
                <Col md={6}>
                    <Button variant="secondary" onClick={() => window.history.back()}>Wróć do poprzedniej strony</Button>
                    <h3>Szczegóły Ticketa</h3>
                    <Table>
                        <tbody>
                            <tr>
                                <td>ID</td>
                                <td>{ticket.id}</td>
                            </tr>
                            <tr>
                                <td>Tytuł</td>
                                <td>{ticket.title}</td>
                            </tr>
                            <tr>
                                <td>Typ</td>
                                <td>{ticket.type}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{ticket.status}</td>
                            </tr>
                            <tr>
                                <td>Data utworzenia</td>
                                <td>{new Date(ticket.createdDate).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                            </tr>
                            <tr>
                                <td>Przypisany Agent</td>
                                <td>{ticket.assignedAgent}</td>
                            </tr>
                            {/* Add more details as needed */}
                        </tbody>
                    </Table>

                </Col>
            </Row>
        </div>
    );
};

export default TicketDetailsPage;
