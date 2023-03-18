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
            //context.AcademicReport.Where(a => a.ClassArmId == classArmId && a.SessionTermId == sessionTermId).ToList();
            if (related)
            {
                var report = context.AcademicReport.Where(a => a.ClassArmId == classArmId && a.SessionTermId == sessionTermId)
                                                    .Select(a => new{
                                                        a.Id,
                                                        a.ClassArmId,
                                                        a.SessionTermId,
                                                        a.Student
                                                    });
                                                    
            }
            return context.AcademicReport.Where(a => a.ClassArmId == classArmId && a.SessionTermId == sessionTermId);
        }

        public AcademicReport Get (long studentId, int classArmId, int sessionTermId, bool related = false)
        {
            throw new NotImplementedException();
        }

        public void Add (AcademicReport newData)
        {
            throw new NotImplementedException();
        }

        public void Update (AcademicReport modifiedData)
        {
            throw new NotImplementedException();
        }

        public void Delete (AcademicReport deletedData)
        {
            throw new NotImplementedException();
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