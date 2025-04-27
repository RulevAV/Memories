using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Memories.Server.Entities;

public partial class User
{
    public Guid Id { get; set; }

    public string? Login { get; set; }

    public string? Email { get; set; }
    [JsonIgnore]
    public string? Password { get; set; }

    public string? RefreshToken { get; set; }

    public DateTime? RefreshTokenExpiryTime { get; set; }

    public virtual ICollection<AccessArea> AccessAreaIdGuestNavigations { get; set; } = new List<AccessArea>();

    public virtual ICollection<AccessArea> AccessAreaIdOwnerNavigations { get; set; } = new List<AccessArea>();

    public virtual ICollection<Role> CodeRoles { get; set; } = new List<Role>();
}
