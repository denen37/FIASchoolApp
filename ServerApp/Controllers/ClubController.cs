using Microsoft.AspNetCore.Mvc;
using ServerApp.Models.Repository;
using ServerApp.Models.Students;
using System.Linq;
using System.Collections.Generic;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClubController: ControllerBase
    {
        private ISimpleRepository<Club> repos;

        public ClubController(ISimpleRepository<Club> _repos)
        {
            repos = _repos;
        }

        [HttpGet]
        public IEnumerable<Club> GetAllClubs()
        {
            return repos.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult GetClub(short id)
        {
            Club club = repos.Get(id);
            if (club == null)
            {
                return NotFound();
            }
            return Ok(club);
        }

        [HttpPost]
        public IActionResult AddClub([FromBody] Club newClub)
        {
            if (ModelState.IsValid)
            {
                repos.Add(newClub);
                return Ok(newClub.Id);
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult UpdateClub ([FromBody] Club modifiedClub)
        {
            if (ModelState.IsValid)
            {
                repos.Update(modifiedClub);
                return Ok(modifiedClub.Id);
            }

            return BadRequest();
        }

        [HttpDelete]
        public void DeleteClub(short id)
        {
            repos.Delete(new Club {Id = id});
        }

    }
}