using Memories.Server.Model;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;

namespace Memories.Server.Entities
{
    public static class TokenUtils
    {
        private static int Minutes = 1;

        public static Claim[] GenerateClame(User user)
        {
            return new[] {
                    new Claim("id", user.Id.ToString()),
                    new Claim(ClaimTypes.Name, "user@hotmail.com"),
                    new Claim(ClaimTypes.Email, "user@hotmail.com"),
                };
        }
        public static string GenerateAccessToken(User user, string secret)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(GenerateClame(user)),
                Expires = DateTime.UtcNow.AddMinutes(Minutes), // Token expiration time
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenstring = new JwtSecurityTokenHandler().WriteToken(token);

            return tokenHandler.WriteToken(token);
        }
        public static string GetIdUser(string AccessToken)
        {
            var ReadToken = new JwtSecurityTokenHandler().ReadJwtToken(AccessToken);
            return ReadToken.Claims.First(c => c.Type == "id").Value;
        }

        public static bool VerifyJwtToken(string jwtToken, string key)
        {
            var handler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            };
            try
            {
                var claimsPrincipal = handler.ValidateToken(jwtToken, validationParameters, out var securityToken);
                return true;
            }
            catch
            {
                return false;
            }
        }


        public static string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        public static string GenerateAccessTokenFromRefreshToken(string refreshToken, User user, string secret)
        {
            // Implement logic to generate a new access token from the refresh token
            // Verify the refresh token and extract necessary information (e.g., user ID)
            // Then generate a new access token

            // For demonstration purposes, return a new token with an extended expiry
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(GenerateClame(user)),
                Expires = DateTime.UtcNow.AddMinutes(Minutes), // Extend expiration time
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
