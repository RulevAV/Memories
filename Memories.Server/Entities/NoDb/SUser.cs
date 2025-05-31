using System.Text.Json.Serialization;

namespace Memories.Server.Entities.NoDb;

public class SUser : User
{
    [JsonIgnore]
    public new string? Password { get; set; }
    
    public SUser(User user)
    {
        Id = user.Id;
        Login = user.Login;
        Email = user.Email;
        RefreshToken = user.RefreshToken;
        RefreshTokenExpiryTime = user.RefreshTokenExpiryTime;
        AccessAreaIdGuestNavigations = user.AccessAreaIdGuestNavigations;
        AccessAreaIdOwnerNavigations = user.AccessAreaIdOwnerNavigations;
        CodeRoles = user.CodeRoles;
    }
}