using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Application.Abstractions;
using CS.Application.Abstractions.Repositories;
using CS.Application.Abstractions.Services;
using CS.Application.Commands.UserCommands;
using CS.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CS.Application.UseCases.UserUseCases
{
    public class ResetUserPasswordHandler : ICommandHandler<ResetUserPasswordCommand, Unit>
    {
        private readonly IUserRepo _userRepo;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IEmailManagerService _emailService;

        public ResetUserPasswordHandler(IUserRepo userRepo, IPasswordHasher<User> passwordHasher, IEmailManagerService emailManagerService)
        {
            _userRepo = userRepo;
            _passwordHasher = passwordHasher;
            _emailService = emailManagerService;
        }

        public async Task<Unit> Handle(ResetUserPasswordCommand request, CancellationToken cancellationToken)
        {
            const string NEW_PASSWORD = "12345678";

            var user = await _userRepo.Get(request.UserId);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            user.Password = _passwordHasher.HashPassword(user, NEW_PASSWORD);
            await _userRepo.Update(user);
            await _emailService.SendEmailAsync(user.Email, "Reset password", $"Your password has been reset to {NEW_PASSWORD}");

            return Unit.Value;
        }
    }
}
