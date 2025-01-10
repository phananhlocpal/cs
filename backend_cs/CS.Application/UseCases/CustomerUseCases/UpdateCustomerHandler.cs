using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CS.Application.Abstractions;
using CS.Application.Abstractions.Repositories;
using CS.Application.Commands.CustomerCommands;
using CS.Application.DTOs.CustomerDTO;
using CS.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace CS.Application.UseCases.CustomerUseCases
{
    public class UpdateCustomerHandler : ICommandHandler<UpdateCustomerCommand, CustomerReadDTO>
    {
        private readonly ICustomerRepo _customerRepo;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher<Customer> _passwordHasher;

        public UpdateCustomerHandler(ICustomerRepo customerRepo, IMapper mapper, IPasswordHasher<Customer> passwordHasher)
        {
            _customerRepo = customerRepo;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
        }

        public async Task<CustomerReadDTO> Handle(UpdateCustomerCommand request, CancellationToken cancellationToken)
        {
            var customer = await _customerRepo.Get(request.Id);
            if (customer == null)
            {
                throw new KeyNotFoundException("Customer not found.");
            }

            if (!string.IsNullOrEmpty(request.Name))
            {
                customer.Name = request.Name;
            }

            if (!string.IsNullOrEmpty(request.Password))
            {
                customer.Password = _passwordHasher.HashPassword(customer, request.Password);
            }

            if (!string.IsNullOrEmpty(request.Phone))
            {
                customer.Phone = request.Phone;
            }

            if (!string.IsNullOrEmpty(request.Address))
            {
                customer.Address = request.Address;
            }

            var updatedCustomer = await _customerRepo.Update(customer);
            return _mapper.Map<CustomerReadDTO>(updatedCustomer);
        }
    }
}
