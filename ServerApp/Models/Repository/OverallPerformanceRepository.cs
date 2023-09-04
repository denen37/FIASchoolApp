using System;
using System.Linq;
using ServerApp.Models.Students;
using System.Collections.Generic;
using ServerApp.Controllers.Filters;
using Microsoft.EntityFrameworkCore;

namespace ServerApp.Models.Repository
{
    public class OverallPerformanceRepository
    {
        private DataContext context;
        public OverallPerformanceRepository(DataContext contxt)
        {
            context = contxt;
        }
        public IQueryable<OverallPerformance> GetAll (bool related = false)
        {
            throw new NotImplementedException();
        }

        public OverallPerformance Get (object id, bool related = false)
        {
            throw new NotImplementedException();
        }

        public Object GetMasterScoreSheet(QueryParams query)
        {
            int count = context.OverallPerformance
                        .Where(x => x._class == query.Classroom
                                && x.Arm == query.Arm
                                && x.Session == query.Session
                                && x.Term == query.Term)
                        .Count();


            var performances = context.OverallPerformance.FromSqlRaw
                                ("SELECT * FROM Student.udf_GetMasterScoreSheet" +
                                $"('{query.Classroom}', '{query.Arm}', '{query.Session}', '{query.Term}')")
                                .Select(x => x)
                                .ToList();

            return new {
                Commited = count > 0,
                OverallPerformances = performances
            };
            
        }

        public void Add (OverallPerformance newData)
        {
            throw new NotImplementedException();
        }

        public void Update (OverallPerformance modifiedData)
        {
            throw new NotImplementedException();
        }

        public void Delete (OverallPerformance deletedData)
        {
            throw new NotImplementedException();
        }

        public void AddMasterScoreSheet(List<OverallPerformance> newData)
        {
            context.AddRange(newData);
            context.SaveChanges();
        }

        public void BulkUpdate (List<OverallPerformance> modifiedData)
        {
            throw new NotImplementedException();
        }

        public void SaveChanges()
        {
            throw new NotImplementedException();
        }
    }
}