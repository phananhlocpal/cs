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
    public class UpdateUserCommand : ICommand<UserReadDTO>
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
        public UserStatusEnum? Status { get; set; }
        public UserRoleEnum? Role { get; set; }
    }
}
