using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerApp.Models.Students
{
    public class Student
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string AdmissionNumber { get; set; }
        [StringLength(200)]
        public string Address { get; set; }
        public short? LeadershipPositionId { get; set; }
        public LeadershipPosition Post { get; set; }
        public string Sex { get; set; }
        public string Religion { get; set; }
        public string Nationality { get; set; }
        public string StateOfOrigin { get; set; }
        public string EthnicGroup { get; set; }
        public string LGA { get; set; }
        public string Skill { get; set; }
        public DateTime AdmissionDate { get; set; }
        public bool HasGraduated { get; set; }
        public string PictureFilePath { get; set; }

        //Computed Column
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public int Age { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public string CurrentClass { get; set; }     

        public IEnumerable<StudentClassArmJunction> StudentClassArm { get; set; }
        public IEnumerable<ParentStudentJunction> ParentStudentJunction { get; set; }
        public IEnumerable<AcademicReport> AcademicReport { get; set; }
        public IEnumerable<OverallPerformance> OverallPerformance { get; set; }
        public IEnumerable<MoralBehaviour> MoralBehaviour { get; set; }
        public IEnumerable<PaymentRecord> PaymentRecords { get; set; }
    }

    public class Disability
    {
        public long StudentId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}