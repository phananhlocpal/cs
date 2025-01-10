using CS.Application.Abstractions;
using CS.Application.DTOs.UserDTO;
using CS.Domain.Enumerations;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Commands.UserCommands
{
    public class CreateUserCommand : ICommand<UserReadDTO>
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public UserRoleEnum Role { get; set; }
    }
}
