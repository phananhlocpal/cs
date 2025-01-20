using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Application.Abstractions.Repositories;
using CS.Application.Abstractions.Services;
using CS.Application.Commands.ConversationCommands;
using CS.Application.Commands.EmployeeTaggedCommands;
using CS.Application.Commands.MessageCommands;
using CS.Application.Queries.ConversationQueries;
using CS.Application.Queries.MessageQueries;
using CS.Domain.Entities;
using CS.Domain.Enumerations;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.VisualBasic;

namespace CS.Presentation.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;

        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendMessage(Guid? conversationId, string messageText, Guid? senderId, Guid? customerId)
        {
            if (conversationId is null)
            {
                var conversation = await _mediator.Send(new CreateConversationCommand
                {
                    CustomerId = customerId ?? (Guid?)null, 
                    Status = ConversationStatusEnum.Opened,
                });

                await _mediator.Send(new CreateMessageCommand
                {
                    ConversationId = conversation.Id,
                    Sender = senderId ?? (Guid?)null,  
                    MessageText = messageText
                });

                // Gửi lại tin nhắn và gọi lại LoadMessages
                var messages = await _mediator.Send(new GetMessagesByConversationIdQuery { ConversationId = conversation.Id });
                await Clients.Caller.SendAsync("LoadMessages", messages);
            }
            else
            {
                var message = await _mediator.Send(new CreateMessageCommand
                {
                    ConversationId = conversationId.Value,
                    Sender = senderId ?? (Guid?)null,  
                    MessageText = messageText
                });

                // Gửi lại tin nhắn và gọi lại LoadMessages
                var messages = await _mediator.Send(new GetMessagesByConversationIdQuery { ConversationId = conversationId.Value });
                await Clients.Group(conversationId.ToString()).SendAsync("ReceiveMessage", new
                {
                    ConversationId = message.ConversationId,
                    Sender = message.Sender,
                    MessageText = message.MessageText,
                    Timestamp = message.Timestamp
                });
                await Clients.Caller.SendAsync("LoadMessages", messages);
            }
        }


        public async Task JoinConversation(Guid conversationId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, conversationId.ToString());
        }

        public async Task TagEmployee(Guid conversationId, Guid employeeId, Guid taggedBy)
        {
            var tag = await _mediator.Send(new CreateEmployeeTaggedCommand
            {
                ConversationId = conversationId,
                EmployeeId = employeeId,
                TaggedBy = taggedBy
            });

            await Clients.Group(conversationId.ToString()).SendAsync("EmployeeTagged", employeeId);
        }

        public async Task GetConversationMessages(Guid conversationId)
        {
            var messages = await _mediator.Send(new GetMessagesByConversationIdQuery { ConversationId = conversationId });
            await Clients.Caller.SendAsync("LoadMessages", messages);
        }
    }
}
