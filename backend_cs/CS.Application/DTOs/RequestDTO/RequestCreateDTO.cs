using CS.Domain.Entities;
using CS.Domain.Enumerations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.DTOs.RequestDTO
{
    public class RequestCreateDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid PersonInChargeId { get; set; }
        public Guid CustomerId { get; set; }
    }
}
