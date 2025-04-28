using System;
using System.Collections.Generic;

namespace Memories.Server.Entities.NoDb;

public partial class AreaUserModel
{
    public Area area {  get; set; }
    public List<Guid> guests { get; set; }
}
