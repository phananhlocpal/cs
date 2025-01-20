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
    public class GetConversationByIdHandler : IRequestHandler<GetConversationByIdQuery, ConversationReadDTO>
    {
        private readonly IConversationRepo _conversationRepo;
        private readonly IMapper _mapper;

        public GetConversationByIdHandler(IConversationRepo conversationRepo, IMapper mapper)
        {
            _conversationRepo = conversationRepo;
            _mapper = mapper;
        }

        public async Task<ConversationReadDTO> Handle(GetConversationByIdQuery request, CancellationToken cancellationToken)
        {
            var conversation = await _conversationRepo.Get(request.Id);
            return _mapper.Map<ConversationReadDTO>(conversation);
        }
    }
}
