using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ServerApp.Models.Students;
using ServerApp.Models.Repository;

[Route("api/[controller]")]
[ApiController]
public class SubjectPerformanceController: Controller
{
    private SubjectPerformanceRepository repo;
    private Dictionary<string, bool> queryParams;

    public SubjectPerformanceController(SubjectPerformanceRepository _repo)
    {
        repo = _repo;
    }
    [HttpGet("{id}")]
    public IActionResult GetSubjectPerformances(long id, bool student = false, 
                                                bool result = false, bool performance = false, bool skills = false)
    {
        queryParams = new Dictionary<string, bool> ()
        {
            ["student"] = student,
            ["result"] = result,
            ["performance"] = performance,
            ["skills"] = skills
        };
        return Ok(repo.GetReportCard(id, queryParams));
    }
}
