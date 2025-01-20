using CS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Abstractions.Services
{
    public interface IChatService
    {
        Task SendMessage(Guid conversationId, string messageText, Guid? senderId);
        Task<IEnumerable<Message>> GetMessages(Guid conversationId);
    }
}
