using System.Collections.Generic;

namespace ServerApp.Models.Students
{
    public class Class
    {
        public short Id { get; set; }
        public string Name { get; set; }

        public IEnumerable<ClassArmJunction> ClassArm { get; set; }
    }

    public class Arm
    {
        public short Id { get; set; }
        public string Name { get; set; }

        public IEnumerable<ClassArmJunction> ClassArm { get; set; }
    }

    public class ClassArmJunction
    {
        public int Id { get; set; }

        public short ClassId { get; set; }
        public Class Class { get; set; }

        public short ArmId { get; set; }
        public Arm Arm { get; set; }

        public short CourseCategoryId { get; set; }
        public CourseCategory CourseCategory { get; set; }
    }

    public class StudentClassArmJunction
    {
        public long Id { get; set; }
        
        public long StudentId { get; set; }
        public int ClassArmId { get; set; }
        public int SessionId { get; set; }
    }
}