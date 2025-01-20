using CS.Application.DTOs.MessageDTO;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Queries.MessageQueries
{
    public class GetMessageByIdQuery : IRequest<MessageReadDTO>
    {
        public Guid Id { get; set; }

        public GetMessageByIdQuery(Guid id)
        {
            Id = id;
        }
    }
}
