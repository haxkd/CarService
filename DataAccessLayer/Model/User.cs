using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Model;

[Table("User")]
public partial class User
{
    [Key]
    public int UserId { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? UserName { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? UserEmail { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? UserPassword { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? UserStatus { get; set; }

    public int? IsAdmin { get; set; }

    [InverseProperty("RentUserNavigation")]
    public virtual ICollection<Rental> Rentals { get; set; } = new List<Rental>();
}
