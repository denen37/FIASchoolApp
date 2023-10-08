using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using ServerApp.Models.Students;
using System.Collections.Generic;

namespace ServerApp.Models.Repository
{
    public class SessionRepository : ISimpleRepository<Session> 
    {
        private DataContext context;
        public SessionRepository(DataContext ctx)
        {
            context = ctx;
        }

        public virtual IQueryable<Session> GetAll(bool related)
        {
            if (related)
            {
                var sessions = context.Session.Include(s => s.SessionTerms).ThenInclude(t => t.Term);
                foreach (var session in sessions)
                {
                    foreach (var sessionTerm in session.SessionTerms)
                    {
                        sessionTerm.Session = null;
                    }
                }

                return sessions;
            }
           return context.Session;
        }

        public virtual Session Get(object id, bool related)
        {
            //permit only certain types such as int, long, and short.
           if (id.GetType() == typeof(int))
           {
                if (related)
                {
                    var session = context.Session
                                    .Include(s => s.SessionTerms).ThenInclude(t => t.Term)
                                    .First(s => s.Id == (int)id);
                    foreach (var sessionTerm in session.SessionTerms)
                    {
                        sessionTerm.Session = null;
                    }
                }
                return context.Session.Find(id);
           }
            
            return null;
        }

        public virtual void Add(Session newData)
        {
            context.Add(newData);
            context.SaveChanges();
        }
        
        public virtual void Update(Session modifiedData)
        {
            context.Update(modifiedData);
            context.SaveChanges();
        }

        public virtual void Delete(Session deletedData)
        {
            context.Remove(deletedData);
            context.SaveChanges();
        }
    }
}