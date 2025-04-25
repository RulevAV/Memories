using Memories.Server.Entities;
using Memories.Server.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System;
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
            var userId = User.Claims.First(u=> u.Type == "Id").Value;
            User user = _context.Users.First(u=> u.Id.ToString() == userId);
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
        public async Task<PaginatorEntity<User>> Users(int page, int pageSize)
        {
            int totalCount = await _context.Users.CountAsync();

            // Fetching paginated results
            List<User> products = await _context.Users.Include(u=> u.CodeRoles)
                .OrderBy(p => p.Id)  // or any other column to maintain a consistent order
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return new PaginatorEntity<User>()
            {
                Elements = products,
                TotalCount = totalCount
            };
        }
    }
}
