using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CS.Application.Abstractions;
using CS.Application.DTOs.RequestDTO;
using CS.Domain.Enumerations;
using MediatR;

namespace CS.Application.Queries.RequestQueries
{
    public class GetRequestsByStatusQuery : IQuery<IEnumerable<RequestReadDTO>>
    {
        public RequestStatusEnum Status { get; set; }
    }
}
