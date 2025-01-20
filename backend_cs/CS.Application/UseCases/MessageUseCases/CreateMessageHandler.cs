using AutoMapper;
using CS.Application.Abstractions.Repositories;
using CS.Application.Commands.MessageCommands;
using CS.Application.DTOs.MessageDTO;
using CS.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CS.Application.UseCases.MessageUseCases
{
    public class CreateMessageHandler : IRequestHandler<CreateMessageCommand, MessageReadDTO>
    {
        private readonly IMessageRepo _messageRepo;
        private readonly IMapper _mapper;
        private readonly ILogger<CreateMessageHandler> _logger;

        public CreateMessageHandler(IMessageRepo messageRepo, IMapper mapper, ILogger<CreateMessageHandler> logger)
        {
            _messageRepo = messageRepo;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<MessageReadDTO> Handle(CreateMessageCommand request, CancellationToken cancellationToken)
        {
            var message = new Message
            {
                Id = Guid.NewGuid(),
                ConversationId = request.ConversationId,
                Sender = request.Sender.HasValue ? request.Sender.Value : null,
                MessageText = request.MessageText,
                Timestamp = DateTime.Now
            };

            _logger.LogInformation("Creating message {@Message}", message);

            var createdMessage = await _messageRepo.Create(message);
            return _mapper.Map<MessageReadDTO>(createdMessage);
        }
    }
}