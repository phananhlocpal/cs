using CS.Application.DTOs.ConversationDTO;
using CS.Domain.Enumerations;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Commands.ConversationCommands
{
    public class CreateConversationCommand : IRequest<ConversationReadDTO>
    {
        public Guid? CustomerId { get; set; }
        public ConversationStatusEnum Status { get; set; }
    }
}
