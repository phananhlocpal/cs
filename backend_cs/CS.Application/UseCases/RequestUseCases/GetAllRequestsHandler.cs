using AutoMapper;
using CS.Application.DTOs.RequestDTO;
using CS.Application.Queries.RequestQueries;
using CS.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.UseCases.RequestUseCases
{
    public class GetAllRequestsHandler : IRequestHandler<GetAllRequestsQuery, IEnumerable<RequestReadDTO>>
    {
        private readonly IRequestRepo _requestRepo;
        private readonly IMapper _mapper;

        public GetAllRequestsHandler(IRequestRepo requestRepo, IMapper mapper)
        {
            _requestRepo = requestRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RequestReadDTO>> Handle(GetAllRequestsQuery request, CancellationToken cancellationToken)
        {
            var requests = await _requestRepo.GetAll();
            return _mapper.Map<IEnumerable<RequestReadDTO>>(requests);
        }
    }
}
