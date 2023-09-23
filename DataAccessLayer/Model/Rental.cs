using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Model;

[Table("Rental")]
public partial class Rental
{
    [Key]
    public int RentId { get; set; }

    public int RentCar { get; set; }

    public int? RentDuration { get; set; }

    public double? RentCost { get; set; }

    public int? RentUser { get; set; }
    public DateTime? RentDate { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? RentStatus { get; set; }

    [ForeignKey("RentCar")]
    [InverseProperty("Rentals")]
    //[JsonIgnore]
    public virtual Car? RentCarNavigation { get; set; }

    [ForeignKey("RentUser")]
    [InverseProperty("Rentals")]
    //[JsonIgnore] 
    public virtual User? RentUserNavigation { get; set; }
}
