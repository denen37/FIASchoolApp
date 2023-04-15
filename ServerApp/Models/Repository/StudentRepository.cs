using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using ServerApp.Models.Students;
using System.Collections.Generic;
using Z.EntityFramework.Plus;

namespace ServerApp.Models.Repository
{
    public class StudentRepository
    {
        private DataContext context;

        public StudentRepository(DataContext ctx)
        {
            context = ctx;
        }
        /*public IQueryable<Student> GetAll (bool related = false)
        {
            //Include leadership position;
            if (related)
            {
                var students = context.Student.Include(s => s.Post);
                foreach (var student in students)
                {
                    student.Post.Students = null;
                }
                return students;
            }
            return context.Student;
        }*/

        public IEnumerable<StudentsInClass> GetStudentsInClass(string name, string classroom, string arm, string session)
        {
            IQueryable<StudentsInClass> students = context.StudentsInClass;

            if (name != null)
            {
                name = "%" + name +  "%";
                students = students.Where(s => EF.Functions.Like(s.FirstName + s.MiddleName + s.LastName, name));
            }

            if (classroom != null)
            {
                students = students.Where(s => s._class == classroom);
            }
            if (arm != null)
            {
                students = students.Where(s => s.Arm == arm);
            }
            if (session != null)
            {
                students = students.Where(s => s.Session == session);
            }

            return students;
        }


        public void Add(Student newStudent)
        {
            context.Add(newStudent);
            context.SaveChanges();
        }

        public void BulkAdd (List<Student> newStudents)
        {
            context.Student.AddRange(newStudents);
            context.SaveChanges();
        }

        public void Delete(Student deletedStd)
        {
            context.Remove(deletedStd);
            context.SaveChanges();
        }

        public Student Get(object id, bool related = false)
        {
            if (id.GetType() == typeof(long))
            {
                if (related)
                {
                    /*Student student = context.Student.Find(id);
                    context.Entry(student).Reference(s => s.Post)
                    .Query()
                    .Load();

                    student.Post.Students = null;*/
                    Student student = context.Student.Include(s => s.Post).First(s => s.Id == (long)id);
                    student.Post.Students = null;
                    return student;
                }
                return context.Student.Find(id);
            }


            return null;
        }

        public void Update(Student modifiedStudent)
        {
            DetectChangedProperty(modifiedStudent);

            context.SaveChanges();
        }

        public void BulkUpdate (List<Student> modifiedStudents)
        {
            context.UpdateRange(modifiedStudents);

            context.SaveChanges();
        }

        private void DetectChangedProperty(Student modifiedStudent)
        {
             Student originalStudent = context.Student.Find(modifiedStudent.Id);
            originalStudent.FirstName = modifiedStudent.FirstName;
            originalStudent.MiddleName = modifiedStudent.MiddleName;
            originalStudent.LastName = modifiedStudent.LastName;
            originalStudent.DateOfBirth = modifiedStudent.DateOfBirth;
            originalStudent.LeadershipPositionId = modifiedStudent.LeadershipPositionId;
            originalStudent.Sex = modifiedStudent.Sex;
            originalStudent.Religion = modifiedStudent.Religion;
            originalStudent.Nationality = modifiedStudent.Nationality;
            originalStudent.StateOfOrigin = modifiedStudent.StateOfOrigin;
            originalStudent.LGA = modifiedStudent.LGA;
            originalStudent.EthnicGroup = modifiedStudent.EthnicGroup;
            originalStudent.Skill = modifiedStudent.Skill;
            originalStudent.AdmissionDate = modifiedStudent.AdmissionDate;
            originalStudent.AdmissionNumber = modifiedStudent.AdmissionNumber;
            originalStudent.HasGraduated = modifiedStudent.HasGraduated;
            originalStudent.PictureFilePath = modifiedStudent.PictureFilePath;
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
}