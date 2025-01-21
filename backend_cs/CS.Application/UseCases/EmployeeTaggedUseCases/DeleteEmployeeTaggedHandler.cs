using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CS.Application.Abstractions.Repositories;
using CS.Application.Commands.EmployeeTaggedCommands;
using MediatR;

namespace CS.Application.UseCases.EmployeeTaggedUseCases
{
    public class DeleteEmployeeTaggedHandler : IRequestHandler<DeleteEmployeeTaggedCommand, Unit>
    {
        private readonly IEmployeeTaggedRepo _employeeTaggedRepo;
        private readonly IMapper _mapper;

        public DeleteEmployeeTaggedHandler(IEmployeeTaggedRepo employeeTaggedRepo, IMapper mapper)
        {
            _employeeTaggedRepo = employeeTaggedRepo;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(DeleteEmployeeTaggedCommand request, CancellationToken cancellationToken)
        {
            var employeeTagged = await _employeeTaggedRepo.Get(request.Id);
            if (employeeTagged == null)
            {
                throw new Exception("EmployeeTagged not found");
            }
            await _employeeTaggedRepo.Delete(employeeTagged);
            return Unit.Value;
        }
    }
}
