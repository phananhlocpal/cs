using CS.Domain.Enumerations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.DTOs.ConversationDTO
{
    public class ConversationCreateDTO
    {
        public Guid? CustomerId { get; set; }
        public ConversationStatusEnum Status { get; set; }
    }
}
