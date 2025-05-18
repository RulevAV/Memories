using System;
using System.Collections.Generic;

namespace Memories.Server.Entities;

public partial class CardIgnore
{
    public Guid IdLesson { get; set; }

    public Guid IdCard { get; set; }
}
