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
    public class UpdateEmployeeTaggedHandler : IRequestHandler<UpdateEmployeeTaggedCommand, EmployeeTagged>
    {
        private readonly IEmployeeTaggedRepo _employeeTaggedRepo;

        public UpdateEmployeeTaggedHandler(IEmployeeTaggedRepo employeeTaggedRepo)
        {
            _employeeTaggedRepo = employeeTaggedRepo;
        }

        public async Task<EmployeeTagged> Handle(UpdateEmployeeTaggedCommand request, CancellationToken cancellationToken)
        {
            var employeeTagged = await _employeeTaggedRepo.Get(request.Id);
            if (employeeTagged == null)
            {
                throw new KeyNotFoundException($"EmployeeTagged with ID {request.Id} not found.");
            }

            employeeTagged.EmployeeId = request.EmployeeId;
            employeeTagged.TaggedBy = request.TaggedBy;

            return await _employeeTaggedRepo.Update(employeeTagged);
        }
    }
}
