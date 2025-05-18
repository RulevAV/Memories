using System;
using System.Collections.Generic;

namespace Memories.Server.Entities;

public partial class Lesson
{
    public Guid Id { get; set; }

    public Guid Idcardstart { get; set; }

    public bool? Isglobal { get; set; }

    public Guid Iduser { get; set; }
}
