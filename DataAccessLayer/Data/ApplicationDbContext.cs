using System;
using System.Collections.Generic;
using DataAccessLayer.Model;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Car> Cars { get; set; }

    public virtual DbSet<Rental> Rentals { get; set; }

    public virtual DbSet<User> Users { get; set; }

    //    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
    //        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-MBN74RR;Initial Catalog=CarRental;Integrated Security=True;Connect Timeout=60;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Car>(entity =>
        {
            entity.Property(e => e.CarQuantity).HasDefaultValueSql("((1))");
        });

        modelBuilder.Entity<Rental>(entity =>
        {
            entity.Property(e => e.RentStatus).HasDefaultValueSql("('pending')");

            entity.HasOne(d => d.RentCarNavigation).WithMany(p => p.Rentals)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Rental_Car");

            entity.HasOne(d => d.RentUserNavigation).WithMany(p => p.Rentals)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Rental_User");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.IsAdmin).HasDefaultValueSql("((0))");
            entity.Property(e => e.UserStatus).HasDefaultValueSql("('active')");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
