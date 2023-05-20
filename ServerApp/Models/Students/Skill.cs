namespace ServerApp.Models.Students
{
    public class Skill
    {
        public short Id { get; set; }
        public string Name { get; set; }
        public byte SkillTypeId { get; set; }
        public SkillType SkillType { get; set; }
        public string Description { get; set; }
    }

    public class StudentSkillJunction
    {
        public long Id { get; set; }
        public short SkillId { get; set; }
        public long AcademicReportId { get; set; }
        public Skill Skill { get; set; }
        public byte RatingId { get; set; }
        public Rating Rating { get; set; }
    }

    public class SkillType
    {
        public byte Id { get; set; }
        public string Name { get; set; }
    }
}