using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CS.Application.Abstractions;
using CS.Application.Abstractions.Repositories;
using CS.Application.DTOs.RequestDTO;
using CS.Application.Queries.RequestQueries;
using MediatR;

namespace CS.Application.UseCases.RequestUseCases
{
    public class GetRequestByIdHandler : IQueryHandler<GetRequestByIdQuery, RequestReadDTO>
    {
        private readonly IRequestRepo _requestRepo;
        private readonly IMapper _mapper;

        public GetRequestByIdHandler(IRequestRepo requestRepo, IMapper mapper)
        {
            _requestRepo = requestRepo;
            _mapper = mapper;
        }

        public async Task<RequestReadDTO> Handle(GetRequestByIdQuery request, CancellationToken cancellationToken)
        {
            var requestTicket = await _requestRepo.Get(request.Id);
            return _mapper.Map<RequestReadDTO>(requestTicket);
        }
    }
}
