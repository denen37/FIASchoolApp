namespace ServerApp.Models.Students
{
    public class PsychomotorSkill
    {
        public short Id { get; set; }
        public string Skill { get; set; }
        public string Description { get; set; }
    }

    public class StudentPsychomotorSkillJunction
    {
        public long Id { get; set; }
        public short SkillId { get; set; }
        public long StudentId { get; set; }
        public int SessionTermId { get; set; }
        public short RatingScale { get; set; }
    }
}