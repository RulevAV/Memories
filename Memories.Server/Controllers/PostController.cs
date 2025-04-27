using Memories.Server.Entities;
using Memories.Server.Interface;
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
    public class PostController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private IUserR _userR;

        public PostController(ILogger<UserController> logger, IUserR userR)
        {
            _logger = logger;
            _userR = userR;
        }

        [HttpGet("[action]")]
        [Authorize]
        public User InfoUser()
        {
            var userId = User.Claims.First(u => u.Type == "Id").Value;
            return _userR.GetUser(Guid.Parse(userId));
        }
    }
}
