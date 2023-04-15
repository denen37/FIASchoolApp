using Microsoft.AspNetCore.Mvc.Filters;

namespace ServerApp.Controllers.Filters
{
    public class AllowCrossSiteJsonAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //Allow Cross Origin Site eg http://localhost:4200
            var ctx = filterContext.HttpContext;
            var origin = ctx.Request.Headers["Origin"];
            var allowOrigin = !string.IsNullOrWhiteSpace(origin) ? origin.ToString() : "*";
            
            ctx.Response.Headers.Add("Access-Control-Allow-Origin", allowOrigin);
            ctx.Response.Headers.Add("Access-Control-Allow-Headers", "*");
            ctx.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
            base.OnActionExecuting(filterContext);
        }
    }
}