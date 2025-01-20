using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Domain.Entities
{
    public class Message : BaseEntity
    {
        public Guid ConversationId { get; set; }
        public Guid? Sender { get; set; }
        public string MessageText { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}
