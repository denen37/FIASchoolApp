using System.Linq;
using System.Collections.Generic;
using ServerApp.Models.Students;

namespace ServerApp.Models.Repository
{
    public interface IAcademicReportRepository
    {
        IQueryable<AcademicReport> GetAll (int classArmId, int sessionTermId, bool related = false);

        AcademicReport Get (long studentId, int classArmId, int sessionTermId, bool related = false);

        void Add (AcademicReport newData);

        void Update (AcademicReport modifiedData);

        void Delete (AcademicReport deletedData);

        void BulkAdd(List<AcademicReport> newData);

        void BulkUpdate (List<AcademicReport> modifiedData);

        void SaveChanges();
    }
}