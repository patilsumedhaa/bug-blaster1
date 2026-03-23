import { useState } from "react";
import "./App.css";
import "./styles.css";
import TicketForm from "./components/TicketsForm";

function App() {
  const [tickets, setTickets] = useState([]);
  const [editTicket, setEditTicket] = useState(null);

  const addOrUpdateTicket = (ticket) => {
    if (editTicket) {
      // update ticket
      setTickets((prev) => prev.map((t) => (t.id === ticket.id ? ticket : t)));
      setEditTicket(null);
    } else {
      // add ticket
      setTickets([...tickets, ticket]);
    }
  };

  const handleEdit = (ticket) => {
    setEditTicket(ticket);
  };

  const handleDelete = (id) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };
  return (
    <div className="App">
      <div className="container">
        <h1>Bug Blaster 🐞</h1>

        <TicketForm onAddTicket={addOrUpdateTicket} editTicket={editTicket} />

        <h2>Tickets</h2>

        {tickets.length === 0 && <p>No tickets added yet</p>}

        {tickets.map((ticket) => (
          <div key={ticket.id} className="ticket-card">
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>
            <p>Priority: {ticket.priority}</p>

            <button onClick={() => handleEdit(ticket)}>Edit</button>
            <button onClick={() => handleDelete(ticket.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
