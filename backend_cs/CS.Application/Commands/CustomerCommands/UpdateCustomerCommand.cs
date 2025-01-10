using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Application.Abstractions;
using CS.Application.DTOs.CustomerDTO;
using MediatR;

namespace CS.Application.Commands.CustomerCommands
{
    public class UpdateCustomerCommand : ICommand<CustomerReadDTO>
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? Password { get; set; }
    }
}
