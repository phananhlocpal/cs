using AutoMapper;
using CS.Application.Abstractions;
using CS.Application.Abstractions.Repositories;
using CS.Application.Abstractions.Services;
using CS.Application.AuthenDTO;
using CS.Application.Commands.AuthenCommands;
using CS.Application.DTOs.CustomerDTO;
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
    public class CustomerLoginHandler : ICommandHandler<CustomerLoginCommand, CustomerLoginResponseViewModel>
    {
        private readonly ICustomerRepo _customerRepo;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher<Customer> _passwordHasher;
        private readonly ITokenManagerService _tokenService;

        public CustomerLoginHandler(ICustomerRepo customerRepo, IMapper mapper, IPasswordHasher<Customer> passwordHasher, ITokenManagerService tokenService)
        {
            _customerRepo = customerRepo;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
            _tokenService = tokenService;
        }

        public async Task<CustomerLoginResponseViewModel> Handle(CustomerLoginCommand request, CancellationToken cancellationToken)
        {
            var customer = await _customerRepo.GetCustomerByEmailAsync(request.Email);
            if (customer == null)
            {
                throw new KeyNotFoundException("Customer not found.");
            }

            var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(customer, customer.Password, request.Password);
            if (passwordVerificationResult == PasswordVerificationResult.Failed)
            {
                throw new UnauthorizedAccessException("Invalid password.");
            }

            var customerLoginResponseDTO = new CustomerLoginResponseViewModel
            {
                Customer = _mapper.Map<CustomerReadDTO>(customer),
                Token = await _tokenService.GenerateCustomerTokenAsync(customer),
            };

            return customerLoginResponseDTO;
        }
    }
}
