using System.IdentityModel.Tokens.Jwt;

namespace CS.Presentation.Middlewares
{
    public class AuthorizeMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthorizeMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (string.IsNullOrEmpty(token))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Authorization token is missing.");
                return;
            }

            try
            {
                var handler = new JwtSecurityTokenHandler();
                var jwtToken = handler.ReadJwtToken(token);

                // Get information from claims
                var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "sub")?.Value; 
                var userRole = jwtToken.Claims.FirstOrDefault(c => c.Type == "role")?.Value; 

                if (userId == null || userRole == null)
                {
                    context.Response.StatusCode = StatusCodes.Status403Forbidden;
                    await context.Response.WriteAsync("Authorization token is invalid.");
                    return;
                }

                // Add user information into HttpContext
                context.Items["UserId"] = userId;
                context.Items["UserRole"] = userRole;

                await _next(context);
            }
            catch
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Invalid authorization token.");
            }
        }
    }
}
