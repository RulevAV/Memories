using Memories.Server.Entities;
using Memories.Server.Interface;
using Memories.Server.Model;
using Memories.Server.Services.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Memories.Server.Services
{
    public class AuthenticateR : BaseR, IAuthenticateR
    {
        private readonly IConfiguration _configuration;

        public AuthenticateR( conMemories context, NpgsqlConnection npgsqlCon, IConfiguration configuration ) :base(context, npgsqlCon)
        {
            _configuration = configuration;
        }
        public List<Claim> authClaims(User user)
        {
            return new List<Claim>
                {
                    new Claim("Id", user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Login),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };
        }

        public async Task<TokenModel> Login(LoginModel model)
        {
            var user = await _context.Users.Include(u => u.CodeRoles).FirstOrDefaultAsync(u => u.Login == model.Login && u.Password == model.Password);
            if (user != null)
            {
                var token = CreateToken(authClaims(user));
                var refreshToken = GenerateRefreshToken();

                _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);

                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = DateTime.Now.AddDays(refreshTokenValidityInDays);

                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                return new TokenModel
                {
                    user = user,
                    AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                    RefreshToken = refreshToken,
                    Expiration = token.ValidTo
                };
            }
            throw new Exception("Не авторизован");
        }

        public async Task<User> Register( RegisterModel model)
        {
            var userExists = await _context.Users.FirstOrDefaultAsync(u => u.Login == model.Login);
            if (userExists != null)
                throw new Exception("Пользователь уже существует!");

            userExists = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (userExists != null)
                throw new Exception("Email уже занят!");

            User user = new()
            {
                Id = Guid.NewGuid(),
                Email = model.Email,
                Login = model.Login,
                Password = model.Password
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<TokenModel> RefreshToken(TokenModel tokenModel)
        {
            if (tokenModel is null)
                throw new Exception("Неверный запрос клиента");
            
            string? accessToken = tokenModel.AccessToken;
            string? refreshToken = tokenModel.RefreshToken;

            var principal = GetPrincipalFromExpiredToken(accessToken);
            if (principal == null)
                throw new Exception("Недействительный токен доступа или токен обновления");

            string username = principal.Identity.Name;

            var user = await _context.Users.Include(u => u.CodeRoles).FirstOrDefaultAsync(u => u.Login == username);

            if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                throw new Exception("Недействительный токен доступа или токен обновления");

            var newAccessToken = CreateToken(authClaims(user));
            var newRefreshToken = GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            _context.Users.Update(user);

            return new TokenModel
            {
                user = user,
                AccessToken = new JwtSecurityTokenHandler().WriteToken(newAccessToken),
                RefreshToken = refreshToken,
                Expiration = newAccessToken.ValidTo
            };
        }

        private JwtSecurityToken CreateToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            _ = int.TryParse(_configuration["JWT:TokenValidityInMinutes"], out int tokenValidityInMinutes);

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddMinutes(tokenValidityInMinutes),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"])),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;
        }
    }
}
