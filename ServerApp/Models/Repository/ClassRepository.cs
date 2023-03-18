using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using ServerApp.Models.Students;
using System.Collections.Generic;

namespace ServerApp.Models.Repository
{
    public class ClassRepository : ISimpleRepository<Class> 
    {
        private DataContext context;
        public ClassRepository(DataContext ctx)
        {
            context = ctx;
        }

        public virtual IQueryable<Class> GetAll(bool related)
        {
            if (related)
            {
                var classes = context.Class.Include(s => s.ClassArm);
                foreach (var _class in classes)
                {
                    foreach (var classArm in _class.ClassArm)
                    {
                        classArm.Class = null;
                        //classArm.Arm.ClassArm = null;
                    }
                }

                return classes;
            }
           return context.Class;
        }

        public virtual Class Get(object id, bool related)
        {
            //permit only certain types such as int, long, and short.
           if (id.GetType() == typeof(int))
           {
                if (related)
                {
                    var _class = context.Class.Include(s => s.ClassArm).First(s => s.Id == (int)id);
                    foreach (var classArm in _class.ClassArm)
                    {
                        classArm.Class = null;
                        //classArm.Arm.ClassArm = null;
                    }
                }
                return context.Class.Find(id);
           }
            
            return null;
        }

        public virtual void Add(Class newData)
        {
            context.Add(newData);
            context.SaveChanges();
        }
        
        public virtual void Update(Class modifiedData)
        {
            context.Update(modifiedData);
            context.SaveChanges();
        }

        public virtual void Delete(Class deletedData)
        {
            context.Remove(deletedData);
            context.SaveChanges();
        }
    }
}