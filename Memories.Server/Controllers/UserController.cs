using Memories.Server.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Memories.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private conMemories context;

        public UserController(ILogger<WeatherForecastController> logger, conMemories con)
        {
            _logger = logger;
            context = con;
        }

        [HttpGet("[action]")]
        [Authorize]
        public User GetUser()
        {
            var mass = context.Users.ToList();
            return mass.First();
        }
        [HttpPost("[action]")]
        [Authorize]
        public User PostUser()
        {
            var mass = context.Users.ToList();
            return mass.First();
        }
        [HttpPut("[action]")]
        [Authorize]
        public User PutUser()
        {
            var mass = context.Users.ToList();
            return mass.First();
        }
        [HttpDelete("[action]")]
        [Authorize]
        public User DeleteUser()
        {
            var mass = context.Users.ToList();
            return mass.First();
        }
    }
}
