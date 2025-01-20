using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Application.Abstractions.Repositories;
using CS.Application.Abstractions.Services;
using CS.Domain.Entities;
using Microsoft.AspNetCore.SignalR;

namespace CS.Infrastructure.Services
{
    public class ChatService : IChatService
    {
        private readonly IMessageRepo _messageRepo;

        public ChatService(IMessageRepo messageRepo)
        {
            _messageRepo = messageRepo;
        }

        public async Task SendMessage(Guid conversationId, string messageText, Guid? senderId)
        {
            var message = new Message
            {
                ConversationId = conversationId,
                Sender = senderId,
                MessageText = messageText,
                Timestamp = DateTime.Now
            };

            await _messageRepo.Create(message);
        }

        public async Task<IEnumerable<Message>> GetMessages(Guid conversationId)
        {
            return await _messageRepo.GetByConversationId(conversationId);
        }
    }
}
