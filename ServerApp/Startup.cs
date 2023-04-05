using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;
using ServerApp.Models.Repository;
using ServerApp.Models.Students;

namespace ServerApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string connectionString = 
                    Configuration["ConnectionStrings:SchoolDBConnection"];
            services.AddDbContext<DataContext> (options =>
                    options.UseSqlServer(connectionString));

            services.AddTransient<StudentRepository>();
            services.AddTransient<IComplexRepository<Parent>, ParentRepository>();
            services.AddTransient<ISimpleRepository<LeadershipPosition>, Repository<LeadershipPosition>>();
            services.AddTransient<ISimpleRepository<Arm>, Repository<Arm>>();
            services.AddTransient<ISimpleRepository<Class>, ClassRepository>();
            services.AddTransient<ISimpleRepository<Arm>, Repository<Arm>>();
            services.AddTransient<ISimpleRepository<Subject>, Repository<Subject>>();
            services.AddTransient<ISimpleRepository<Club>, Repository<Club>>();
            services.AddTransient<ISimpleRepository<CourseCategory>, Repository<CourseCategory>>();
            services.AddTransient<ISimpleRepository<Session>, SessionRepository>();
            services.AddTransient<ISimpleRepository<Term>, Repository<Term>>();
            services.AddTransient<ISimpleRepository<Sport>, Repository<Sport>>();
            services.AddTransient<ISimpleRepository<Disability>, Repository<Disability>>();
            services.AddTransient<ISimpleRepository<PsychomotorSkill>, Repository<PsychomotorSkill>>();
            services.AddTransient<ISimpleRepository<Rating>, Repository<Rating>>();
            services.AddTransient<IAcademicReportRepository, AcademicReportRepository>();
            services.AddTransient<ISubjectPerformanceRepository, SubjectPerformanceRepository>();
            //services.AddTransient<RelatedRepository>();

            services.AddControllersWithViews().AddNewtonsoftJson()
                    .AddJsonOptions(opts => {
                                    opts.JsonSerializerOptions.IgnoreNullValues = true;});

            services.AddSwaggerGen(options => {
                options.SwaggerDoc("v1", 
                    new OpenApiInfo {Title = "FIA School", Version = "v1"});
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider service)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseSwagger();
            app.UseSwaggerUI(options => {
                options.SwaggerEndpoint("/swagger/v1/swagger.json",
                    "FIASchool API");
            });

            app.UseSpa(spa => {
                string strategy = Configuration
                        .GetValue<string>("DevTools:ConnectionStrategy");
                if (strategy == "proxy")
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
                else if (strategy == "managed")
                {
                    spa.Options.SourcePath = "../ClientApp";
                    spa.Options.StartupTimeout = new TimeSpan(0, 5, 0);
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });

            SeedData.SeedDatabase(service.GetRequiredService<DataContext>());
        }
    }
}
