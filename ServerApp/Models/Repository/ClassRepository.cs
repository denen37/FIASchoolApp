using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using ServerApp.Models.Students;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query;
using static System.Console;
using System.Security.Authentication;

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

        public virtual Class Get(short id, bool related)
        {
            if (related)
            {
                var _class = context.Class.Include(s => s.ClassArms).ThenInclude(a => a.Arm)
                                            .Include(s => s.ClassArms).ThenInclude(c => c.CourseCategory)//.AsNoTracking()
                                            .First(s => s.Id == id);
                foreach (var classArm in _class.ClassArms)
                {
                    classArm.Class = null;
                    classArm.Arm.ClassArms = null;
                }

                return _class;
            }
            return context.Class.Find(id);
        }

        public virtual void Add(Class newData)
        {
            context.Add(newData);
            context.SaveChanges();
        }
        
        public virtual void Update(Class modifiedData)
        {
            var originalClass = Get(modifiedData.Id, false);
            originalClass.Name = modifiedData.Name;
            
            originalClass.ClassArms = modifiedData.ClassArms;
            //context.Attach(modifiedClassArm);

            foreach (var classArm in originalClass.ClassArms)
            {
                switch (classArm.EntityState)
                {
                    case ClientEntityState.Modified:
                    context.Entry(classArm).State = EntityState.Modified;
                    break;

                    case ClientEntityState.Added:
                    context.Entry(classArm).State = EntityState.Added;
                    break;

                    case ClientEntityState.Deleted:
                    context.Entry(classArm).State = EntityState.Deleted;
                    break;

                    case ClientEntityState.Unchanged:
                    default:
                    context.Entry(classArm).State = EntityState.Unchanged;
                    break;
                }
            }

            context.SaveChanges();
        }

        public virtual void Delete(Class deletedData)
        {
            context.Remove(deletedData);
            context.SaveChanges();
        }
    }
}