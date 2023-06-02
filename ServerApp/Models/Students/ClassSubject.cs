namespace ServerApp.Models.Students
{
    public class Subject
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public short CourseCategoryId { get; set; }
        public CourseCategory CourseCategory {get; set;}
    }

    public class CourseCategory
    {
        public short Id { get; set; }
        public string Category { get; set; }
         public string Description { get; set; }
    }

    public class ClassArmSubjectJunction
    {
        public long Id { get; set; }
        public int ClassArmId { get; set; }
        public short SubjectId { get; set; }
    }
}