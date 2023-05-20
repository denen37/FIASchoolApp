using Microsoft.AspNetCore.Mvc;
using ServerApp.Models.Repository;
using ServerApp.Models.Students;
using System.Linq;
using System.Collections.Generic;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillController: ControllerBase
    {
        private ISimpleRepository<Skill> repos;

        public SkillController(ISimpleRepository<Skill> _repos)
        {
            repos = _repos;
        }

        [HttpGet]
        public IEnumerable<Skill> GetAllSkills()
        {
            return repos.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult GetSkill(short id)
        {
            Skill skill = repos.Get(id);
            if (skill == null)
            {
                return NotFound();
            }
            return Ok(skill);
        }

        [HttpPost]
        public IActionResult AddSkill([FromBody] Skill newSkill)
        {
            if (ModelState.IsValid)
            {
                repos.Add(newSkill);
                return Ok(newSkill.Id);
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult UpdateSkill ([FromBody] Skill modifiedSkill)
        {
            if (ModelState.IsValid)
            {
                repos.Update(modifiedSkill);
                return Ok(modifiedSkill.Id);
            }

            return BadRequest();
        }

        [HttpDelete]
        public void DeleteSkill(short id)
        {
            repos.Delete(new Skill {Id = id});
        }

    }
}