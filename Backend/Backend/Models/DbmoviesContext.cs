﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models;

public partial class DbmoviesContext : DbContext
{
    public DbmoviesContext()
    {
    }

    public DbmoviesContext(DbContextOptions<DbmoviesContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Director> Directors { get; set; }

    public virtual DbSet<Movie> Movies { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Director>(entity =>
        {
            entity.HasKey(e => e.Pkdirector).HasName("PK__Director__B39B1F99753C59C9");

            entity.ToTable("Director");

            entity.Property(e => e.Pkdirector).HasColumnName("PKDirector");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Movie>(entity =>
        {
            entity.HasKey(e => e.Pkmovies).HasName("PK__Movies__85F74C593E27C693");

            entity.Property(e => e.Pkmovies).HasColumnName("PKMovies");
            entity.Property(e => e.Fkdirector).HasColumnName("FKDirector");
            entity.Property(e => e.Gender)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.FkdirectorNavigation).WithMany(p => p.Movies)
                .HasForeignKey(d => d.Fkdirector)
                .HasConstraintName("FK__Movies__FKDirect__398D8EEE");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
