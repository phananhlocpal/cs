using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Application.Abstractions;
using MediatR;

namespace CS.Application.Commands.UserCommands
{
    public class ResetUserPasswordCommand : ICommand<Unit>
    {
        public Guid UserId { get; set; }
    }
}
