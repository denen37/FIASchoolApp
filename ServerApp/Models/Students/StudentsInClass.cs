using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerApp.Models.Students
{
    public class StudentsInClass
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string AdmissionNumber { get; set; }
        public string Sex { get; set; }

        [Column("Class")]
        public string _class { get; set; }
        public string CurrentClass { get; set; }
        public string Arm { get; set; }
        public string Session { get; set; }
        public string Term { get; set; }
        public int Number { get; set; }
    }

    public class StudentNames
    {
        public long Id { get; set; }
        public string FullName { get; set; }
    }

    public class MinifiedStudentInClass
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string AdmissionNumber { get; set; }
        public string Sex { get; set; }
        public string CurrentClass { get; set; }
    }
}