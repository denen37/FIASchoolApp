using Microsoft.AspNetCore.Mvc;
using ServerApp.Models.Repository;
using ServerApp.Models.Students;
using System.Linq;
using System.Collections.Generic;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AcademicReportController: ControllerBase
    {
        private IAcademicReportRepository repos;

        public AcademicReportController(IAcademicReportRepository _repos)
        {
            repos = _repos;
        }

        [HttpGet]
        public IEnumerable<AcademicReport> GetAllAcademicReports(int classArmId, int sessionTermId, bool related = false)
        {
            return repos.GetAll(classArmId, sessionTermId, related);
        }

        [HttpGet("{id}")]
        public IActionResult GetAcademicReport(long studentId, int classArmId, int sessionTermId, bool related = false)
        {
            AcademicReport report = repos.Get(studentId, classArmId, sessionTermId, related);
            if (report == null)
            {
                return NotFound();
            }
            return Ok(report);
        }

        [HttpPost]
        public IActionResult AddAcademicReport([FromBody] AcademicReport newAcademicReport)
        {
            if (ModelState.IsValid)
            {
                repos.Add(newAcademicReport);
                return Ok(newAcademicReport.Id);
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult UpdateAcademicReport ([FromBody] AcademicReport modifiedAcademicReport)
        {
            if (ModelState.IsValid)
            {
                repos.Update(modifiedAcademicReport);
                return Ok(modifiedAcademicReport.Id);
            }

            return BadRequest();
        }

        [HttpDelete]
        public void DeleteAcademicReport(short id)
        {
            repos.Delete(new AcademicReport {Id = id});
        }

    }
}