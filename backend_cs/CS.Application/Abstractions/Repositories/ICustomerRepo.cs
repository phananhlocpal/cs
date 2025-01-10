using CS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Abstractions.Repositories
{
    public interface ICustomerRepo : IBaseRepo<Customer>
    {
        Task<Customer> GetCustomerByEmailAsync(string email);
    }
}
