using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Memories.Server.Entities;

public partial class conMemories : DbContext
{
    public conMemories()
    {
    }

    public conMemories(DbContextOptions<conMemories> options)
        : base(options)
    {
    }

    public virtual DbSet<AccessArea> AccessAreas { get; set; }

    public virtual DbSet<Area> Areas { get; set; }

    public virtual DbSet<Card> Cards { get; set; }

    public virtual DbSet<CardIgnore> CardIgnores { get; set; }

    public virtual DbSet<Lesson> Lessons { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Port=9991;Database=Memories;Username=Memories;Password=Memories;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AccessArea>(entity =>
        {
            entity.HasKey(e => new { e.IdOwner, e.IdGuest, e.IdArea }).HasName("PK_ACECESS_AREA");

            entity.ToTable("accessArea");

            entity.Property(e => e.IsEditing).HasColumnName("isEditing");

            entity.HasOne(d => d.IdAreaNavigation).WithMany(p => p.AccessAreas)
                .HasForeignKey(d => d.IdArea)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("accessArea_fk");

            entity.HasOne(d => d.IdGuestNavigation).WithMany(p => p.AccessAreaIdGuestNavigations)
                .HasForeignKey(d => d.IdGuest)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("accessArea_fk1");

            entity.HasOne(d => d.IdOwnerNavigation).WithMany(p => p.AccessAreaIdOwnerNavigations)
                .HasForeignKey(d => d.IdOwner)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("accessArea_fk2");
        });

        modelBuilder.Entity<Area>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("area_pkey");

            entity.ToTable("area");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.MimeType).HasMaxLength(20);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Number).ValueGeneratedOnAdd();
        });

        modelBuilder.Entity<Card>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("post_pkey");

            entity.ToTable("card");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.MimeType).HasMaxLength(20);
            entity.Property(e => e.Number).ValueGeneratedOnAdd();
            entity.Property(e => e.Title).HasMaxLength(1000);

            entity.HasOne(d => d.IdAreaNavigation).WithMany(p => p.Cards)
                .HasForeignKey(d => d.IdArea)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("post_fk");

            entity.HasMany(d => d.IdUsers).WithMany(p => p.IdCards)
                .UsingEntity<Dictionary<string, object>>(
                    "UserCardIgnore",
                    r => r.HasOne<User>().WithMany()
                        .HasForeignKey("IdUser")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("usercardignore_users_fk"),
                    l => l.HasOne<Card>().WithMany()
                        .HasForeignKey("IdCard")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("usercardignore_card_fk"),
                    j =>
                    {
                        j.HasKey("IdCard", "IdUser").HasName("cardignore_pk_1");
                        j.ToTable("userCardIgnore");
                        j.IndexerProperty<Guid>("IdCard").HasColumnName("idCard");
                        j.IndexerProperty<Guid>("IdUser").HasColumnName("idUser");
                    });
        });

        modelBuilder.Entity<CardIgnore>(entity =>
        {
            entity.HasKey(e => new { e.IdCard, e.IdLesson }).HasName("cardignore_pk");

            entity.ToTable("cardIgnore");

            entity.Property(e => e.IdCard).HasColumnName("idCard");
            entity.Property(e => e.IdLesson).HasColumnName("idLesson");
        });

        modelBuilder.Entity<Lesson>(entity =>
        {
            entity.HasKey(e => new { e.Id, e.Idcardstart, e.Iduser }).HasName("lesson_pk");

            entity.ToTable("lesson");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Idcardstart).HasColumnName("idcardstart");
            entity.Property(e => e.Iduser).HasColumnName("iduser");
            entity.Property(e => e.Isglobal).HasColumnName("isglobal");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Code).HasName("Roles_pkey");

            entity.ToTable("roles");

            entity.Property(e => e.Code).ValueGeneratedNever();
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("users_pkey");

            entity.ToTable("users");

            entity.HasIndex(e => e.Login, "users_unique").IsUnique();

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
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
