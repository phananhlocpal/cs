using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Application.Abstractions;
using CS.Application.DTOs.RequestDTO;
using CS.Domain.Entities;
using CS.Domain.Enumerations;
using MediatR;

namespace CS.Application.Commands.RequestCommands
{
    public class CreateRequestCommand : ICommand<RequestReadDTO>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public RequestIssueTypeEnum IssueType { get; set; }
        public Guid PersonInChargeId { get; set; }
        public Guid CustomerId { get; set; }
    }
}
