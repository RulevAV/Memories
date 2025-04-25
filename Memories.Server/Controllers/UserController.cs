using Memories.Server.Entities;
using Memories.Server.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System;
using System.Security.Principal;

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
    }
}
