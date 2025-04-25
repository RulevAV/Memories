using System;
using System.Collections.Generic;

namespace Memories.Server.Model;

public partial class Role
{
    public int Code { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<User> IdUsers { get; set; } = new List<User>();
}
