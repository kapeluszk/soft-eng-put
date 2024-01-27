import React, { createContext, useState, useContext } from 'react';

const TicketContext = createContext();

export const useTickets = () => useContext(TicketContext);

export const TicketProvider = ({ children }) => {
    const [tickets, setTickets] = useState([
        {
            id: 1,
            title: 'Internet connection issue',
            description: 'Cannot connect to the internet.',
            type: 'Incydent',
            status: 'Przypisany',
            createdDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            lastChanged: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            assignedAgent: 'Kacper Grzelak',
            messages: [
                { id: 0, sender: 'User', text: 'Cannot connect to the internet.' },
                { id: 1, sender: 'Agent', text: 'Agent Kacper zaraz zajmie się zgłoszeniem.' },
            ]
        },
        {
            id: 2,
            title: 'Email access problem',
            description: 'Cannot access my email.',
            type: 'Wniosek',
            status: 'Zakończony',
            createdDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            lastChanged: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            assignedAgent: 'Patryk Pogorzelczyk',
            messages: [
                { id: 0, sender: 'User', text: 'Cannot access my email.' },
                { id: 1, sender: 'Agent', text: 'Agent Patryk zaraz zajmie się zgłoszeniem.' },
            ]
        },
        {
            id: 3,
            title: 'Laptop issue',
            description: 'My laptop is not working.',
            type: 'Incydent',
            status: 'W trakcie',
            createdDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            lastChanged: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            assignedAgent: 'Bartosz Korszun',
            messages: [
                { id: 0, sender: 'User', text: 'My laptop is not working.' },
                { id: 1, sender: 'Agent', text: 'Agent Bartosz zaraz zajmie się zgłoszeniem.' },
            ]
        },
        {
            id: 4,
            title: 'Printer issue',
            description: 'My printer is not working.',
            type: 'Wniosek',
            status: 'Nowy',
            createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            lastChanged: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            assignedAgent: null,
            messages: [
                { id: 0, sender: 'User', text: 'My printer is not working.' },
            ]
        },
        {
            id: 5,
            title: 'Software installation - MS Office',
            description: 'I need to install Microsoft Office.',
            type: 'Wniosek',
            status: 'Nowy',
            createdDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
            lastChanged: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            assignedAgent: null,
            messages: [
                { id: 0, sender: 'User', text: 'I need to install Microsoft Office.' },
            ]
        },
        {
            id: 6,
            title: 'Software installation - Linux Arch',
            description: 'I need to install Linux Arch.',
            type: 'Wniosek',
            status: 'Nowy',
            createdDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
            lastChanged: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            assignedAgent: null,
            messages: [
                { id: 0, sender: 'User', text: 'I need to install Linux Arch.' },
            ]
        },
    ]);

    const getTicketById = (id) => tickets.find(ticket => ticket.id === id);

    const assignTicketToAgent = (ticketId, agentId) => {
        setTickets(tickets.map(ticket => {
            if (ticket.id === ticketId) {
                return { ...ticket, assignedAgent: agentId };
            }
            return ticket;
        }));
    };

    const updateMessages = (ticketId, messages) => {
        setTickets(tickets.map(ticket => {
            if (ticket.id === ticketId) {
                return { ...ticket, messages };
            }
            return ticket;
        }));
    };


    const addTicket = (ticket) => {
        setTickets([...tickets, { ...ticket, id: tickets.length + 1, status: 'Nowy', createdDate: new Date(Date.now()), assignedAgent: '' }]);
    };

    return (
        <TicketContext.Provider value={{ tickets, addTicket, getTicketById, assignTicketToAgent, updateMessages }}>
            {children}
        </TicketContext.Provider>
    );
};
