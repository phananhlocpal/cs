using AutoMapper;
using CS.Application.Abstractions.Repositories;
using CS.Application.DTOs.ConversationDTO;
using CS.Application.Queries.ConversationQueries;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.UseCases.ConversationUseCases
{
    public class GetAllConversationsHandler : IRequestHandler<GetAllConversationsQuery, List<ConversationReadDTO>>
    {
        private readonly IConversationRepo _conversationRepo;
        private readonly IMapper _mapper;

        public GetAllConversationsHandler(IConversationRepo conversationRepo, IMapper mapper)
        {
            _conversationRepo = conversationRepo;
            _mapper = mapper;
        }

        public async Task<List<ConversationReadDTO>> Handle(GetAllConversationsQuery request, CancellationToken cancellationToken)
        {
            var conversations = await _conversationRepo.GetAll();
            return _mapper.Map<List<ConversationReadDTO>>(conversations);
        }
    }
}
