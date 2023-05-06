using System;
using System.Collections.Generic;

namespace ServerApp.Models.Students
{
    public class Session
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartMonth { get; set; }
        public DateTime EndMonth { get; set; }
        //Navigation Propertys
        public IEnumerable<SessionTermJunction> SessionTerms { get; set; }
        
    }

    public class Term
    {
        public short Id { get; set; }
        public string Name { get; set; }

        public IEnumerable<SessionTermJunction> SessionTerms { get; set; }
    }

    public class SessionTermJunction
    {
        public int Id { get; set; }

        public int SessionId { get; set; } 
        public Session Session { get; set; }  

        public short TermId { get; set; }
        public Term Term { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}