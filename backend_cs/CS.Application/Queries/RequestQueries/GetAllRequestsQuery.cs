using CS.Application.DTOs.RequestDTO;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CS.Application.Queries.RequestQueries
{
    public class GetAllRequestsQuery : IRequest<IEnumerable<RequestReadDTO>>
    {
    }
}
