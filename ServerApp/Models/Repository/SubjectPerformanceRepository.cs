using System;
using System.Linq;
using ServerApp.Models.Students;
using ServerApp.Controllers.Filters;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
//using Z.EntityFramework.Extensions;

namespace ServerApp.Models.Repository
{
    public class SubjectPerformanceRepository
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

        public IEnumerable<SubjectScore> GetSubjectScores(Dictionary<string, string> query)
        {
            var subjectScores = context.SubjectScores
                                .FromSqlRaw("SELECT * FROM Student.udf_GetClassScoresForSubject" +
                                $"('{query["classroom"]}', '{query["arm"]}', '{query["session"]}'," +
                                $" '{query["term"]}', '{query["subject"]}')");
            
            if (query["name"] != null)
            {
                string name = query["name"];
                name = "%" + name +  "%";
                subjectScores = subjectScores.Where(s => EF.Functions.Like(s.FullName, name));
            }

            return subjectScores.ToList();
        }

        public Object GetAcademicRecordsForClass (QueryParams queryParams)
        {
                       var academicRecords = context.AcademicReport
                                  .Include(x => x.Student)
                                  .Include(x => x.SubjectPerformance)
                                  .Where(x => x.ClassArm.Class.Name == queryParams.Classroom
                                  && x.ClassArm.Arm.Name == queryParams.Arm
                                  && x.SessionTerm.Session.Name == queryParams.Session
                                  && x.SessionTerm.Term.Name == queryParams.Term
                                  && x.SubjectPerformance.Subject.Name == queryParams.Subject)
                                  .Select(x => new {
                                    StudentId = x.StudentId,
                                    FullName = x.Student.LastName + " " +  x.Student.MiddleName + " " + x.Student.FirstName,
                                    AcademicReportId = x.Id,
                                    SubjectPerformance = x.SubjectPerformance
                                  }).ToList();

           
            return academicRecords;
        }

        public Object CreateScoreSheet (QueryParams queryParams)
        {
            var academicRecords = context.AcademicReport
                                  .Include(x => x.Student)
                                  .Include(x => x.SubjectPerformance).ThenInclude(x => x.Subject)
                                  .Where(x => x.ClassArm.Class.Name == queryParams.Classroom
                                  && x.ClassArm.Arm.Name == queryParams.Arm
                                  && x.SessionTerm.Session.Name == queryParams.Session
                                  && x.SessionTerm.Term.Name == queryParams.Term)
                                  .Select(x => new {
                                    StudentId = x.StudentId,
                                    FullName = x.Student.LastName + " " +  x.Student.MiddleName + " " + x.Student.FirstName,
                                    AcademicReportId = x.Id,
                                    SubjectPerformance = new SubjectPerformance {SubjectId = Int16.Parse(queryParams.Subject)}
                                  }).ToList();
            return academicRecords;
        }

        public IEnumerable<SubjectScore> GetSubjectScoresForStudent(QueryParams query)
        {
             var subjectScores = context.SubjectScores
                                .FromSqlRaw("SELECT * FROM Student.udf_GetStudentScores" +
                                $"('{query.Classroom}', '{query.Arm}', '{query.Session}'," +
                                $" '{query.Term}', '{query.Name}')");
            if (query.Subject != null)
            {
                subjectScores = subjectScores.Where(x => x.Subject == query.Subject);
            }

            return subjectScores.ToList();
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
            context.AddRange(newData);
            context.SaveChanges();
        }

        public void BulkUpdate (List<SubjectPerformance> modifiedData)
        {
            context.UpdateRange(modifiedData);
            context.SaveChanges();
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }
    }
}