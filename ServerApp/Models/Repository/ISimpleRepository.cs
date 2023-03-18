using System.Linq;

namespace ServerApp.Models.Repository
{
    public interface ISimpleRepository<T>
    {
        IQueryable<T> GetAll (bool related = false);

        T Get (object id, bool related = false);

        void Add (T newData);

        void Update (T modifiedData);

        void Delete (T deletedData);

    }
}