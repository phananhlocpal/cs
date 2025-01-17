using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CS.Application.Abstractions;
using CS.Application.Abstractions.Repositories;
using CS.Application.Commands.RequestCommands;
using CS.Application.DTOs.RequestDTO;
using CS.Domain.Entities;
using CS.Domain.Enumerations;
using MediatR;

namespace CS.Application.UseCases.RequestUseCases
{
    public class CreateRequestHandler : ICommandHandler<CreateRequestCommand, RequestReadDTO>
    {
        private readonly IRequestRepo _requestRepo;
        private readonly IMapper _mapper;

        public CreateRequestHandler(IRequestRepo requestRepo, IMapper mapper)
        {
            _requestRepo = requestRepo;
            _mapper = mapper;
        }

        public async Task<RequestReadDTO> Handle(CreateRequestCommand request, CancellationToken cancellationToken)
        {
            var requestTicket = new Request
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                Description = request.Description,
                CreatedDate = DateTime.Now,
                IssueType = request.IssueType,
                Status = RequestStatusEnum.Created,
                PersonInChargeId = request.PersonInChargeId,
                CustomerId = request.CustomerId
            };

            var newRequest = await _requestRepo.Create(requestTicket);
            return _mapper.Map<RequestReadDTO>(newRequest);
        }
    }
}
