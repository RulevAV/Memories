using Memories.Server.Entities;

namespace Memories.Server.Model
{
    public class TokenModel
    {
        public User? user { get; set; }
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? Expiration { get; set; }
    }
}
