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
    public interface IAreaR
    {
        public Task<Area> CreateArea(Guid IdUser, string name, string? img);
        public Task<PaginatorEntity<Area>> Areas(Guid IdUser, int page, int pageSize, string? login, Guid? idGuest);
        public Task<Area> Update(Guid UserId, Area area, List<User> guests);
    }
}
