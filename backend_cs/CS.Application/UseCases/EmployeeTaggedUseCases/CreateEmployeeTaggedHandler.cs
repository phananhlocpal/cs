using AutoMapper;
using CS.Application.Abstractions.Repositories;
using CS.Application.Commands.EmployeeTaggedCommands;
using CS.Application.DTOs.EmployeeTaggedDTO;
using CS.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.UseCases.EmployeeTaggedUseCases
{
    public class CreateEmployeeTaggedHandler : IRequestHandler<CreateEmployeeTaggedCommand, EmployeeTaggedReadDTO>
    {
        private readonly IEmployeeTaggedRepo _employeeTaggedRepo;
        private readonly IMapper _mapper;

        public CreateEmployeeTaggedHandler(IEmployeeTaggedRepo employeeTaggedRepo, IMapper mapper)
        {
            _employeeTaggedRepo = employeeTaggedRepo;
            _mapper = mapper;
        }

        public async Task<EmployeeTaggedReadDTO> Handle(CreateEmployeeTaggedCommand request, CancellationToken cancellationToken)
        {
            var employeeTagged = new EmployeesTagged
            {
                Id = Guid.NewGuid(),
                ConversationId = request.ConversationId,
                EmployeeId = request.EmployeeId,
                TaggedBy = request.TaggedBy,
                TagTime = DateTime.Now
            };

            var newEmployeeTagged = await _employeeTaggedRepo.Create(employeeTagged);
            return _mapper.Map<EmployeeTaggedReadDTO>(newEmployeeTagged);
        }
    }
}
