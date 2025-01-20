using AutoMapper;
using CS.Application.Abstractions.Repositories;
using CS.Application.DTOs.EmployeeTaggedDTO;
using CS.Application.Queries.EmployeeTaggedQueries;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.UseCases.EmployeeTaggedUseCases
{
    public class GetAllEmployeeTaggedHandler : IRequestHandler<GetAllEmployeeTaggedQuery, List<EmployeeTaggedReadDTO>>
    {
        private readonly IEmployeeTaggedRepo _employeeTaggedRepo;
        private readonly IMapper _mapper;

        public GetAllEmployeeTaggedHandler(IEmployeeTaggedRepo employeeTaggedRepo, IMapper mapper)
        {
            _employeeTaggedRepo = employeeTaggedRepo;
            _mapper = mapper;
        }

        public async Task<List<EmployeeTaggedReadDTO>> Handle(GetAllEmployeeTaggedQuery request, CancellationToken cancellationToken)
        {
            var employeeTaggedList = await _employeeTaggedRepo.GetAll();
            return _mapper.Map<List<EmployeeTaggedReadDTO>>(employeeTaggedList);
        }
    }
}
