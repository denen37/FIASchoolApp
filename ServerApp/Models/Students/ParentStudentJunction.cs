namespace ServerApp.Models.Students
{
    public class ParentStudentJunction
    {
        public long Id { get; set; }
        public long StudentId { get; set; }
        public long ParentId { get; set; }
        public bool IsBiological { get; set; }
        public bool IsLivingTogether { get; set; }
    }
}