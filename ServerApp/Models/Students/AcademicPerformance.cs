using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerApp.Models.Students
{
    public class SubjectPerformance
    {
        public long Id { get; set; }
        public short SubjectId { get; set; }
        public Subject Subject { get; set; }
        public long AcademicReportId { get; set; }
        public AcademicReport AcademicReport { get; set; }
        public double? Test1 { get; set; }
        public double? Test2 { get; set; }
        public double? Test3 { get; set; }
        public int? TestScoreLimit { get; set; }
        public double? Exam { get; set; }
        //Computed Column
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public double Total { get; set; }
    }

    public class OverallPerformance
    {
        [Key]
        public long AcademicReportId { get; set; }
        public string FullName { get; set; }
        public long StudentId { get; set; }
        [Column("Class")]
        public string _class { get; set; }
        public string Arm { get; set; }
        public string Session { get; set; }
        public string Term { get; set; }
        public double Total { get; set; }
        public short NumOfSubjects { get; set; }
        public int TotalObtainable  => NumOfSubjects * 100;
        
        public double Average { get; set; }
        public short Position { get; set; }
        public char Grade { get; set; }
        public string Remark { get; set; }
        //public Student Student { get; set; }
    }

    public class ComputedResult
    {
        public long StudentId { get; set; }
       // public string FullName { get; set; }
        [Column("Class")]
        public string _class { get; set; }
        public string Arm { get; set; }
        public string Session { get; set; }
        public string Term { get; set; }
        public string Subject { get; set; }
        public string SubjectCategory { get; set; }
        public double Test1 { get; set; } 
        public double Test2 { get; set; }
        public double Test3 { get; set; }
        public int TestScoreLimit { get; set; }
        public double Exam { get; set; }
        public double Total { get; set; }
        public double ClassAverage { get; set; }
        public double HighestScore { get; set; }
        public double LowestScore { get; set; }
        public long Position { get; set; }
        public char Grade { get; set; }
        public string Remark { get; set; }
    }

    public class SubjectScore
    {
        public string FullName { get; set; }
        public long StudentId { get; set; }
        public string Subject { get; set; }
        public double Test1 { get; set; }
        public double Test2 { get; set; }
        public double Test3 { get; set; }
        public double Exam { get; set; }
        public double Total { get; set; }
        public double ClassAverage { get; set; }
        public double HighestScore { get; set; }
        public double LowestScore { get; set; }
        public int Position { get; set; }
        public string Grade { get; set; }
        public string Remark { get; set; }
    }
}
    