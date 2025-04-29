using System;
using System.Collections.Generic;

namespace Memories.Server.Entities;

public partial class Area
{
    public Guid Id { get; set; }

    public Guid IdUser { get; set; }

    public string? Name { get; set; }

    public string? Img { get; set; }

    public int Number { get; set; }

    public virtual ICollection<AccessArea> AccessAreas { get; set; } = new List<AccessArea>();

    public virtual ICollection<Card> Cards { get; set; } = new List<Card>();
}
