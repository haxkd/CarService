using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Dto
{
    public class AgreementDto
    {
        public int? CarId { get; set; }
        public int? Duration { get; set; }
        public double? TotalCost { get; set; }
        public string? status { get; set; }
    }
}
