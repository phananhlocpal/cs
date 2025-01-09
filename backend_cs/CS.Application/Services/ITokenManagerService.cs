using CS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Services
{
    public interface ITokenManagerService
    {
        Task<string> GenerateCustomerTokenAsync(Customer customer);
        Task<string> GenerateUserTokenAsync(User user);
    }
}
