using CS.Application.Abstractions;
using CS.Application.AuthenDTO;
using CS.Application.DTOs.CustomerDTO;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Commands.AuthenCommands
{
    public class CustomerLoginCommand : ICommand<CustomerLoginResponseViewModel>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
