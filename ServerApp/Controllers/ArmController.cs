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
        private ISimpleRepository<Arm> armRepos;
        private ISimpleRepository<ClassArmJunction> classArmRepos;

        public ArmController(ISimpleRepository<Arm> _armRepos,
                            ISimpleRepository<ClassArmJunction> _classArmRepos)
        {
            armRepos = _armRepos;
            classArmRepos = _classArmRepos;
        }

        [HttpGet]
        public IEnumerable<Arm> GetAllArms()
        {
            return armRepos.GetAll();
        }

        [HttpGet("{id}")]
        public IActionResult GetArm(int id)
        {
            Arm arm = armRepos.Get(id);
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
                armRepos.Add(newArm);
                return Ok(newArm.Id);
            }

            return BadRequest();
        }

        [Route("class-arm")]
        [HttpPost]
        public IActionResult AddClassArm([FromBody] ClassArmJunction classArm)
        {
            if (ModelState.IsValid)
            {
                if (classArm.CourseCategory.Id > 0)
                {
                    classArm.CourseCategory = null;
                }
                if (classArm.Arm.Id > 0)
                {
                    classArm.Arm = null;
                }
                
                classArmRepos.Add(classArm);
                //classArm.Arm.ClassArms = null;
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult UpdateArm ([FromBody] Arm modifiedArm)
        {
            if (ModelState.IsValid)
            {
                armRepos.Update(modifiedArm);
                return Ok(modifiedArm.Id);
            }

            return BadRequest();
        }

        [HttpDelete]
        public void DeleteArm(short id)
        {
            armRepos.Delete(new Arm {Id = id});
        }
    }
}