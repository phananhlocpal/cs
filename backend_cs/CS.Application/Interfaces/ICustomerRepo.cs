using CS.Application.Interfaces;
using CS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Domain.Interfaces
{
    public interface ICustomerRepo : IBaseRepo<Customer>
    {
        Task<Customer> GetCustomerByEmailAsync(string email);
    }
}
