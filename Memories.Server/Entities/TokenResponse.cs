using Memories.Server.Model;

namespace Memories.Server.Entities
{
    public class TokenResponse
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public User? User { get; set; }

    }
}
