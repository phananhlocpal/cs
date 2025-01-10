using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Application.Abstractions;
using CS.Application.DTOs.RequestDTO;
using MediatR;

namespace CS.Application.Queries.RequestQueries
{
    public class GetRequestsByUserIdQuery : IQuery<IEnumerable<RequestReadDTO>>
    {
        public Guid UserId { get; set; }
    }
}
