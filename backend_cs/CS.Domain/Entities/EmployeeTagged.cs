using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Domain.Entities
{
    public class EmployeeTagged : BaseEntity
    {
        public Guid ConversationId { get; set; }
        public Guid? EmployeeId { get; set; }
        public Guid TaggedBy { get; set; }
        public DateTime TagTime { get; set; } = DateTime.Now;
    }
}
