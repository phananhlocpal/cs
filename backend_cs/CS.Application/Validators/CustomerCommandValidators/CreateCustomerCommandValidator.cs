using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Application.Abstractions.Repositories;
using CS.Application.Commands.CustomerCommands;
using FluentValidation;

namespace CS.Application.Validators.CustomerCommandValidators
{
    public class CreateCustomerCommandValidator : AbstractValidator<CreateCustomerCommand>
    {
        private readonly ICustomerRepo _customerRepo;
        public CreateCustomerCommandValidator(ICustomerRepo customerRepo)
        {
            _customerRepo = customerRepo;

            RuleFor(c => c.Name).NotEmpty().WithMessage("The name is required");
            RuleFor(c => c.Email).NotEmpty().EmailAddress().WithMessage("The email is required");
            RuleFor(c => c.Address).NotEmpty().WithMessage("The address is required");
            RuleFor(c => c.Phone).NotEmpty().Length(10).WithMessage("The phone is required");
            RuleFor(c => c.Password).NotEmpty().MinimumLength(8).WithMessage("The password is required");

            RuleFor(c => c.Email).MustAsync(async (email, _) =>
            {
                var customer = await customerRepo.GetCustomerByEmailAsync(email);
                return customer == null;
            }).WithMessage("The email must be unique");
        }
    }
}
