using CS.Domain.Entities;
using CS.Domain.Enumerations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Abstractions.Repositories
{
    public interface IRequestRepo : IBaseRepo<Request>
    {
        Task<IEnumerable<Request>> GetByStatus(RequestStatusEnum status);
        Task<IEnumerable<Request>> GetByCustomerId(Guid customerId);
        Task<IEnumerable<Request>> GetByUserId(Guid userId);
    }
}
