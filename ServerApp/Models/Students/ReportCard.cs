using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerApp.Models.Students
{
    public class AcademicReport
    {
        public long Id { get; set; }

        public long StudentId { get; set; }

        public Student Student { get; set; }    

        public int ClassArmId { get; set; }
        public ClassArmJunction ClassArm { get; set; }

        public int SessionTermId { get; set; }
        
        public SessionTermJunction SessionTerm { get; set; } 

        //public OverallPerformance OverallPerformance { get; set; }

        //public ICollection<SubjectPerformance> SubjectPerformances { get; set; }

        public SubjectPerformance SubjectPerformance { get; set; }
    }

   

    
    public class BasicStudentInfo
    {
        public string FullName { get; set; }
        public string Sex { get; set; }
        public int Age { get; set; }
        public string AdmissionNumber { get; set; }
    }

    public class ReportCard
    {
        public BasicStudentInfo Student { get; set; }
        public IEnumerable<ComputedResult> Results { get; set; }
        public OverallPerformance Performance { get; set; } 

        public IEnumerable<StudentSkillJunction> Skills {get; set; }
    }
    
    public class AcademicRecord
    {
        public long StudentId { get; set; }
        public string FullName { get; set; }
        public long AcademicReportId { get; set; }
        [Column("Class")]
        public string _class { get; set; }
        public string Arm { get; set; }
        public string Session { get; set; }
        public string Term { get; set; }
        //public IEnumerable<SubjectPerformance> SubjectPerformance { get; set; }
    }
}