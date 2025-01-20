using AutoMapper;
using CS.Application.Abstractions.Repositories;
using CS.Application.Commands.ConversationCommands;
using CS.Application.DTOs.ConversationDTO;
using CS.Domain.Entities;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CS.Application.UseCases.ConversationUseCases
{
    public class CreateConversationHandler : IRequestHandler<CreateConversationCommand, ConversationReadDTO>
    {
        private readonly IConversationRepo _conversationRepo;
        private readonly IMapper _mapper;

        public CreateConversationHandler(IConversationRepo conversationRepo, IMapper mapper)
        {
            _conversationRepo = conversationRepo;
            _mapper = mapper;
        }

        public async Task<ConversationReadDTO> Handle(CreateConversationCommand request, CancellationToken cancellationToken)
        {
            var conversation = new Conversation
            {
                Id = Guid.NewGuid(),
                CustomerId = request.CustomerId,
                CreatedAt = DateTime.Now,
                Status = request.Status
            };

            var createdConversation = await _conversationRepo.Create(conversation);
            return _mapper.Map<ConversationReadDTO>(createdConversation);
        }
    }
}
