using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Application.Abstractions.Repositories;
using CS.Application.Abstractions.Services;
using CS.Application.Commands.CustomerCommands;
using CS.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CS.Application.UseCases.CustomerUseCases
{
    public class ResetCustomerPasswordHandler : IRequestHandler<ResetCustomerPasswordCommand, Unit>
    {
        private readonly ICustomerRepo _customerRepo;
        private readonly IEmailManagerService _emailService;
        private readonly IPasswordHasher<Customer> _passwordHasher;

        public ResetCustomerPasswordHandler(ICustomerRepo customerRepo, IEmailManagerService emailService, IPasswordHasher<Customer> passwordHasher)
        {
            _customerRepo = customerRepo;
            _emailService = emailService;
            _passwordHasher = passwordHasher;
        }

        public async Task<Unit> Handle(ResetCustomerPasswordCommand request, CancellationToken cancellationToken)
        {
            const string NEW_PASSWORD = "12345678";

            var customer = await _customerRepo.Get(request.CustomerId);
            if (customer == null)
            {
                throw new Exception("Customer not found");
            }
            customer.Password = _passwordHasher.HashPassword(customer, NEW_PASSWORD);
            await _customerRepo.Update(customer);

            await _emailService.SendEmailAsync(customer.Email, "Reset password", $"Your password has been reset to {NEW_PASSWORD}");
            return Unit.Value;
        }
    }
}
