using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;
using System.Text.Json;
using System.Reflection;
using System.ComponentModel;
using ServerApp.Models.Repository;
using ServerApp.Models.Students;
using Microsoft.AspNetCore.Cors;
//using ServerApp.Controllers.Filters;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   // [AllowCrossSiteJson]
    public class StudentController: Controller
    {
        private StudentRepository repos;
        public StudentController(StudentRepository _repos)
        {
            repos = _repos;
        }
       
       // [EnableCors("AllowAngularOrigins")]
        [HttpGet]
        public IActionResult GetAllStudents(string name, string classroom, string arm, string session)
        {
            //return repos.GetAll(related);
            return Ok(repos.GetStudentsInClass(name, classroom, arm, session));
        }

        [HttpGet("{id}")]
        public IActionResult GetStudent(long id, bool related = false)
        {
            Student student = repos.Get(id, related);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }

        [HttpPost]
        public IActionResult AddStudent([FromBody] Student  newStudent)
        {
            if (ModelState.IsValid)
            {
                if (newStudent.Id == 0)
                {
                    repos.Add(newStudent);
                    return Ok(newStudent.Id);
                }
                else
                { 
                    repos.Update(newStudent);
                    return Ok();
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Route("add-many")]
        [HttpPost]
        public IActionResult AddManyStudents([FromBody] List<Student> newStudents)
        {
            if (ModelState.IsValid)
            {
                repos.BulkAdd(newStudents);
                return Ok("Success!");
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Route("update-many")]
        [HttpPost]
        public IActionResult UpdateManyStudents([FromBody] List<Student> modifiedStudents)
        {
            if(ModelState.IsValid)
            {
                repos.BulkUpdate(modifiedStudents);
                return Ok("Success!");
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete]
        public void DeleteStudent(long id)
        {
            repos.Delete(new Student{Id = id});
        }

        [HttpPatch("{id}")]
        public IActionResult Update(long id, 
                [FromBody]JsonPatchDocument<Student> patch)
        {
            Student student = repos.Get(id);
            patch.ApplyTo(student, ModelState);
            if (ModelState.IsValid && TryValidateModel(student))
            {
                repos.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}