﻿using CS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Abstractions.Repositories
{
    public interface IEmployeeTaggedRepo : IBaseRepo<EmployeesTagged>
    {
        Task<IEnumerable<EmployeesTagged>> GetByConversationId(Guid conversationId);
    }
}
