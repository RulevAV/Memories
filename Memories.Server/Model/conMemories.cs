using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Memories.Server.Model;

public partial class conMemories : DbContext
{
    public conMemories()
    {
    }

    public conMemories(DbContextOptions<conMemories> options)
        : base(options)
    {
    }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Port=5435;Database=Memories;Username=kpocc;Password=1;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Code).HasName("Roles_pkey");

            entity.ToTable("roles");

            entity.Property(e => e.Code)
                .ValueGeneratedNever()
                .HasColumnName("code");
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("users_pkey");

            entity.ToTable("users");

            entity.HasIndex(e => e.Login, "users_Login_key").IsUnique();

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Email).HasMaxLength(20);
            entity.Property(e => e.Login).HasMaxLength(20);
            entity.Property(e => e.Password).HasMaxLength(20);
            entity.Property(e => e.RefreshToken).HasMaxLength(100);
            entity.Property(e => e.RefreshTokenExpiryTime).HasColumnType("timestamp(0) without time zone");

            entity.HasMany(d => d.CodeRoles).WithMany(p => p.IdUsers)
                .UsingEntity<Dictionary<string, object>>(
                    "UserRole",
                    r => r.HasOne<Role>().WithMany()
                        .HasForeignKey("CodeRoles")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("userRoles_fk1"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("IdUser")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("userRoles_fk"),
                    j =>
                    {
                        j.HasKey("IdUser", "CodeRoles").HasName("PK_APPROLE");
                        j.ToTable("userRoles");
                        j.IndexerProperty<Guid>("IdUser").HasColumnName("idUser");
                        j.IndexerProperty<int>("CodeRoles").HasColumnName("codeRoles");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
