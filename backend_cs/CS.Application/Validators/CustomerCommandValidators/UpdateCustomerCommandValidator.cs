using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Application.Abstractions.Repositories;
using CS.Application.Commands.CustomerCommands;
using CS.Domain.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Identity;

namespace CS.Application.Validators.CustomerCommandValidators
{
    public class UpdateCustomerCommandValidator : AbstractValidator<UpdateCustomerCommand>
    {
        private readonly ICustomerRepo _customerRepo;
        private readonly IPasswordHasher<Customer> _passwordHasher;

        public UpdateCustomerCommandValidator(ICustomerRepo customerRepo, IPasswordHasher<Customer> passwordHasher)
        {
            _customerRepo = customerRepo;
            _passwordHasher = passwordHasher;

            RuleFor(x => x.Phone).Length(10).When(x => !string.IsNullOrWhiteSpace(x.Phone)).WithMessage("Phone number must be 10 digits");
            RuleFor(c => c.Password)
                .MustAsync(async (command, newPassword, cancellationToken) =>
                {
                    if (string.IsNullOrWhiteSpace(newPassword))
                        return true; 

                    var customer = await _customerRepo.Get(command.Id);

                    if (customer == null) return true;

                    var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(customer, customer.Password, newPassword);
                    return passwordVerificationResult != PasswordVerificationResult.Success;
                })
                .WithMessage("The new password must be different from the old password");
        }
    }
}
