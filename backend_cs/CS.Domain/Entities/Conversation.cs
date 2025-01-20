using CS.Domain.Enumerations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Domain.Entities
{
    public class Conversation : BaseEntity
    {
        public Guid? CustomerId { get; set; }
        public DateTime CreatedAt { get; set; }
        public ConversationStatusEnum Status { get; set; }
    }
}
