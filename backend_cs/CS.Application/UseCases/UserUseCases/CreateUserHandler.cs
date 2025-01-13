﻿using AutoMapper;
using CS.Application.Abstractions;
using CS.Application.Abstractions.Repositories;
using CS.Application.Commands.UserCommands;
using CS.Application.DTOs.UserDTO;
using CS.Domain.Entities;
using CS.Domain.Enumerations;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.UseCases.UserUseCases
{
    public class CreateUserHandler : ICommandHandler<CreateUserCommand, UserReadDTO>
    {
        private readonly IUserRepo _userRepo;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher<User> _passwordHasher;

        public CreateUserHandler(IUserRepo userRepo, IMapper mapper, IPasswordHasher<User> passwordHasher)
        {
            _userRepo = userRepo;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
        }

        public async Task<UserReadDTO> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var existingUser = await _userRepo.GetUserByEmailAsync(request.Email);
            if (existingUser != null)
            {
                throw new Exception("User with this email already exists");
            }

            var userRequest = new User
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Password = request.Password,
                Status = UserStatusEnum.Active,
                Role = request.Role
            };

            userRequest.Password = _passwordHasher.HashPassword(userRequest, request.Password);
            var user = await _userRepo.Create(userRequest);

            return _mapper.Map<UserReadDTO>(user);
        }
    }
}
