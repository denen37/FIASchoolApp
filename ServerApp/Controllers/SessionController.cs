using Microsoft.AspNetCore.Mvc;
using ServerApp.Models.Repository;
using ServerApp.Models.Students;
using System.Linq;
using System.Collections.Generic;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController: ControllerBase
    {
        private SessionRepository repos;

        public SessionController(SessionRepository _repos)
        {
            repos = _repos;
        }

        [HttpGet]
        public IEnumerable<Session> GetAllSessions(bool related = false, bool metadata = false)
        {
            return repos.GetAll(related);
        }

        [HttpGet("{id}")]
        public IActionResult GetSession(int id, bool related, bool metadata = false)
        {
            Session session = repos.Get(id, related);
            if (session == null)
            {
                return NotFound();
            }
            return Ok(session);
        }

        [HttpPost]
        public IActionResult AddSession([FromBody] Session newSession)
        {
             if (ModelState.IsValid)
            {
                if (newSession.Id == 0)
                    repos.Add(newSession);
                else
                    repos.Update(newSession);
                return Ok(newSession.Id);
            }

            return BadRequest();
        }

        [HttpDelete]
        public void DeleteSession(int id)
        {
            repos.Delete(new Session {Id = id});
        }

    }
}