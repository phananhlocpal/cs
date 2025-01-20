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
    public class GetMessageByIdHandler : IRequestHandler<GetMessageByIdQuery, MessageReadDTO>
    {
        private readonly IMessageRepo _messageRepo;
        private readonly IMapper _mapper;

        public GetMessageByIdHandler(IMessageRepo messageRepo, IMapper mapper)
        {
            _messageRepo = messageRepo;
            _mapper = mapper;
        }

        public async Task<MessageReadDTO> Handle(GetMessageByIdQuery request, CancellationToken cancellationToken)
        {
            var message = await _messageRepo.Get(request.Id);
            return _mapper.Map<MessageReadDTO>(message);
        }
    }
}
