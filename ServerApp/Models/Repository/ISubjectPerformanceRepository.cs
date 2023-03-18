using System.Linq;
using ServerApp.Models.Students;
using System.Collections.Generic;

namespace ServerApp.Models.Repository
{
    public interface ISubjectPerformanceRepository
    {
        IQueryable<SubjectPerformance> GetAll (bool related = false);

        SubjectPerformance Get (object id, bool related = false);

        void Add (SubjectPerformance newData);

        void Update (SubjectPerformance modifiedData);

        void Delete (SubjectPerformance deletedData);

        void BulkAdd(List<SubjectPerformance> newData);

        void BulkUpdate (List<SubjectPerformance> modifiedData);

        void SaveChanges();

    }
}