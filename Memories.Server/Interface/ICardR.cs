using Memories.Server.Entities;
using Memories.Server.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Memories.Server.Interface
{
    public interface ICardR
    {
        public Task<Card> Create(Guid IdUser, Card area);
        public Task<PaginatorEntity<Card>> Cards(Guid IdUser, int page, int pageSize, Guid areaId, string? search, Guid? IdParent);
        public Task<Card> Update(Guid UserId, Card card);
    }
}
