using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CS.Application.Abstractions;
using CS.Application.Abstractions.Repositories;
using CS.Application.Abstractions.Services;
using CS.Application.Commands.CustomerCommands;
using CS.Application.DTOs.CustomerDTO;
using CS.Domain.Entities;
using CS.Domain.Enumerations;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CS.Application.UseCases.CustomerUseCases
{
    public class CreateCustomerHandler : ICommandHandler<CreateCustomerCommand, CustomerReadDTO>
    {
        private readonly ICustomerRepo _customerRepo;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher<Customer> _passwordHasher;
        private readonly IEmailManagerService _sendVerificationEmailService;

        public CreateCustomerHandler(ICustomerRepo customerRepo, IMapper mapper, IPasswordHasher<Customer> passwordHasher, IEmailManagerService sendVerificationEmailService)
        {
            _customerRepo = customerRepo;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
            _sendVerificationEmailService = sendVerificationEmailService;
        }

        public async Task<CustomerReadDTO> Handle(CreateCustomerCommand request, CancellationToken cancellationToken)
        {
            var existingCustomer = await _customerRepo.GetCustomerByEmailAsync(request.Email);
            if (existingCustomer != null)
            {
                throw new Exception("Customer with this email already exists");
            }

            var customerRequest = new Customer
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Email = request.Email,
                Address = request.Address,
                Phone = request.Phone,
                Password = request.Password
            };

            customerRequest.Password = _passwordHasher.HashPassword(customerRequest, request.Password);
            var customer = await _customerRepo.Create(customerRequest);

            // Send verification email
            await _sendVerificationEmailService.SendVerificationEmailAsync(customer);

            var customerReadDTO = _mapper.Map<CustomerReadDTO>(customer);
            return customerReadDTO;
        }
    }
}
