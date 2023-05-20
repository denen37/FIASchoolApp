using System;
using System.Linq;
using ServerApp.Models.Students;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ServerApp.Models.Repository
{
    public class SubjectPerformanceRepository/*: ISubjectPerformanceRepository*/
    {
        private DataContext context;
        public SubjectPerformanceRepository(DataContext contxt)
        {
            context = contxt;
        }
        public IQueryable<SubjectPerformance> GetAll (bool related = false)
        {
            throw new NotImplementedException();
        }

        public ReportCard  GetReportCard(long AcademicReportId, Dictionary<string, bool> queryParams) 
        {
            ReportCard report = new ReportCard();

            if (queryParams["student"])
            {
                report.Student = context.AcademicReport
                                .Include(a => a.Student)
                                .Where(x => x.Id == AcademicReportId)
                                .Select(a => new BasicStudentInfo
                                {
                                    FullName = a.Student.LastName + " " + a.Student.MiddleName + " " + a.Student.FirstName,
                                    Age = a.Student.Age,
                                    Sex = a.Student.Sex,
                                    AdmissionNumber = a.Student.AdmissionNumber
                                }).First();

            }

            if (queryParams["result"])
            {
                report.Results = context.ComputedResults
                .FromSqlRaw($"EXEC Student.sp_GetSubjectPerformancesForStudent '{AcademicReportId}'")
                .ToList();

            }
            if (queryParams["performance"])
            {
                report.Performance = context.OverallPerformance
                                        .Select(x => x)
                                        .Where(x => x.AcademicReportId == AcademicReportId)
                                        .First();

            }
            if (queryParams["skills"])
            {
                report.Skills = context.StudentSkillJunction
                            .Select(s => s)
                            .Include(s => s.Skill)
                            .ThenInclude(s => s.SkillType)
                            .Include(s => s.Rating)
                            .Where(s => s.AcademicReportId == AcademicReportId)
                            .ToList();
            }

            return report;
        }

        public SubjectPerformance Get (object id, bool related = false)
        {
            throw new NotImplementedException();
        }

        public void Add (SubjectPerformance newData)
        {
            throw new NotImplementedException();
        }

        public void Update (SubjectPerformance modifiedData)
        {
            throw new NotImplementedException();
        }

        public void Delete (SubjectPerformance deletedData)
        {
            throw new NotImplementedException();
        }

        public void BulkAdd(List<SubjectPerformance> newData)
        {
            throw new NotImplementedException();
        }

        public void BulkUpdate (List<SubjectPerformance> modifiedData)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }
    }
}