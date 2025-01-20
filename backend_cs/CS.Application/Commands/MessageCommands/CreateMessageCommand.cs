using CS.Application.DTOs.MessageDTO;
using CS.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Commands.MessageCommands
{
    public class CreateMessageCommand : IRequest<MessageReadDTO>
    {
        public Guid ConversationId { get; set; }
        public Guid? Sender { get; set; }
        public string MessageText { get; set; }
    }
}
