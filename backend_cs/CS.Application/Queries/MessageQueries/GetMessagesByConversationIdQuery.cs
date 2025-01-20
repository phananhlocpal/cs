using CS.Application.DTOs.MessageDTO;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Queries.MessageQueries
{
    public class GetMessagesByConversationIdQuery : IRequest<IEnumerable<MessageReadDTO>>
    {
        public Guid ConversationId { get; set; }
    }
}
