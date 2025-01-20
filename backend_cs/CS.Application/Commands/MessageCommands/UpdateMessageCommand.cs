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
    public class UpdateMessageCommand : IRequest<MessageReadDTO>
    {
        public Guid Id { get; set; }
        public string MessageText { get; set; }
    }
}
