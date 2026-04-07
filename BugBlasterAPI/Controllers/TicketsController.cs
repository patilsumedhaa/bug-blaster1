using Microsoft.AspNetCore.Mvc;
using BugBlasterAPI.Data;
using BugBlasterAPI.Models;

namespace BugBlasterAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TicketsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/tickets
        [HttpGet]
        public IActionResult GetAll()
        {
            var tickets = _context.Tickets.ToList();
            return Ok(tickets);
        }

        // POST: api/tickets
        [HttpPost]
        public IActionResult Create(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
            _context.SaveChanges();
            return Ok(ticket);
        }

        // PUT: api/tickets/1
        [HttpPut("{id}")]
        public IActionResult Update(int id, Ticket updatedTicket)
        {
            var ticket = _context.Tickets.Find(id);
            if (ticket == null) return NotFound();

            ticket.Title = updatedTicket.Title;
            ticket.Description = updatedTicket.Description;
            ticket.Priority = updatedTicket.Priority;
            ticket.Status = updatedTicket.Status;

            _context.SaveChanges();
            return Ok(ticket);
        }

        // DELETE: api/tickets/1
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var ticket = _context.Tickets.Find(id);
            if (ticket == null) return NotFound();

            _context.Tickets.Remove(ticket);
            _context.SaveChanges();
            return Ok();
        }
    }
}