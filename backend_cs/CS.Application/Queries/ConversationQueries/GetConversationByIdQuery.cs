using CS.Application.DTOs.ConversationDTO;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Queries.ConversationQueries
{
    public class GetConversationByIdQuery : IRequest<ConversationReadDTO>
    {
        public Guid Id { get; set; }
        public GetConversationByIdQuery(Guid id)
        {
            Id = id;
        }
    }
}
