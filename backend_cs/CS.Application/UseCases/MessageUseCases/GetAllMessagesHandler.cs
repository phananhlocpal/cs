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
    public class GetAllMessagesHandler : IRequestHandler<GetAllMessagesQuery, List<MessageReadDTO>>
    {
        private readonly IMessageRepo _messageRepo;
        private readonly IMapper _mapper;

        public GetAllMessagesHandler(IMessageRepo messageRepo, IMapper mapper)
        {
            _messageRepo = messageRepo;
            _mapper = mapper;
        }

        public async Task<List<MessageReadDTO>> Handle(GetAllMessagesQuery request, CancellationToken cancellationToken)
        {
            var messages = await _messageRepo.GetAll();
            return _mapper.Map<List<MessageReadDTO>>(messages);
        }
    }
}
