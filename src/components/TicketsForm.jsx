import { useState, useEffect } from "react";

export default function TicketForm({ onAddTicket, editTicket }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("1");

  const priorityLabels = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  useEffect(() => {
    if (editTicket) {
      setTitle(editTicket.title);
      setDescription(editTicket.description);
      setPriority(editTicket.priority);
    }
  }, [editTicket]);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority("1");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTicket = {
      id: editTicket ? editTicket.id : Date.now(),
      title,
      description,
      priority,
    };

    onAddTicket(newTicket);
    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          className="form-input"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          className="form-input"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <fieldset className="priority-fieldset">
        <legend>Priority</legend>

        {Object.entries(priorityLabels).map(([value, label]) => (
          <label key={value} className="priority-label">
            <input
              type="radio"
              name="priority"
              value={value}
              checked={priority === value}
              onChange={(e) => setPriority(e.target.value)}
            />
            {label}
          </label>
        ))}
      </fieldset>

      <button
        type="submit"
        className={`button ${editTicket ? "edit-btn" : "add-btn"}`}
      >
        {editTicket ? "Update Ticket" : "Add Ticket"}
      </button>
    </form>
  );
}
