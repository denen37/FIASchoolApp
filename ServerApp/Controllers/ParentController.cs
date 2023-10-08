using Microsoft.AspNetCore.Mvc;
using ServerApp.Models.Repository;
using ServerApp.Models.Students;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;
using System.Text.Json;
using System.Reflection;
using System.ComponentModel;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParentController: Controller
    {
        private ParentRepository repos;
        public ParentController(ParentRepository _repos)
        {
            repos = _repos;
        }

        [HttpGet]
        public IEnumerable<Parent> GetAllParent()
        {
            return repos.GetAll();
        }

        [HttpGet]
        [Route("names")]
        public IActionResult GetParentNames()
        {
            return Ok(repos.GetAllNames());
        }

        [HttpGet("{id}")]
        public IActionResult GetParent(long id)
        {
            Parent parent = repos.Get(id);
            if (parent == null)
            {
                return NotFound();
            }
            return Ok(parent);
        }

        [HttpPost]
        public IActionResult AddParent([FromBody] Parent newParent) 
        {
            if (ModelState.IsValid)
            {
                if (newParent.Id == 0)
                    repos.Add(newParent);
                else
                    repos.Update(newParent);
                return Ok(newParent.Id);
            }

            return BadRequest();
        }

         [HttpPatch("{id}")]
        public IActionResult Update(long id, 
                [FromBody]JsonPatchDocument<Parent> patch)
        {
            Parent parent = repos.Get(id);
            patch.ApplyTo(parent, ModelState);
            if (ModelState.IsValid && TryValidateModel(parent))
            {
                repos.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        
        [Route("update-many")]
        [HttpPost]
        public IActionResult UpdateManyParents([FromBody] List<Parent> modifiedParents)
        {
            if(ModelState.IsValid)
            {
                repos.BulkUpdate(modifiedParents);
                return Ok("Success!");
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete]
        public void DeleteParent(long id)
        {
            repos.Delete(new Parent{Id = id});
        }
    }
}