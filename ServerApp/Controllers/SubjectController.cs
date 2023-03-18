using Microsoft.AspNetCore.Mvc;
using ServerApp.Models.Repository;
using ServerApp.Models.Students;
using System.Linq;
using System.Collections.Generic;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController: ControllerBase
    {
        private ISimpleRepository<Subject> repos;

        public SubjectController(ISimpleRepository<Subject> _repos)
        {
            repos = _repos;
        }

        [HttpGet]
        public IEnumerable<Subject> GetAllSubjects()
        {
            return repos.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult GetSubject(short id)
        {
            Subject subject = repos.Get(id);
            if (subject == null)
            {
                return NotFound();
            }
            return Ok(subject);
        }

        [HttpPost]
        public IActionResult AddSubject([FromBody] Subject newSubject)
        {
            if (ModelState.IsValid)
            {
                repos.Add(newSubject);
                return Ok(newSubject.Id);
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult UpdateSubject ([FromBody] Subject modifiedSubject)
        {
            if (ModelState.IsValid)
            {
                repos.Update(modifiedSubject);
                return Ok(modifiedSubject.Id);
            }

            return BadRequest();
        }

        [HttpDelete]
        public void DeleteSubject(short id)
        {
            repos.Delete(new Subject {Id = id});
        }

    }
}