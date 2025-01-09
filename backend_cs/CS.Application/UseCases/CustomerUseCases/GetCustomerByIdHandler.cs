using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CS.Application.DTOs.CustomerDTO;
using CS.Application.Queries.CustomerQueries;
using CS.Domain.Interfaces;
using MediatR;

namespace CS.Application.UseCases.CustomerUseCases
{
    public class GetCustomerByIdHandler : IRequestHandler<GetCustomerByIdQuery, CustomerReadDTO>
    {
        private readonly ICustomerRepo _customerRepo;
        private readonly IMapper _mapper;

        public GetCustomerByIdHandler(ICustomerRepo customerRepo, IMapper mapper)
        {
            _customerRepo = customerRepo;
            _mapper = mapper;
        }

        public async Task<CustomerReadDTO> Handle(GetCustomerByIdQuery request, CancellationToken cancellationToken)
        {
            var customer = await _customerRepo.Get(request.Id);
            return _mapper.Map<CustomerReadDTO>(customer);
        }
    }
}
