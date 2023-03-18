using Microsoft.AspNetCore.Mvc;
using ServerApp.Models.Repository;
using ServerApp.Models.Students;
using System.Linq;
using System.Collections.Generic;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TermController: ControllerBase
    {
        private ISimpleRepository<Term> repos;

        public TermController(ISimpleRepository<Term> _repos)
        {
            repos = _repos;
        }

        [HttpGet]
        public IEnumerable<Term> GetAllTerms()
        {
            return repos.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult GetTerm(short id)
        {
            Term term = repos.Get(id);
            if (term == null)
            {
                return NotFound();
            }
            return Ok(term);
        }

        [HttpPost]
        public IActionResult AddTerm([FromBody] Term newTerm)
        {
            if (ModelState.IsValid)
            {
                repos.Add(newTerm);
                return Ok(newTerm.Id);
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult UpdateTerm ([FromBody] Term modifiedTerm)
        {
            if (ModelState.IsValid)
            {
                repos.Update(modifiedTerm);
                return Ok(modifiedTerm.Id);
            }

            return BadRequest();
        }

        [HttpDelete]
        public void DeleteTerm(short id)
        {
            repos.Delete(new Term {Id = id});
        }

    }
}