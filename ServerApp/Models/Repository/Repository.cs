using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using ServerApp.Models.Students;
using System.Collections.Generic;

namespace ServerApp.Models.Repository
{
    public class Repository<T> : ISimpleRepository<T> where T: class
    {
        private DataContext context;
        public Repository(DataContext ctx)
        {
            context = ctx;
        }

        public virtual IQueryable<T> GetAll(bool related)
        {
           return context.Set<T>();
        }

        public virtual T Get(object id, bool related)
        {
            //permit only certain types such as int, long, and short.
           if (id.GetType() == typeof(int) ||
               id.GetType() == typeof(long) ||
               id.GetType() == typeof(short))
           {
                return context.Set<T>().Find(id);
           }
            
            return null;
        }

        public virtual void Add(T newData)
        {
            context.Add<T>(newData);
            context.SaveChanges();
        }
        
        public virtual void Update(T modifiedData)
        {
            context.Update<T>(modifiedData);
            context.SaveChanges();
        }

        public virtual void Delete(T deletedData)
        {
            context.Remove<T>(deletedData);
            context.SaveChanges();
        }
    }
}