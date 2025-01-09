using AutoMapper;
using CS.Application.Commands.UserCommands;
using CS.Application.DTOs.CustomerDTO;
using CS.Application.DTOs.UserDTO;
using CS.Domain.Entities;
using CS.Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.UseCases.UserUseCases
{
    public class UpdateUserHandler : IRequestHandler<UpdateUserCommand, UserReadDTO>
    {
        private readonly IUserRepo _userRepo;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher<User> _passwordHasher;

        public UpdateUserHandler(IUserRepo userRepo, IMapper mapper, IPasswordHasher<User> passwordHasher)
        {
            _userRepo = userRepo;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
        }

        public async Task<UserReadDTO> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepo.Get(request.Id);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found.");
            }

            if (!string.IsNullOrEmpty(request.Name))
            {
                user.Name = request.Name;
            }

            if (!string.IsNullOrEmpty(request.Password))
            {
                user.Password = _passwordHasher.HashPassword(user, request.Password);
            }

            if (!string.IsNullOrEmpty(request.PhoneNumber))
            {
                user.PhoneNumber = request.PhoneNumber;
            }

            if (request.Status.HasValue)
            {
                user.Status = request.Status.Value;
            }

            if (request.Role.HasValue)
            {
                user.Role = request.Role.Value;
            }

            var updatedUser = await _userRepo.Update(user);
            return _mapper.Map<UserReadDTO>(updatedUser);
        }
    }
}
