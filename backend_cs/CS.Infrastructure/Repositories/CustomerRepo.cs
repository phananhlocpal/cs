using CS.Domain.DBContext;
using CS.Domain.Entities;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using CS.Application.Abstractions.Repositories;

namespace CS.Infrastructure.Repositories
{
    public class CustomerRepo : BaseRepo<Customer>, ICustomerRepo
    {
        private readonly DapperContext _context;
        public CustomerRepo(DapperContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Customer> GetCustomerByEmailAsync(string email)
        {
            using (var connection = _context.CreateConnection())
            {
                var query = "SELECT * FROM Customers WHERE Email = @Email";
                var customer = await connection.QueryFirstOrDefaultAsync<Customer>(query, new { Email = email });

                return customer;
            }
        }
    }
}
