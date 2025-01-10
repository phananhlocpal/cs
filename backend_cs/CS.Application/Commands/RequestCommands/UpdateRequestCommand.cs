using CS.Application.Abstractions;
using CS.Application.DTOs.RequestDTO;
using CS.Domain.Entities;
using CS.Domain.Enumerations;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Commands.RequestCommands
{
    public class UpdateRequestCommand : ICommand<RequestReadDTO>
    {
        public Guid Id { get; set; }
        public string? Description { get; set; }
        public RequestStatusEnum? Status { get; set; }
    }
}
