using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.DTOs.MessageDTO
{
    public class MessageCreateDTO
    {
        public Guid ConversationId { get; set; }
        public Guid? Sender { get; set; }
        public string MessageText { get; set; }
    }
}
