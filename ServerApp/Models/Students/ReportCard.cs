using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
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

        public IEnumerable<SubjectPerformance> SubjectPerformances { get; set; }
    }

    public class SubjectPerformance
    {
        public long Id { get; set; }
        public short SubjectId { get; set; }
        public Subject Subject { get; set; }

        public long AcademicReportId { get; set; }
        public AcademicReport AcademicReport { get; set; }

        public float Test1 { get; set; }
        public float Test2 { get; set; }
        public float Test3 { get; set; }
        public int TestScoreLimit { get; set; }
        public float Exam { get; set; }
        //Computed Column
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public float Total { get; set; }
    }

    public class OverallPerformance
    {
        public long Id { get; set; }

        public long AcademicReportId { get; set; }
        public AcademicReport AcademicReport { get; set; }

        public float Total { get; set; }
        public short NumOfSubjects { get; set; }
        public float Average { get; set; }
        public int Position { get; set; }
        public char Grade { get; set; }
        public string Remark { get; set; }
    }
}