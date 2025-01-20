using CS.Application.Abstractions.Repositories;
using CS.Application.Commands.EmployeeTaggedCommands;
using CS.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.UseCases.EmployeeTaggedUseCases
{
    public class CreateEmployeeTaggedHandler : IRequestHandler<CreateEmployeeTaggedCommand, EmployeeTagged>
    {
        private readonly IEmployeeTaggedRepo _employeeTaggedRepo;

        public CreateEmployeeTaggedHandler(IEmployeeTaggedRepo employeeTaggedRepo)
        {
            _employeeTaggedRepo = employeeTaggedRepo;
        }

        public async Task<EmployeeTagged> Handle(CreateEmployeeTaggedCommand request, CancellationToken cancellationToken)
        {
            var employeeTagged = new EmployeeTagged
            {
                ConversationId = request.ConversationId,
                EmployeeId = request.EmployeeId,
                TaggedBy = request.TaggedBy,
                TagTime = DateTime.Now
            };

            return await _employeeTaggedRepo.Create(employeeTagged);
        }
    }
}
