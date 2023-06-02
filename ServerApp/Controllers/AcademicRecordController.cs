using Microsoft.AspNetCore.Mvc;
using ServerApp.Models.Repository;
using ServerApp.Models.Students;
using System.Linq;
using System.Collections.Generic;
using ServerApp.Controllers.Filters;


namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AcademicRecordController: ControllerBase
    {
        private SubjectPerformanceRepository repo;
        public AcademicRecordController(SubjectPerformanceRepository _repo)
        {
            repo = _repo;
        }

        [HttpGet]
        public IActionResult GetAcademicRecordsForClass([FromQuery]QueryParams queryParams)
        {
            return Ok(repo.GetAcademicRecordsForClass(queryParams));
        }

        [HttpGet("{create}")]
        public IActionResult CreateScoreSheet([FromQuery] QueryParams query)
        {
            return Ok(repo.CreateScoreSheet(query));
        }

        [HttpPut]
        public IActionResult UpdateAcademicRecords([FromBody] List<SubjectPerformance> performances)
        {
            if(ModelState.IsValid)
            {
                repo.BulkUpdate(performances);
                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPost]
        public IActionResult AddAcademicRecords([FromBody] List<SubjectPerformance> performances)
        {
            if (ModelState.IsValid)
            {
                repo.BulkAdd(performances);
                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}