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
    public interface IAuthenticateR
    {
        public Task<TokenModel> Login(LoginModel model);

        public Task<User> Register(RegisterModel model);

        public Task<TokenModel> RefreshToken(TokenModel tokenModel);
    }
}
