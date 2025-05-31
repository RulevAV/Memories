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
using Memories.Server.Entities.NoDb;

namespace Memories.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private IUserR _userR;

        public UserController(ILogger<UserController> logger, IUserR userR)
        {
            _logger = logger;
            _userR = userR;
        }

        [HttpGet("[action]")]
        [Authorize]
        public SUser InfoUser()
        {
            var userId = User.Claims.First(u => u.Type == "Id").Value;
            return _userR.GetUser(Guid.Parse(userId));
        }

        [HttpGet("[action]")]
        [Authorize]
        public SUser GetUser(Guid userId)
        {
            return _userR.GetUser(userId);
        }
        [HttpPost("[action]")]
        [Authorize]
        public SUser PostUser()
        {
            var userId = User.Claims.First(u => u.Type == "Id").Value;
            return _userR.GetUser(Guid.Parse(userId));
        }
        [HttpPut("[action]")]
        [Authorize]
        public SUser PutUser()
        {
            var userId = User.Claims.First(u => u.Type == "Id").Value;
            return _userR.GetUser(Guid.Parse(userId));
        }
        [HttpDelete("[action]")]
        [Authorize]
        public SUser DeleteUser()
        {
            var userId = User.Claims.First(u => u.Type == "Id").Value;
            return _userR.GetUser(Guid.Parse(userId));
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<PaginatorEntity<SUser>> Users(int page, int pageSize, string? login, string? email, int? codeRole)
        {
            return await _userR.Users(page, pageSize, login, email, codeRole);
        }

        [HttpGet("[action]")]
        [Authorize]
        public async Task<List<Role>> Roles(int page, int pageSize)
        {
            return await _userR.Roles(page, pageSize);
        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<SUser> Update(User user)
        {
            return await _userR.Update(user.GenerateSUser());
        }
    }
}
