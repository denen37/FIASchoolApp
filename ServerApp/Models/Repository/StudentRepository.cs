using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using ServerApp.Models.Students;
using System.Collections.Generic;
using ServerApp.Controllers.Filters;
using Z.EntityFramework.Plus;
using ServerApp.Models.Pages;

namespace ServerApp.Models.Repository
{
    public class StudentRepository
    {
        private DataContext context;

        public StudentRepository(DataContext ctx)
        {
            context = ctx;
        }
        
        public Object CountNumberInClass(string session, string _class = null)
        {
            return context.StudentsInClass.Where(x => x.Session == session)
                    .Select(x => new {
                        _class = x._class,
                        Arm = x.Arm,
                        Count = x.Number
                    }).Distinct();
        }
        public Object GetStudentsInClass(QueryParams query, QueryOptions options)
        {
            IQueryable<StudentsInClass> students = context.StudentsInClass;

            if (query.Name != null)
            {
                query.Name = "%" + query.Name +  "%";
                students = students.Where(s => EF.Functions.Like(s.FirstName + s.MiddleName + s.LastName, query.Name));
            }

            if (query.Classroom != null)
            {
                students = students.Where(s => s._class == query.Classroom);
            }
            if (query.Arm != null)
            {
                students = students.Where(s => s.Arm == query.Arm);
            }
            if (query.Session != null)
            {
                students = students.Where(s => s.Session == query.Session);
            }

                var list = students.Select(x => new MinifiedStudentInClass {
                Id = x.Id,
                FirstName = x.FirstName,
                MiddleName = x.MiddleName,
                LastName = x.LastName,
                DateOfBirth = x.DateOfBirth,
                AdmissionNumber = x.AdmissionNumber,
                Sex = x.Sex,
                CurrentClass = x.CurrentClass
            }).Distinct().OrderBy(x => x.LastName);
            var pageList = new PageList<MinifiedStudentInClass> (list, options);
            return new PageResult<MinifiedStudentInClass>{
                PageList = pageList,
                TotalPages = pageList.TotalPages,
            };
        }

        public IEnumerable<StudentNames> GetStudentNames(QueryParams query)
        {
            var students = context.StudentsInClass
                           .Where(x => x._class == query.Classroom
                           && x.Arm == query.Arm
                           && x.Session == query.Session
                           && x.Term == query.Term)  
                           .Select(x => new StudentNames
                           {
                            Id = x.Id,
                            FullName = x.LastName + " " + x.MiddleName + " " + x.FirstName
                           }).ToList();

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

        public Student Get(long id, bool post = false, bool parents = false,
                            bool overallPerformance = false, bool morals = false,
                            bool payments = false)
        {
              var student = context.Student.Find(id);
                if (post)
                {
                    student.Post = context.Student.Where(s => s.Id == id).Select(p => new LeadershipPosition
                    {
                        Id = p.Post.Id,
                        Name = p.Post.Name,
                        Description = p.Post.Description
                    }).FirstOrDefault();
                }

                if (parents)
                {
                    student.ParentStudentJunction = context.ParentStudentJunction.Include(p => p.Parent)
                    .Where(p => p.StudentId == id).ToArray();
                }
                
                if(overallPerformance)
                {
                    student.OverallPerformance = context.OverallPerformance
                                                .Select(ovp => ovp).Where(ovp => ovp.StudentId == id)
                                                .OrderBy(x => x._class).ThenBy(x => x.Term)
                                                .ToArray();
                }

                if (morals)
                {
                    student.MoralBehaviour = context.MoralBehaviour.Include(m => m.Rating)
                    .Where(x => x.StudentId == id).ToArray();
                }

                if (payments)
                {
                    student.PaymentRecords = context.PaymentRecord
                    .Include(p => p.Payments)
                    .Include(p => p.SessionTerm)
                    .ThenInclude(p => p.Term)
                    .Include(p => p.SessionTerm)
                    .ThenInclude(p => p.Session)
                    .Where(p => p.StudentId == id)
                    .Select(p =>new PaymentRecord
                    {  
                        Id = p.Id,
                        StudentId = p.StudentId,
                        Arrears = p.Arrears,
                        AmountPayable = p.AmountPayable,
                        Total = p.Total,
                        Session  = p.SessionTerm.Session.Name,
                        Term  = p.SessionTerm.Term.Name,
                        SessionTerm = new SessionTermJunction
                        {
                            Session = new Session{Name = p.SessionTerm.Session.Name},
                            Term = new Term {Name = p.SessionTerm.Term.Name}
                        },
                        NumOfPayments = p.Payments.Count(),
                       Payments = p.Payments
                    })
                    .OrderBy(x => x.SessionTerm.Session.Name)
                    .ThenBy(x => x.SessionTerm.Term.Name)
                    .ToList();
                }
                return student;
        }

        public void Update(Student modifiedStudent)
        {
            //DetectChangedProperty(modifiedStudent);
            context.Update(modifiedStudent);

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
            originalStudent.Skill1 = modifiedStudent.Skill1;
            originalStudent.Skill2 = modifiedStudent.Skill2;
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