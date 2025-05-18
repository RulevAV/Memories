using System;
using System.Collections.Generic;

namespace Memories.Server.Entities;

public partial class AccessArea
{
    public Guid IdOwner { get; set; }

    public Guid IdGuest { get; set; }

    public Guid IdArea { get; set; }

    public bool? IsEditing { get; set; }

    public virtual Area IdAreaNavigation { get; set; } = null!;

    public virtual User IdGuestNavigation { get; set; } = null!;

    public virtual User IdOwnerNavigation { get; set; } = null!;
}
