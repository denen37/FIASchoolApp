using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using ServerApp.Models.Students;
using System.Collections.Generic;

namespace ServerApp.Models.Repository
{
    public class ParentRepository
    {
        private DataContext context;
        public ParentRepository(DataContext ctx)
        {
            context = ctx;
        }

        public IQueryable<Parent> GetAll(/*bool related*/)
        {
            var parents = context.Parent;
            return parents;
        }

        public Object GetAllNames()
        {
            return context.Parent.Select(x => new
            {
                Id = x.Id, 
                Name = x.LastName + " " + ( x.MiddleName == null?"":(x.MiddleName + " ")) + x.FirstName
            }).ToList();
        }

        public void Add(Parent newParent)
        {
            context.Add(newParent);
            context.SaveChanges();
        }

        public void Delete(Parent deletedParent)
        {
            context.Remove(deletedParent);
            context.SaveChanges();
        }

        public Parent Get(object id, bool related = false)
        {

            if (id.GetType() == typeof(long))
            {
                return context.Parent.Find(id);
    
            }
            return null;
        }

         public void Update(Parent modifiedParent)
        {
            DetectChangedProperty(modifiedParent);

            context.SaveChanges();
        }

        public void BulkAdd (List<Parent> newParents)
        {
            context.AddRange(newParents);
            context.SaveChanges();
        }

        public void BulkUpdate (List<Parent> modifiedParents)
        {
            context.UpdateRange(modifiedParents);

            context.SaveChanges();
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }

        private void DetectChangedProperty(Parent modifiedParent)
        {
            Parent originalParent = context.Parent.Find(modifiedParent.Id);

            originalParent.Title = modifiedParent.Title;
            originalParent.FirstName = modifiedParent.FirstName;
            originalParent.MiddleName = modifiedParent.MiddleName;
            originalParent.LastName = modifiedParent.LastName;
            originalParent.Address = modifiedParent.Address;
            originalParent.Phone1 = modifiedParent.Phone1;
            originalParent.Phone2 = modifiedParent.Phone2;
            originalParent.Email = modifiedParent.Email;
            originalParent.Occupation = modifiedParent.Occupation;
            originalParent.MaritalStatus = modifiedParent.MaritalStatus;
        }
    }
}