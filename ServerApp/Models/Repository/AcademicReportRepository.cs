using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using ServerApp.Models.Students;
using System.Collections.Generic;

namespace ServerApp.Models.Repository
{
    public class AcademicReportRepository: IAcademicReportRepository
    {
        private DataContext context;
        public AcademicReportRepository(DataContext contxt)
        {
            context = contxt;
        }

        public IQueryable<AcademicReport> GetAll (int classArmId, int sessionTermId, bool related = false)
        {
            if (related)
            {
                var report = context.AcademicReport.Select(a => new AcademicReport {
                                                        Id = a. Id,
                                                        StudentId = a.StudentId,
                                                        ClassArmId = a.ClassArmId,
                                                        SessionTermId = a.SessionTermId,
                                                        Student = a.Student
                                                    })
                                                    .Where(a => a.ClassArmId == classArmId && a.SessionTermId == sessionTermId);
                return report;
                                                    
            }
            return context.AcademicReport.Where(a => a.ClassArmId == classArmId && a.SessionTermId == sessionTermId);
        }

        public AcademicReport Get (long studentId, int classArmId, int sessionTermId, bool related = false)
        {
            if (related)
            {
                var report =context.AcademicReport.Select(a => new AcademicReport {
                                                        Id = a. Id,
                                                        StudentId = a.StudentId,
                                                        ClassArmId = a.ClassArmId,
                                                        SessionTermId = a.SessionTermId,
                                                        Student = a.Student
                                                    })
                                                    .Where(a => a.ClassArmId == classArmId 
                                                    && a.SessionTermId == sessionTermId)
                                                    .First(a => a.StudentId == studentId);
                return report;
            }

             return context.AcademicReport.Where(a => a.ClassArmId == classArmId 
                                                && a.SessionTermId == sessionTermId)
                                                .First(a => a.StudentId == studentId);
        }

        public void Add (AcademicReport newData)
        {
            context.Add(newData);
            context.SaveChanges();
        }

        public void Update (AcademicReport modifiedData)
        {
            context.Update(modifiedData);
            context.SaveChanges();
        }

        public void Delete (AcademicReport deletedData)
        {
            context.Remove(deletedData);
            context.SaveChanges();
        }

        public void BulkAdd(List<AcademicReport> newData)
        {
            throw new NotImplementedException();
        }

        public void BulkUpdate (List<AcademicReport> modifiedData)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }
    }
}