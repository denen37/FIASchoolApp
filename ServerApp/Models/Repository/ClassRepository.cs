using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using ServerApp.Models.Students;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query;

namespace ServerApp.Models.Repository
{
    public class ClassRepository
    {
        private DataContext context;
        public ClassRepository(DataContext ctx)
        {
            context = ctx;
        }

        public virtual Object GetAll(bool related, bool courseCategory = false)
        {
            var classes = context.Class.AsQueryable();
            if (related)
            {
                classes = classes.Include(s => s.ClassArms).ThenInclude(a => a.Arm)
                .AsQueryable();
                
                if (courseCategory)
                {
                    classes = classes
                    .Include(a => a.ClassArms)
                    .ThenInclude(a => a.CourseCategory);
                }
                
                classes = classes.Select(x => new Class{
                        Id = x.Id,
                        Name = x.Name,
                        ClassArms = x.ClassArms.OrderBy(x => x.Arm.Id)
                    });
                    
                foreach (var _class in classes)
                {
                    foreach (var classArm in _class.ClassArms)
                    {
                        classArm.Class = null;
                        classArm.Arm.ClassArms = null;
                    }
                }
            }
            return classes;
        }

        public virtual Class Get(object id, bool related)
        {
            //permit only certain types such as int, long, and short.
           if (id.GetType() == typeof(int))
           {
                if (related)
                {
                    var _class = context.Class.Include(s => s.ClassArms).ThenInclude(a => a.Arm)
                    .First(s => s.Id == (int)id);
                    foreach (var classArm in _class.ClassArms)
                    {
                        classArm.Class = null;
                        classArm.Arm.ClassArms = null;
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