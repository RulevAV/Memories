using System;
using System.Collections.Generic;

namespace Memories.Server.Model;

public partial class User
{
    public Guid Id { get; set; }

    public string? Login { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public string? RefreshToken { get; set; }

    public DateTime? RefreshTokenExpiryTime { get; set; }

    public virtual ICollection<Role> CodeRoles { get; set; } = new List<Role>();
}
