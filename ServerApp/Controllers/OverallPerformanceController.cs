using Microsoft.AspNetCore.Mvc;
using ServerApp.Models.Repository;
using ServerApp.Models.Students;
using System.Linq;
using System.Collections.Generic;
using ServerApp.Controllers.Filters;

namespace ServerApp.Controllers
{
    [Route("api/{controller}")]
    [ApiController]
    public class OverallPerformanceController: ControllerBase
    {
        private OverallPerformanceRepository repo;
        public OverallPerformanceController(OverallPerformanceRepository _repo)
        {
            repo = _repo;
        }

        [HttpGet]
        public IActionResult GetMasterScoreSheet([FromQuery] QueryParams query)
        {
            return Ok(repo.GetMasterScoreSheet(query));
        }

        [HttpPost]
        public IActionResult SaveMasterScoreSheet([FromBody] List<OverallPerformance> performances)
        {
            if (ModelState.IsValid)
            {
                repo.AddMasterScoreSheet(performances);
                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}