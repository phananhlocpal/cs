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
    public class GetConversationByCustomerIdHandler : IRequestHandler<GetConversationByCustomerIdQuery, ConversationReadDTO>
    {
        private readonly IMapper _mapper;
        private readonly IConversationRepo _conversationRepo;

        public GetConversationByCustomerIdHandler(IMapper mapper, IConversationRepo conversationRepo)
        {
            _mapper = mapper;
            _conversationRepo = conversationRepo;
        }

        public async Task<ConversationReadDTO> Handle(GetConversationByCustomerIdQuery request, CancellationToken cancellationToken)
        {
            var conversation = await _conversationRepo.GetByCustomerId(request.CustomerId);
            return _mapper.Map<ConversationReadDTO>(conversation);
        }
    }
}
