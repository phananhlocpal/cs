using AutoMapper;
using CS.Application.Abstractions.Repositories;
using CS.Application.Commands.MessageCommands;
using CS.Application.DTOs.MessageDTO;
using CS.Domain.Entities;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CS.Application.UseCases.MessageUseCases
{
    public class UpdateMessageHandler : IRequestHandler<UpdateMessageCommand, MessageReadDTO>
    {
        private readonly IMessageRepo _messageRepo;
        private readonly IMapper _mapper;

        public UpdateMessageHandler(IMessageRepo messageRepo, IMapper mapper)
        {
            _messageRepo = messageRepo;
            _mapper = mapper;
        }

        public async Task<MessageReadDTO> Handle(UpdateMessageCommand request, CancellationToken cancellationToken)
        {
            var message = await _messageRepo.Get(request.Id);
            if (message == null)
            {
                throw new KeyNotFoundException($"Message with ID {request.Id} not found.");
            }

            message.MessageText = request.MessageText;
            var updatedMessage = await _messageRepo.Update(message);

            return _mapper.Map<MessageReadDTO>(updatedMessage);
        }
    }
}
