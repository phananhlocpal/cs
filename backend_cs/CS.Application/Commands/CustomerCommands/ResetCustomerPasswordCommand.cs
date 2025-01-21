using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace CS.Application.Commands.CustomerCommands
{
    public class ResetCustomerPasswordCommand : IRequest<Unit>
    {
        public Guid CustomerId { get; set; }
    }
}
