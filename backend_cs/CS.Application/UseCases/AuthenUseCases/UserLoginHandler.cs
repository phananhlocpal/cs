using AutoMapper;
using CS.Application.Abstractions;
using CS.Application.Abstractions.Repositories;
using CS.Application.Abstractions.Services;
using CS.Application.AuthenDTO;
using CS.Application.Commands.AuthenCommands;
using CS.Application.DTOs.CustomerDTO;
using CS.Application.DTOs.UserDTO;
using CS.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.UseCases.AuthenUseCases
{
    public class UserLoginHandler : ICommandHandler<UserLoginCommand, UserLoginResponseViewModel>
    {
        private readonly IUserRepo _userRepo;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly ITokenManagerService _tokenService;

        public UserLoginHandler(IUserRepo userRepo, IMapper mapper, IPasswordHasher<User> passwordHasher, ITokenManagerService tokenService)
        {
            _userRepo = userRepo;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
            _tokenService = tokenService;
        }
        
        public async Task<UserLoginResponseViewModel> Handle(UserLoginCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepo.GetUserByEmailAsync(request.Email);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found.");
            }

            var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(user, user.Password, request.Password);
            if (passwordVerificationResult == PasswordVerificationResult.Failed)
            {
                throw new UnauthorizedAccessException("Invalid password.");
            }

            var userLoginResponseDTO = new UserLoginResponseViewModel
            {
                User = _mapper.Map<UserReadDTO>(user),
                Token = await _tokenService.GenerateUserTokenAsync(user),
            };

            return userLoginResponseDTO;
        }
    }
}
