using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Application.DTOs.CustomerDTO;
using MediatR;

namespace CS.Application.Commands.CustomerCommands
{
    public class CreateCustomerCommand : IRequest<CustomerReadDTO>
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
    }
}
