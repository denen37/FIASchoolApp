using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Linq;

namespace ServerApp.Models.Students
{
    public enum ClientEntityState
    {
        Unchanged,
        Modified,
        Deleted,
        Added
    }

    public class Class
    {
        public short Id { get; set; }
        public string Name { get; set; }

        public IEnumerable<ClassArmJunction> ClassArms { get; set; }
    }

    public class Arm
    {
        public short Id { get; set; }
        public string Name { get; set; }

        public IEnumerable<ClassArmJunction> ClassArms { get; set; }
    }

    public class ClassArmJunction: IComparable<ClassArmJunction>
    {
        public int Id { get; set; }

        public short ClassId { get; set; }
        public Class Class { get; set; }

        public short ArmId { get; set; }
        public Arm Arm { get; set; }

        public short CourseCategoryId { get; set; }
        public CourseCategory CourseCategory { get; set; }

        [NotMapped]
        public ClientEntityState EntityState { get; set; }

        public IEnumerable<StudentClassArmJunction> StudentClassArms { get; set; }

        public int CompareTo([AllowNull] ClassArmJunction other)
        {
            if(other == null) return 1;
            else
            {
                if (this.Class.Id == other.Class.Id)
                {
                    var rank = (this.Arm.Id <  other.Arm.Id) ? 1 : ((this.Arm.Id == other.Arm.Id) ? 0 : -1);
                    return rank;
                }
                else if(this.Class.Id > other.Class.Id) return 1;
                else return -1;
            }
        }
    }

    public class StudentClassArmJunction
    {
        public long Id { get; set; }
        
        public long StudentId { get; set; }
        public Student Student { get; set; }

        public int ClassArmId { get; set; }
        public ClassArmJunction ClassArm { get; set; }

        public int SessionTermId { get; set; }
        public SessionTermJunction SessionTerm { get; set; }
    }
}