using System.Collections.Generic;
namespace ServerApp.Models.Students
{
    public class LeadershipPosition
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        //Navigation property
        public IEnumerable<Student> Students { get; set; }
    }
}