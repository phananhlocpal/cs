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
    public class UpdateConversationHandler : IRequestHandler<UpdateConversationCommand, ConversationReadDTO>
    {
        private readonly IConversationRepo _conversationRepo;
        private readonly IMapper _mapper;

        public UpdateConversationHandler(IConversationRepo conversationRepo, IMapper mapper)
        {
            _conversationRepo = conversationRepo;
            _mapper = mapper;
        }

        public async Task<ConversationReadDTO> Handle(UpdateConversationCommand request, CancellationToken cancellationToken)
        {
            var conversation = await _conversationRepo.Get(request.Id);
            if (conversation == null)
            {
                throw new KeyNotFoundException($"Conversation with ID {request.Id} not found.");
            }

            conversation.CustomerId = request.CustomerId;
            conversation.Status = request.Status;

            var updatedConversation = await _conversationRepo.Update(conversation);

            return _mapper.Map<ConversationReadDTO>(updatedConversation);
        }
    }
}
