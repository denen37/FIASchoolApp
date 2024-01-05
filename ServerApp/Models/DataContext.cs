using Microsoft.EntityFrameworkCore;
using ServerApp.Models.Students;

namespace ServerApp.Models
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
        }

        public DbSet<Student> Student { get; set; }
        public DbSet<Parent> Parent { get; set; }
        public DbSet<LeadershipPosition> LeadershipPosition { get; set; }
        public DbSet<Session> Session { get; set; }
        public DbSet<SessionTermJunction> SessionTermJunction { get; set; }
        public DbSet<Term> Term { get; set; }
        public DbSet<Class> Class { get; set; }
        public DbSet<Arm> Arm { get; set; }
        public DbSet<Club> Club { get; set; }
        public DbSet<Sport> Sport { get; set; }
        public DbSet<Rating> Rating { get; set; }
        public DbSet<Skill> Skill { get; set; }
        public DbSet<Subject> Subject { get; set; }
        public DbSet<AcademicReport> AcademicReport { get; set; }
        public DbSet<SubjectPerformance> SubjectPerformance { get; set; }
        public DbSet<StudentClassArmJunction> StudentClassArmJunction { get; set; }
        public DbSet<StudentsInClass> StudentsInClass { get; set; }
        public DbSet<ParentStudentJunction> ParentStudentJunction { get; set; }
        public DbSet<OverallPerformance> OverallPerformance { get; set; }
        public DbSet<MoralBehaviour> MoralBehaviour { get; set; }
        public DbSet<PaymentRecord> PaymentRecord { get; set; }
        public DbSet<ComputedResult> ComputedResults { get; set; }
        public DbSet<StudentSkillJunction> StudentSkillJunction { get; set; }
        public DbSet<SubjectScore> SubjectScores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            modelBuilder.HasDefaultSchema("Student");

            modelBuilder.Entity<ComputedResult>().HasNoKey();

            modelBuilder.Entity<SubjectScore>().HasNoKey();

            //modelBuilder.Entity<AcademicRecord>().HasNoKey();

            modelBuilder.Entity<Student>().Property(e => e.AdmissionNumber)
            .ValueGeneratedOnAdd();

            modelBuilder.Entity<Class>().HasMany<ClassArmJunction>(c => c.ClassArms)
            .WithOne(x => x.Class).OnDelete(DeleteBehavior.Cascade);
            base.OnModelCreating(modelBuilder);
        }
    }
}