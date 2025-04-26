using Memories.Server.Entities;
using Memories.Server.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System;
using System.Data;
using System.Security.Principal;
using System.Xml.Linq;

namespace Memories.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private conMemories _context;

        public UserController(ILogger<WeatherForecastController> logger, conMemories context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet("[action]")]
        [Authorize]
        public User InfoUser()
        {
            var userId = User.Claims.First(u => u.Type == "Id").Value;
            User user = _context.Users.First(u => u.Id.ToString() == userId);
            return user;
        }

        [HttpGet("[action]")]
        [Authorize]
        public User GetUser()
        {
            var mass = _context.Users.ToList();
            return mass.First();
        }
        [HttpPost("[action]")]
        [Authorize]
        public User PostUser()
        {
            var mass = _context.Users.ToList();
            return mass.First();
        }
        [HttpPut("[action]")]
        [Authorize]
        public User PutUser()
        {
            var mass = _context.Users.ToList();
            return mass.First();
        }
        [HttpDelete("[action]")]
        [Authorize]
        public User DeleteUser()
        {
            var mass = _context.Users.ToList();
            return mass.First();
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<PaginatorEntity<User>> Users(int page, int pageSize, string? login, string? email, int? codeRole)
        {
            var sql = $@"
SELECT DISTINCT u.*
FROM public.""users"" u
LEFT JOIN public.""userRoles"" ur ON ur.""IdUser"" = u.""Id""
LEFT JOIN public.""roles"" r ON ur.""CodeRoles"" = r.""Code""
WHERE u.""Login"" ILIKE '%{login?.Trim()}%'
AND u.""Email"" ILIKE '%{email?.Trim()}%'
{(codeRole == null ? "" : $@" AND r.""Code"" = {codeRole}")}";

            int totalCount = await _context.Users.FromSqlRaw(sql).CountAsync();

            var sqlRole = $@"
SELECT DISTINCT u.*, ur.""CodeRoles"" 
FROM public.""users"" u
LEFT JOIN public.""userRoles"" ur ON ur.""IdUser"" = u.""Id""
LEFT JOIN public.""roles"" r ON ur.""CodeRoles"" = r.""Code""
WHERE u.""Login"" ILIKE '%{login?.Trim()}%'
AND u.""Email"" ILIKE '%{email?.Trim()}%'
{(codeRole == null ? "" : $@" AND r.""Code"" = {codeRole}")}";

            List<User> users = await _context.Users.FromSqlRaw(sqlRole)
                .Include(u => u.CodeRoles)  // В зависимости от структуры может не работать
                .OrderBy(u => u.Id)
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return new PaginatorEntity<User>()
            {
                Elements = users,
                TotalCount = totalCount
            };
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<List<Role>> Roles(int page, int pageSize)
        {
            int totalCount = await _context.Users.CountAsync();

            // Fetching paginated results
            var roles = await _context.Roles.ToListAsync();
            return roles;
        }


    }
}
