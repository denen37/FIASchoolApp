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
using ServerApp.Controllers.Filters;
using ServerApp.Models.Pages;

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

        [Route("count")]
        [HttpGet]
        public IActionResult GetCount(string session)
        {
            return Ok(repos.CountNumberInClass(session));
        }

       
       // [EnableCors("AllowAngularOrigins")]
        [HttpGet]
        public IActionResult GetAllStudents([FromQuery] QueryParams query, [FromQuery]QueryOptions options)
        {
            //return repos.GetAll(related);
            return Ok(repos.GetStudentsInClass(query, options));
        }

        [HttpGet("{id:long}")]
        public IActionResult GetStudent(long id, bool post = false, bool parents = false,
                                        bool overallPerformance = false, bool morals = false,
                                        bool payments = false)
        {
            Student student = repos.Get(id, post, parents, overallPerformance, morals, payments);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }

        [Route("names")]
        [HttpGet]
        public IActionResult GetStudentNames([FromQuery] QueryParams query)
        {
            return Ok(repos.GetStudentNames(query));
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