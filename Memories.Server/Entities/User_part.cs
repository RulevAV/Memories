using System;
using System.Collections.Generic;
using Memories.Server.Entities.NoDb;

namespace Memories.Server.Entities;

public partial class User
{
   public SUser GenerateSUser()
   {
      return new SUser(this);
   }
}
