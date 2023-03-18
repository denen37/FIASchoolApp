using System;
using System.Linq;
using ServerApp.Models.Students;
using System.Collections.Generic;

namespace ServerApp.Models.Repository
{
    public class SubjectPerformanceRepository: ISubjectPerformanceRepository
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