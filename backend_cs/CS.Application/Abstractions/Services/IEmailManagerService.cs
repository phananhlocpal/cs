using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Domain.Entities;

namespace CS.Application.Abstractions.Services
{
    public interface IEmailManagerService
    {
        Task SendVerificationEmailAsync(Customer customer);
        Task SendEmailAsync(string email, string subject, string message, bool isHtml = false);
    }
}
