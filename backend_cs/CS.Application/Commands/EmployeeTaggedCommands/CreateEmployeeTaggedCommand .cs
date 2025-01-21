using CS.Application.DTOs.EmployeeTaggedDTO;
using CS.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Commands.EmployeeTaggedCommands
{
    public class CreateEmployeeTaggedCommand : IRequest<EmployeeTaggedReadDTO>
    {
        public Guid ConversationId { get; set; }
        public Guid? EmployeeId { get; set; }
        public Guid TaggedBy { get; set; }
    }

}
