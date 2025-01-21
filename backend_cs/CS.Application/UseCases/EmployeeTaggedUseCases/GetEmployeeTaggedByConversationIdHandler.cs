using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CS.Application.Abstractions.Repositories;
using CS.Application.DTOs.EmployeeTaggedDTO;
using CS.Application.Queries.EmployeeTaggedQueries;
using MediatR;

namespace CS.Application.UseCases.EmployeeTaggedUseCases
{
    public class GetEmployeeTaggedByConversationIdHandler : IRequestHandler<GetEmployeeTaggedByConversationIdQuery, IEnumerable<EmployeeTaggedReadDTO>>
    {
        private readonly IEmployeeTaggedRepo _employeeTaggedRepo;
        private readonly IMapper _mapper;

        public GetEmployeeTaggedByConversationIdHandler(IEmployeeTaggedRepo employeeTaggedRepo, IMapper mapper)
        {
            _employeeTaggedRepo = employeeTaggedRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<EmployeeTaggedReadDTO>> Handle(GetEmployeeTaggedByConversationIdQuery request, CancellationToken cancellationToken)
        {
            var employeeTagged = await _employeeTaggedRepo.GetByConversationId(request.ConversationId);
            return _mapper.Map<IEnumerable<EmployeeTaggedReadDTO>>(employeeTagged);
        }
    }
}
