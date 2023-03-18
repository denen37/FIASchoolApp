using Microsoft.AspNetCore.Mvc;
using ServerApp.Models.Repository;
using ServerApp.Models.Students;
using System.Linq;
using System.Collections.Generic;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController: ControllerBase
    {
        private ISimpleRepository<Rating> repos;

        public RatingController(ISimpleRepository<Rating> _repos)
        {
            repos = _repos;
        }

        [HttpGet]
        public IEnumerable<Rating> GetAllRatings()
        {
            return repos.GetAll();

        }
        [HttpGet("{id}")]
        public IActionResult GetRating(short id)
        {
            Rating rating = repos.Get(id);
            if (rating == null)
            {
                return NotFound();
            }
            return Ok(rating);
        }

        [HttpPost]
        public IActionResult AddRating([FromBody] Rating newRating)
        {
            if (ModelState.IsValid)
            {
                repos.Add(newRating);
                return Ok(newRating.Id);
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult UpdateRating ([FromBody] Rating modifiedRating)
        {
            if (ModelState.IsValid)
            {
                repos.Update(modifiedRating);
                return Ok(modifiedRating.Id);
            }

            return BadRequest();
        }

        [HttpDelete]
        public void DeleteRating(short id)
        {
            repos.Delete(new Rating {Id = id});
        }

    }
}