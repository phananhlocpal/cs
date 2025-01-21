using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Application.DTOs.EmployeeTaggedDTO;
using MediatR;

namespace CS.Application.Queries.EmployeeTaggedQueries
{
    public class GetEmployeeTaggedByConversationIdQuery : IRequest<IEnumerable<EmployeeTaggedReadDTO>>
    {
        public Guid ConversationId { get; set; }
    }
}
