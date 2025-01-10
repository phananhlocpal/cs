using AutoMapper;
using CS.Application.Abstractions;
using CS.Application.Abstractions.Repositories;
using CS.Application.Commands.CustomerCommands;
using CS.Application.Commands.RequestCommands;
using CS.Application.DTOs.CustomerDTO;
using CS.Application.DTOs.RequestDTO;
using CS.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.UseCases.RequestUseCases
{
    public class UpdateRequestHandler : ICommandHandler<UpdateRequestCommand, RequestReadDTO>
    {
        private readonly IRequestRepo _requestRepo;
        private readonly IMapper _mapper;

        public UpdateRequestHandler(IRequestRepo requestRepo, IMapper mapper)
        {
            _requestRepo = requestRepo;
            _mapper = mapper;
        }

        public async Task<RequestReadDTO> Handle(UpdateRequestCommand request, CancellationToken cancellationToken)
        {
            var requestTicket = await _requestRepo.Get(request.Id);
            if (requestTicket == null)
            {
                throw new KeyNotFoundException("Customer not found.");
            }

            if (request.Description != null)
            {
                requestTicket.Description = request.Description;
            }

            if (request.Status != null)
            {
                requestTicket.Status = request.Status.Value;
            }

            var updatedRequest = await _requestRepo.Update(requestTicket);
            return _mapper.Map<RequestReadDTO>(updatedRequest);
        }
    }
}
