namespace ServerApp.Models.Students
{
    public class Club
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public string Description {get; set;}
    }

    public class StudentClubJunction
    {
        public long Id { get; set; }
        public long StudentId { get; set; }
        public short ClubId { get; set; }
        public string Post { get; set; }
    }
}