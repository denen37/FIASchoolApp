namespace ServerApp.Models.Students
{
    public class Sport
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public string Description {get; set;}
    }

    public class StudentSportJunction
    {
        public long Id { get; set; }
        public long StudentId { get; set; }
        public short SportId { get; set; }
    }
}