using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Abstractions.Services
{
    public interface IChatService
    {
        Task SendMessageAsync(string user, string message);
    }
}
