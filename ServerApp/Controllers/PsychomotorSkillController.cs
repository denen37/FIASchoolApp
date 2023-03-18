using Microsoft.AspNetCore.Mvc;
using ServerApp.Models.Repository;
using ServerApp.Models.Students;
using System.Linq;
using System.Collections.Generic;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PsychomotorSkillController: ControllerBase
    {
        private ISimpleRepository<PsychomotorSkill> repos;

        public PsychomotorSkillController(ISimpleRepository<PsychomotorSkill> _repos)
        {
            repos = _repos;
        }

        [HttpGet]
        public IEnumerable<PsychomotorSkill> GetAllPsychomotorSkills()
        {
            return repos.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult GetPsychomotorSkill(short id)
        {
            PsychomotorSkill psychomotorSkill = repos.Get(id);
            if (psychomotorSkill == null)
            {
                return NotFound();
            }
            return Ok(psychomotorSkill);
        }

        [HttpPost]
        public IActionResult AddPsychomotorSkill([FromBody] PsychomotorSkill newPsychomotorSkill)
        {
            if (ModelState.IsValid)
            {
                repos.Add(newPsychomotorSkill);
                return Ok(newPsychomotorSkill.Id);
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult UpdatePsychomotorSkill ([FromBody] PsychomotorSkill modifiedPsychomotorSkill)
        {
            if (ModelState.IsValid)
            {
                repos.Update(modifiedPsychomotorSkill);
                return Ok(modifiedPsychomotorSkill.Id);
            }

            return BadRequest();
        }

        [HttpDelete]
        public void DeletePsychomotorSkill(short id)
        {
            repos.Delete(new PsychomotorSkill {Id = id});
        }

    }
}