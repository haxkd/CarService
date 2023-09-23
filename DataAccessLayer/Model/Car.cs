using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Model;

[Table("Car")]
public partial class Car
{
    [Key]
    public int CarId { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string CarMaker { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string CarModel { get; set; }

    public double CarPrice { get; set; }

    public int CarQuantity { get; set; }

    [Column(TypeName = "text")]
    public string CarImage { get; set; }

    [InverseProperty("RentCarNavigation")]
    public virtual ICollection<Rental> Rentals { get; set; } = new List<Rental>();
}
