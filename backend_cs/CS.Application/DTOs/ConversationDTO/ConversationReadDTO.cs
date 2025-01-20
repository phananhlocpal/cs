using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.DTOs.ConversationDTO
{
    public class ConversationReadDTO
    {
        public Guid Id { get; set; }
        public Guid? CustomerId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Status { get; set; }
    }
}
