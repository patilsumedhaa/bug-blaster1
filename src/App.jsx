import { useState, useEffect } from "react";
import "./App.css";
import "./styles.css";
import TicketForm from "./components/TicketsForm";

function App() {
  const [tickets, setTickets] = useState([]);
  const [editTicket, setEditTicket] = useState(null);

  const API_URL = "http://localhost:5098/api/tickets"; // change if needed

  // ✅ Load tickets from API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch((err) => console.error("Error fetching tickets:", err));
  }, []);

  // ✅ Add or Update Ticket
  const addOrUpdateTicket = (ticket) => {
    const priorityMap = ["Low", "Medium", "High"];

    const formattedTicket = {
      title: ticket.title,
      description: ticket.description,
      priority:
        typeof ticket.priority === "number"
          ? priorityMap[ticket.priority - 1]
          : ticket.priority || "Low",
      status: ticket.status || "Open",
      createdAt: new Date().toISOString(), // ✅ REQUIRED
    };

    console.log("Sending:", formattedTicket);

    if (editTicket) {
      // 🔄 UPDATE
      fetch(`${API_URL}/${ticket.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formattedTicket,
          id: ticket.id, // ✅ include id for update
        }),
      })
        .then((res) => res.json())
        .then((updated) => {
          setTickets((prev) =>
            prev.map((t) => (t.id === updated.id ? updated : t)),
          );
          setEditTicket(null);
        })
        .catch((err) => console.error("Update error:", err));
    } else {
      // ➕ CREATE
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedTicket), // ✅ send formatted
      })
        .then((res) => res.json())
        .then((newTicket) => {
          setTickets((prev) => [...prev, newTicket]);
        })
        .catch((err) => console.error("Create error:", err));
    }
  };
  // ✏️ Edit
  const handleEdit = (ticket) => {
    setEditTicket(ticket);
  };

  // 🗑️ Delete
  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTickets((prev) => prev.filter((t) => t.id !== id));
      })
      .catch((err) => console.error("Delete error:", err));
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Bug Blaster 🐞</h1>

        <TicketForm onAddTicket={addOrUpdateTicket} editTicket={editTicket} />

        <h2>Tickets</h2>

        {tickets.length === 0 && <p>No tickets added yet</p>}

        {tickets.map((ticket) => (
          <div
            key={ticket.id || `${ticket.title}-${ticket.description}`}
            className="ticket-card"
          >
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>

            <p>Priority: {ticket.priority}</p>

            <p>Status: {ticket.status}</p>

            <button onClick={() => handleEdit(ticket)}>Edit</button>

            <button onClick={() => handleDelete(ticket.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
