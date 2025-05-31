using Memories.Server.Entities;
using Memories.Server.Entities.NoDb;
using Memories.Server.Interface;
using Memories.Server.Model;
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

        public CardController(ILogger<UserController> logger, ICardR cardR)
        {
            _logger = logger;
            _cardR = cardR;
        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<Card> Create([FromForm] CardModel item)
        {
            var userId = User.Claims.First(u => u.Type == "Id").Value;
            return await _cardR.Create(Guid.Parse(userId), item);
        }


        [HttpGet("[action]")]
        [Authorize]
        public async Task<PaginatorEntity<SCard>> Cards(int page, int pageSize, Guid areaId, string? search, Guid? IdParent)
        {
            var userId = User.Claims.First(u => u.Type == "Id").Value;
            return await _cardR.Cards(Guid.Parse(userId), page, pageSize, areaId, search, IdParent);
        }

        [HttpPost("[action]")]
        [Authorize]
        public async Task<Card> Update([FromForm] CardModel item)
        {
            var userId = User.Claims.First(u => u.Type == "Id").Value;
            return await _cardR.Update(Guid.Parse(userId), item);
        }
        
        [HttpDelete("[action]/{Id}")]
        [Authorize]
        public async Task<int> Delete([FromRoute] Guid Id)
        {
            var userId = User.Claims.First(u => u.Type == "Id").Value;
            return await _cardR.Delete(Guid.Parse(userId), Id);
        }
        
        [HttpPost("[action]/{Id}")]
        [Authorize]
        public async Task<int> SetIgnoreUserCard([FromRoute] Guid Id)
        {
            var userId = User.Claims.First(u => u.Type == "Id").Value;
            return await _cardR.SetIgnoreUserCard(Guid.Parse(userId), Id);
        }
    }
}
