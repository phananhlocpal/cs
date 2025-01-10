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
    public class GetRequestsByUserIdHandler : IQueryHandler<GetRequestsByUserIdQuery, IEnumerable<RequestReadDTO>>
    {
        private readonly IRequestRepo _requestRepo;
        private readonly IMapper _mapper;

        public GetRequestsByUserIdHandler(IRequestRepo requestRepo, IMapper mapper)
        {
            _requestRepo = requestRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RequestReadDTO>> Handle(GetRequestsByUserIdQuery request, CancellationToken cancellationToken)
        {
            var requests = await _requestRepo.GetByUserId(request.UserId);
            return _mapper.Map<IEnumerable<RequestReadDTO>>(requests);
        }
    }
}
