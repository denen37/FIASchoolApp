namespace ServerApp.Models.Students
{
    public class ParentStudentJunction
    {
        public long Id { get; set; }
        public long StudentId { get; set; }

        public long ParentId { get; set; }
        public Parent Parent { get; set; }
        
        public string Relationship { get; set; }
        public bool IsLivingTogether { get; set; }
    }
}