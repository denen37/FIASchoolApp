using System.Collections.Generic;
using System.Linq;

namespace ServerApp.Models.Repository
{
    public interface IComplexRepository<T>: ISimpleRepository<T>
    {
        void BulkAdd(List<T> newData);

        void BulkUpdate (List<T> modifiedData);

        void SaveChanges();
    }
}