using CS.Application.DTOs.CustomerDTO;
using CS.Application.DTOs.UserDTO;
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
        public RequestIssueTypeEnum IssueType { get; set; }
        public RequestStatusEnum Status { get; set; }
        public Guid PersonInChargeId { get; set; }
        public Guid CustomerId { get; set; }
    }
}
