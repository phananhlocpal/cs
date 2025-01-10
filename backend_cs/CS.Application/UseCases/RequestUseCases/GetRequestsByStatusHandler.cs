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
    public class GetRequestsByStatusHandler : IQueryHandler<GetRequestsByStatusQuery, IEnumerable<RequestReadDTO>>
    {
        private readonly IRequestRepo _requestRepo;
        private readonly IMapper _mapper;

        public GetRequestsByStatusHandler(IRequestRepo requestRepo, IMapper mapper)
        {
            _requestRepo = requestRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RequestReadDTO>> Handle(GetRequestsByStatusQuery request, CancellationToken cancellationToken)
        {
            var requests = await _requestRepo.GetByStatus(request.Status);
            return _mapper.Map<IEnumerable<RequestReadDTO>>(requests);
        }
    }
}
