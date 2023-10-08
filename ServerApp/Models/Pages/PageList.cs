using System;
using System.Collections.Generic;
using System.Linq;
using static System.Math;

namespace ServerApp.Models.Pages
{
    public class PageList<T>: List<T>
    {
        public PageList(IQueryable<T> query, QueryOptions options = null)
        {
            CurrentPage = options.CurrentPage;
            PageSize = options.PageSize;
            
            TotalPages = (int)Math.Ceiling((double)query.Count() / PageSize);
            AddRange(query.Skip((CurrentPage - 1) * PageSize).Take(PageSize));
        }

        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }

        public bool HasPreviousPage => CurrentPage > 1;
        public bool HasNextPage => CurrentPage < TotalPages;
    }

    public class QueryOptions
    {
        public int CurrentPage { get; set; } = 1;
        public int PageSize { get; set; } = 4;
    }

    public class PageResult<T>
    {
        public IEnumerable<T> PageList { get; set; }
        public int TotalPages { get; set; }
    }
}