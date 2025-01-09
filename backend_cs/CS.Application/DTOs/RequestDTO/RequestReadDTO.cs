using CS.Domain.Entities;
using CS.Domain.Enumerations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.DTOs.RequestDTO
{
    public class RequestReadDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public RequestStatusEnum Status { get; set; }
        public User PersonInCharge { get; set; }
        public Customer Customer { get; set; }
    }
}
