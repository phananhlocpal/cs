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
    public class GetEmployeeTaggedByIdHandler : IRequestHandler<GetEmployeeTaggedByIdQuery, EmployeeTaggedReadDTO>
    {
        private readonly IEmployeeTaggedRepo _employeeTaggedRepo;
        private readonly IMapper _mapper;

        public GetEmployeeTaggedByIdHandler(IEmployeeTaggedRepo employeeTaggedRepo, IMapper mapper)
        {
            _employeeTaggedRepo = employeeTaggedRepo;
            _mapper = mapper;
        }

        public async Task<EmployeeTaggedReadDTO> Handle(GetEmployeeTaggedByIdQuery request, CancellationToken cancellationToken)
        {
            var employeeTagged = await _employeeTaggedRepo.Get(request.Id);
            return _mapper.Map<EmployeeTaggedReadDTO>(employeeTagged);
        }
    }
}
