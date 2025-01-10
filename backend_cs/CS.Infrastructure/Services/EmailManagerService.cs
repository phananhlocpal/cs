using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using CS.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.WebUtilities;
using CS.Application.Abstractions.Services;

namespace CS.Infrastructure.Services
{
    public class EmailManagerService : IEmailManagerService
    {
        private readonly IConfiguration _config;

        public EmailManagerService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(string email, string subject, string message, bool isHtml = false)
        {
            var smtpClient = new SmtpClient(_config["EmailSettings:SmtpServer"])
            {
                Port = int.Parse(_config["EmailSettings:SmtpPort"]),
                Credentials = new NetworkCredential(_config["EmailSettings:SenderEmail"], _config["EmailSettings:SenderPassword"]),
                EnableSsl = true,
            };

            await smtpClient.SendMailAsync(new MailMessage(_config["EmailSettings:SenderEmail"], email, subject, message));
        }

        public async Task SendVerificationEmailAsync(Customer customer)
        {
            var verificationLink = GenerateVerificationLink(customer.VerificationToken);
            var emailContent = $"Please verify your email by clicking the following link: {verificationLink}";

            var smtpClient = new SmtpClient(_config["EmailSettings:SmtpServer"])
            {
                Port = int.Parse(_config["EmailSettings:SmtpPort"]),
                Credentials = new NetworkCredential(_config["EmailSettings:SenderEmail"], _config["EmailSettings:SenderPassword"]),
                EnableSsl = true,
            };

            await smtpClient.SendMailAsync(new MailMessage(_config["EmailSettings:SenderEmail"], customer.Email, "Email Verification", emailContent));
        }

        private string GenerateVerificationLink(string? token)
        {
            var queryParams = new Dictionary<string, string?>
                {
                    { "token", token }
                };
            var uri = new Uri(QueryHelpers.AddQueryString(_config["AppSettings:BaseUrl"] + "/Authen/VerifyEmail", queryParams));
            return uri.ToString();
        }
    }
}
