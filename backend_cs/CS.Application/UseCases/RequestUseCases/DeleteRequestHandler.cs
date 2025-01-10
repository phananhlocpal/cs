using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CS.Application.Abstractions;
using CS.Application.Abstractions.Repositories;
using CS.Application.Commands.RequestCommands;
using MediatR;

namespace CS.Application.UseCases.RequestUseCases
{
    public class DeleteRequestHandler : ICommandHandler<DeleteRequestCommand, Unit>
    {
        private readonly IRequestRepo _requestRepo;
        private readonly IMapper _mapper;

        public DeleteRequestHandler(IRequestRepo requestRepo, IMapper mapper)
        {
            _requestRepo = requestRepo;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(DeleteRequestCommand request, CancellationToken cancellationToken)
        {
            var requestTicket = await _requestRepo.Get(request.Id);
            if (requestTicket == null)
            {
                throw new KeyNotFoundException("Request not found.");
            }
            await _requestRepo.Delete(requestTicket);
            return Unit.Value;
        }

    }
}
