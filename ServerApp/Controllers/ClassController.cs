using Microsoft.AspNetCore.Mvc;
using ServerApp.Models.Repository;
using ServerApp.Models.Students;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController: ControllerBase
    {
        private ClassRepository repos;

        public ClassController(ClassRepository _repos)
        {
            repos = _repos;
        }

        [HttpGet]
        public IActionResult GetAllClasses(bool related = false, bool courseCategory = false)
        {
            return Ok(repos.GetAll(related, courseCategory));
        }

        [HttpGet("{id}")]
        public IActionResult GetClass(short id, bool related = false)
        {
            Class _class = repos.Get(id, related);
            if (_class == null)
            {
                return NotFound();
            }
            return Ok(_class);
        }

        [HttpPost]
        public IActionResult AddClass([FromBody] Class newClass)
        {
            if (ModelState.IsValid)
            {
                repos.Add(newClass);
                return Ok(newClass);
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult UpdateClass ([FromBody] Class modifiedClass)
        {
            if (ModelState.IsValid)
            {
                foreach (var classArm in modifiedClass.ClassArms)
                {
                    classArm.CourseCategory = null;
                    //classArm.Class = null;
                }
                repos.Update(modifiedClass);
                return Ok(modifiedClass);
            }

            return BadRequest();
        }

        [HttpDelete]
        public void DeleteClass(short id)
        {
            repos.Delete(new Class {Id = id});
        }
    }
}