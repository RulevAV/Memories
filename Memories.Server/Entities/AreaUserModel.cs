using System;
using System.Collections.Generic;

namespace Memories.Server.Entities;

public partial class AreaUserModel
{
    public Area area {  get; set; }
    public List<User> guests { get; set; }
}
