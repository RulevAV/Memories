using System;
using System.Collections.Generic;

namespace Memories.Server.ModelBD;

public partial class Card
{
    public Guid Id { get; set; }

    public Guid IdArea { get; set; }

    public string? Title { get; set; }

    public string? Content { get; set; }

    public string? Img { get; set; }

    public virtual Area IdAreaNavigation { get; set; } = null!;
}
