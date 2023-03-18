using System;
using System.Linq;
using System.Collections.Generic;
using ServerApp.Models.Students;

namespace ServerApp.Models
{
    public static class SeedData
    {
        public static void SeedDatabase(DataContext context)
        {
            if (context.Student.Count() == 0)
            {
                List<Student> students = new List<Student>{
                    new Student{
                        FirstName = "Mimidoo", MiddleName = "Comfort", LastName = "Bem", 
                        DateOfBirth = new DateTime(2005, 09, 17), Sex = "Female", AdmissionNumber = "17-001",
                        AdmissionDate = new DateTime(2017, 09, 01), Religion = "Christian", Nationality = "Nigerian",
                        StateOfOrigin = "Benue", LGA = "Vandeikya", EthnicGroup = "Tiv", HasGraduated = false,
                    },
                    new Student{
                        FirstName = "Terhemba", MiddleName = "Joseph", LastName = "Terkimbir", 
                        DateOfBirth = new DateTime(2006, 04, 12), Sex = "Male", AdmissionNumber = "18-001",
                        AdmissionDate = new DateTime(2018, 09, 01), Religion = "Christian", Nationality = "Nigerian",
                        StateOfOrigin = "Benue", LGA = "Adikpo", EthnicGroup = "Tiv", HasGraduated = false,
                    }
                };

                context.Student.AddRange(students);
                context.SaveChanges();
            }
        }
    }
}