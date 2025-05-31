using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Memories.Server.Entities;

public partial class conMemories : DbContext
{
    // public virtual DbSet<SCard> UCards { get; set; }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
    {
       
    }
}
