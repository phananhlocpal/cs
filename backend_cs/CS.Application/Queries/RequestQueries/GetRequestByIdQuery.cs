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
    public class GetRequestByIdQuery : IQuery<RequestReadDTO>
    {
        public Guid Id { get; set; }
    }
}
