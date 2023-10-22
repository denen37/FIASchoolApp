using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using ServerApp.Models.Students;
using System.Collections.Generic;

namespace ServerApp.Models.Repository
{
    public class SessionRepository
    {
        private DataContext context;
        public SessionRepository(DataContext ctx)
        {
            context = ctx;
        }

        public virtual IQueryable<Session> GetAll(bool related, bool metadata = false)
        {
            IQueryable<Session> sessions = context.Session;
            if (related)
            {
                sessions = sessions.Include(s => s.SessionTerms).ThenInclude(t => t.Term);
                foreach (var session in sessions)
                {
                    foreach (var sessionTerm in session.SessionTerms)
                    {
                        sessionTerm.Session = null;
                    }
                }
            }

            if (!metadata)
            {
                sessions = sessions.Select(x => new Session {
                    Id = x.Id,
                    Name = x.Name,
                    SessionTerms = x.SessionTerms
                });
            }

           return sessions;
        }

        public virtual Session Get(int id, bool related)
        {
            //permit only certain types such as int, long, and short.
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