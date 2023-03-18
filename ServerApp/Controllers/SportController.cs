using Microsoft.AspNetCore.Mvc;
using ServerApp.Models.Repository;
using ServerApp.Models.Students;
using System.Linq;
using System.Collections.Generic;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SportController: ControllerBase
    {
        private ISimpleRepository<Sport> repos;

        public SportController(ISimpleRepository<Sport> _repos)
        {
            repos = _repos;
        }

        [HttpGet]
        public IEnumerable<Sport> GetAllSports()
        {
            return repos.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult GetSport(short id)
        {
            Sport sport = repos.Get(id);
            if (sport == null)
            {
                return NotFound();
            }
            return Ok(sport);
        }

        [HttpPost]
        public IActionResult AddSport([FromBody] Sport newSport)
        {
            if (ModelState.IsValid)
            {
                repos.Add(newSport);
                return Ok(newSport.Id);
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult UpdateSport ([FromBody] Sport modifiedSport)
        {
            if (ModelState.IsValid)
            {
                repos.Update(modifiedSport);
                return Ok(modifiedSport.Id);
            }

            return BadRequest();
        }

        [HttpDelete]
        public void DeleteSport(short id)
        {
            repos.Delete(new Sport {Id = id});
        }

    }
}