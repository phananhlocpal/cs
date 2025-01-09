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
    public class GetAllCustomerHandler : IRequestHandler<GetAllCustomersQuery, IEnumerable<CustomerReadDTO>>
    {
        private readonly ICustomerRepo _customerRepo;
        private readonly IMapper _mapper;

        public GetAllCustomerHandler(ICustomerRepo customerRepo, IMapper mapper)
        {
            _customerRepo = customerRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CustomerReadDTO>> Handle(GetAllCustomersQuery request, CancellationToken cancellationToken)
        {
            var customers = await _customerRepo.GetAll();
            return _mapper.Map<IEnumerable<CustomerReadDTO>>(customers);
        }
    }
}
