using Memories.Server.Entities;
using Memories.Server.Interface;
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

        public CardController(ILogger<UserController> logger, ICardR cardR)
        {
            _logger = logger;
            _cardR = cardR;
        }

        [HttpGet("[action]")]
        [Authorize]
        public int InfoUser()
        {
            var userId = User.Claims.First(u => u.Type == "Id").Value;
            return 1;
            //return _userR.GetUser(Guid.Parse(userId));
        }
    }
}
