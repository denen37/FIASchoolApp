using Microsoft.AspNetCore.Mvc;
using ServerApp.Models.Repository;
using ServerApp.Models.Students;
using System.Linq;
using System.Collections.Generic;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArmController: ControllerBase
    {
        private ISimpleRepository<Arm> repos;

        public ArmController(ISimpleRepository<Arm> _repos)
        {
            repos = _repos;
        }

        [HttpGet]
        public IEnumerable<Arm> GetAllArms()
        {
            return repos.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult GetArm(int id)
        {
            Arm arm = repos.Get(id);
            if (arm == null)
            {
                return NotFound();
            }
            return Ok(arm);
        }

        [HttpPost]
        public IActionResult AddArm([FromBody] Arm newArm)
        {
            if (ModelState.IsValid)
            {
                repos.Add(newArm);
                return Ok(newArm.Id);
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult UpdateArm ([FromBody] Arm modifiedArm)
        {
            if (ModelState.IsValid)
            {
                repos.Update(modifiedArm);
                return Ok(modifiedArm.Id);
            }

            return BadRequest();
        }

        [HttpDelete]
        public void DeleteArm(short id)
        {
            repos.Delete(new Arm {Id = id});
        }

    }
}