using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace DataAccessLayer.Dto
{

    public class CarDto
    {
        [Required]
        public string CarMaker { get; set; }
        [Required]
        public string CarModel { get; set; }
        [Required]
        public double CarPrice { get; set; }
        [Required]
        public int CarQuantity { get; set; }
       
        public IFormFile? CarImage { get; set; }
       
    }
}
