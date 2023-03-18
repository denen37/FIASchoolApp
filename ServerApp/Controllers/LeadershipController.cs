using Microsoft.AspNetCore.Mvc;
using ServerApp.Models.Repository;
using ServerApp.Models.Students;
using System.Linq;
using System.Collections.Generic;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeadershipController: ControllerBase
    {
        private ISimpleRepository<LeadershipPosition> repos;
        public LeadershipController(ISimpleRepository<LeadershipPosition> _repos)
        {
            repos = _repos;
        }

        [HttpGet]
        public IEnumerable<LeadershipPosition> GetLeadershipPosts()
        {
            return repos.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult GetLeadershipPost(short id, bool related = false)
        {
            LeadershipPosition post = repos.Get(id);
            if (post == null)
            {
                return NotFound();
            }
           /* if (related)
            {
                //var students = relatedRepos.IncludeRelatedStudent<LeadershipPosition>(id, post);
                post.Students = students;
            }*/
            return Ok(post);
        }

        [HttpPost]
        public IActionResult AddPost([FromBody] LeadershipPosition newPost)
        {
             if (ModelState.IsValid)
            {
                if (newPost.Id == 0)
                    repos.Add(newPost);
                else
                    repos.Update(newPost);
                return Ok(newPost.Id);
            }

            return BadRequest();
        }

        [HttpDelete]
        public void DeletePost(short id)
        {
            repos.Delete(new LeadershipPosition{Id = id});
        }
    }
}