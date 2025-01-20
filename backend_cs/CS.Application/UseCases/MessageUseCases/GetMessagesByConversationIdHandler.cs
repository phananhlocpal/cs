using AutoMapper;
using CS.Application.Abstractions.Repositories;
using CS.Application.DTOs.MessageDTO;
using CS.Application.Queries.MessageQueries;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.UseCases.MessageUseCases
{
    public class GetMessagesByConversationIdHandler : IRequestHandler<GetMessagesByConversationIdQuery, IEnumerable<MessageReadDTO>>
    {
        private readonly IMessageRepo _messageRepo;
        private readonly IMapper _mapper;

        public GetMessagesByConversationIdHandler(IMessageRepo messageRepo, IMapper mapper)
        {
            _messageRepo = messageRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<MessageReadDTO>> Handle(GetMessagesByConversationIdQuery request, CancellationToken cancellationToken)
        {
            var messages = await _messageRepo.GetByConversationId(request.ConversationId);
            return _mapper.Map<IEnumerable<MessageReadDTO>>(messages);
        }
    }
}
