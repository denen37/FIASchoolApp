using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ServerApp.Models.Students;
using ServerApp.Models.Repository;
using ServerApp.Controllers.Filters;

[Route("api/[controller]")]
[ApiController]
public class SubjectPerformanceController: Controller
{
    private SubjectPerformanceRepository repo;

    public SubjectPerformanceController(SubjectPerformanceRepository _repo)
    {
        repo = _repo;
    }
    [HttpGet("{id:long}")]
    public IActionResult GetReportCard(long id, bool student = false, 
                                                bool result = false, bool performance = false, bool skills = false)
    {
        var queryParams = new Dictionary<string, bool> ()
        {
            ["student"] = student,
            ["result"] = result,
            ["performance"] = performance,
            ["skills"] = skills
        };
        return Ok(repo.GetReportCard(id, queryParams));
    }

    [Route("subject-score")]
    [HttpGet]
    public IActionResult GetSubjectScoresForStudent([FromQuery] QueryParams query)
    {
        return Ok(repo.GetSubjectScoresForStudent(query));
    }


    [HttpGet]
    public IActionResult GetClassScoresForSubject
    (string name, string classroom, string arm, string session, string subject, string term)
    {
        var queryParams = new Dictionary<string, string>
        {
            ["name"] = name,
            ["classroom"] = classroom,
            ["arm"] = arm,
            ["session"] = session,
            ["term"] = term,
            ["subject"] = subject
        };

        return Ok(repo.GetSubjectScores(queryParams));
    }
}
