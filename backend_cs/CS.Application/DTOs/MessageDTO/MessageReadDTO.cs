using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.DTOs.MessageDTO
{
    public class MessageReadDTO
    {
        public Guid Id { get; set; }
        public Guid ConversationId { get; set; }
        public Guid Sender { get; set; }
        public string MessageText { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
