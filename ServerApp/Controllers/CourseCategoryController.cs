using Microsoft.AspNetCore.Mvc;
using ServerApp.Models.Repository;
using ServerApp.Models.Students;
using System.Linq;
using System.Collections.Generic;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseCategoryController: ControllerBase
    {
        private ISimpleRepository<CourseCategory> repos;

        public CourseCategoryController(ISimpleRepository<CourseCategory> _repos)
        {
            repos = _repos;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(repos.GetAll());
        }
    }
}