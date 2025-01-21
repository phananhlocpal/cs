using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace CS.Application.Commands.EmployeeTaggedCommands
{
    public class DeleteEmployeeTaggedCommand : IRequest<Unit>
    {
        public Guid Id { get; set; }
    }
}
