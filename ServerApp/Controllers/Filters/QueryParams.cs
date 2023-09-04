namespace ServerApp.Controllers.Filters
{
    public class QueryParams
    {
        public string Name { get; set; }
        public long StudentId { get; set; }
        public string Classroom { get; set; }
        public string Arm { get; set; }
        public string Session { get; set; }
        public string Term { get; set; }
        //To be deleted
        public string Subject { get; set; }
    }
}