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
    public interface IUserR
    {
        public User GetUser(Guid userId);
        public User PostUser();
        public User PutUser();
        public User DeleteUser();
        public Task<PaginatorEntity<User>> Users(int page, int pageSize, string? login, string? email, int? codeRole);
        public Task<List<Role>> Roles(int page, int pageSize);
        public Task<User> Update(User user);
    }
}
