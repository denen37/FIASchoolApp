using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using ServerApp.Models.Students;

namespace ServerApp.Models.Repository
{
    public class SessionRepository
    {
        private DataContext context;
        public SessionRepository(DataContext ctx)
        {
            context = ctx;
        }

        public virtual Object GetAll(bool related, bool metadata = false)
        {
            Object sessions = context.Session;
            if (metadata & !related)
            {
                sessions = (sessions as IQueryable<Session>).OrderBy(x => x.Name);
            }
            if (related && metadata)
            {
                sessions = (sessions as IQueryable<Session>).Include(x => x.SessionTerms).ThenInclude(x => x.Term)
                .Select(x => new Session{
                    Id = x.Id,
                    Name = x.Name,
                    StartMonth = x.StartMonth,
                    EndMonth = x.EndMonth,
                    SessionTerms = x.SessionTerms
                }).OrderBy(x => x.Name);
            }

            if (!metadata && related)
                {
                    sessions = (sessions as IQueryable<Session>).Select(x => new {
                        Id = x.Id,
                        Name = x.Name,
                        SessionTerms = x.SessionTerms.
                        Select(x => new {Id = x.Id, Term = x.Term})
                    }).OrderBy(x => x.Name);
                }
            
            if (!metadata && !related)
            {
                sessions = (sessions as IQueryable<Session>).Select(x => new {
                        Id = x.Id,
                        Name = x.Name,
                    }).OrderBy(x => x.Name);
            }
            return sessions;

        }

        public Object GetSessionTerms(bool metadata = false)
        {
            Object sessionTerms = context.SessionTermJunction;
            if (metadata)
            {
                sessionTerms = (sessionTerms as IQueryable<SessionTermJunction>)
                .Include(x => x.Session).Include(x => x.Term)
                .Select(x => new SessionTermJunction
                {
                    Id = x.Id,
                    SessionId = x.SessionId,
                    Session = new Session{
                                            Id = x.Session.Id,
                                            Name = x.Session.Name,
                                            StartMonth = x.Session.StartMonth,
                                            EndMonth = x.Session.EndMonth},
                    TermId = x.TermId,
                    Term = x.Term,
                    StartDate = x.StartDate,
                    EndDate = x.EndDate
                }
                ).OrderByDescending(x => x.Session.Name).ThenBy(x => x.Term.Name);
            }
            else
            {
                sessionTerms = (sessionTerms as IQueryable<SessionTermJunction>)
                .Include(x => x.Session).Include(x => x.Term)
                .Select(x => new {
                    Session = new {
                        Id = x.SessionId,
                        Name = x.Session.Name
                    },
                    Term = new {
                        Id = x.TermId,
                        Name = x.Term.Name
                    }
                }).OrderByDescending(x => x.Session.Name).ThenBy(x => x.Term.Name);
            }
            return sessionTerms;
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

        public virtual void Add(SessionTermJunction newData)
        {
            context.Add(newData);
            context.SaveChanges();
        }
        
        public virtual void Update(SessionTermJunction modifiedData)
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