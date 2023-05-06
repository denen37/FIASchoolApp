using System;
using System.Linq;
using ServerApp.Models.Students;
using System.Collections.Generic;

namespace ServerApp.Models.Repository
{
    public class OverallPerformanceRepository
    {
        private DataContext context;
        public OverallPerformanceRepository(DataContext contxt)
        {
            context = contxt;
        }
        public IQueryable<OverallPerformance> GetAll (bool related = false)
        {
            throw new NotImplementedException();
        }

        public OverallPerformance Get (object id, bool related = false)
        {
            throw new NotImplementedException();
        }

        public void Add (OverallPerformance newData)
        {
            throw new NotImplementedException();
        }

        public void Update (OverallPerformance modifiedData)
        {
            throw new NotImplementedException();
        }

        public void Delete (OverallPerformance deletedData)
        {
            throw new NotImplementedException();
        }

        public void BulkAdd(List<OverallPerformance> newData)
        {
            throw new NotImplementedException();
        }

        public void BulkUpdate (List<OverallPerformance> modifiedData)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }
    }
}