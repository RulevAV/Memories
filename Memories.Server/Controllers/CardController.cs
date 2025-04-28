using Memories.Server.Entities;
using Memories.Server.Entities.NoDb;
using Memories.Server.Interface;
using Memories.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Memories.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CardController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private ICardR _cardR;
        private IUserR _userR;

        public CardController(ILogger<UserController> logger, ICardR cardR, IUserR userR)
        {
            _logger = logger;
            _cardR = cardR;
            _userR = userR;
        }

        [HttpGet("[action]")]
        [Authorize]
        public User InfoUser()
        {
            var userId = User.Claims.First(u => u.Type == "Id").Value;
            return _userR.GetUser(Guid.Parse(userId));
        }


        [HttpPost("[action]")]
        [Authorize]
        public async Task<int> Create(Card item)
        {
            //var userId = User.Claims.First(u => u.Type == "Id").Value;
            return 1;
            //return await _cardR.Create(Guid.Parse(userId), card);
        }
    }
}
