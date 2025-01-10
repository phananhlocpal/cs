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
    public class GetRequestsByCustomerIdQuery : IQuery<IEnumerable<RequestReadDTO>>
    {
        public Guid CustomerId { get; set; }
    }
}
